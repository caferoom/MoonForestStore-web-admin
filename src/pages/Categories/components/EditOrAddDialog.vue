<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="props.rowDetail ? '新增分类' : '编辑分类'"
    @close="emit('update:dialogVisible', false)"
  >
    <el-form ref="infoFormRef" :rules="infoRules" :model="infoForm" label-width="100" >
      <el-form-item label="上级分类" v-if="props.rowDetail && props.rowDetail.parent_id !== 0" prop="parent_id">
          <el-select v-model="infoForm.parent_id" disabled >
              <el-option v-for="item in parentCategory" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="infoForm.name"></el-input>
      </el-form-item>
      <el-form-item label="分类图片" prop="img_url">
        <el-upload
          name="file"
          class="avatar-uploader"
          :action="qiniuZone"
          :on-remove="bannerRemove"
          list-type="picture-card"
          :before-remove="beforeBannerRemove"
          :on-success="handleUploadBannerSuccess"
          v-model:file-list="fileList"
        >
        </el-upload>
      </el-form-item>
      <el-form-item label="排序" prop="sort_order">
        <el-input-number
          v-model="infoForm.sort_order"
          :min="1"
          :max="1000"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="emit('update:dialogVisible', false)">取消</el-button>
        <el-button @click="onSubmitInfo" type="primary">确定保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>
  
<script setup>
  import { ref, onMounted, reactive, watch } from 'vue';
  import axios from 'axios';
  import { ElMessage, ElMessageBox } from 'element-plus'
  import api from '@/common/request/api';
  import { Plus } from '@element-plus/icons-vue'

  const infoFormRef = ref();
  const url = ref("");
  const qiniuZone = ref(api.qiniu);

  const picData = ref({token: ""});
  const infoForm = reactive({
          name: "",
          parent_id: 0,
          img_url: "",
          sort_order: 100,
        });
  const fileList = ref([]);
  const parentCategory = ref([]);
  const infoRules = reactive({
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        img_url: [{ required: true, message: "请选择分类图片", trigger: "blur" },
        ],
      });

  // 定义入参
  const props = defineProps({
      rowDetail: Object,
      dialogVisible: Boolean,
  });

  const emit = defineEmits(["update:dialogVisible"]);

  const getQiniuToken = () => {
    axios.post("upload/getUploadToken").then((response) => {
        if (response.success) {
            let resInfo = response.data;
            picData.value.token = resInfo.token;
        }
    });
  };

  const beforeBannerRemove = (file, fileList) => {
      return ElMessageBox.confirm(`确定移除该图？删除后将无法找回`);
  };

  const bannerRemove = (file, fileList) => {
    infoForm.img_url = "";
    axios.post("category/deleteBannerImage", { id: infoForm.id })
      .then((response) => {
        if (response.success) {
          ElMessage({
              type: 'success',
              message: '删除成功'
          });
        }
    });
  };

  const onSubmitInfo = (formEl) => {
    if (!formEl) return;
    infoForm.level = infoForm.parent_id === 0 ? 1 : 2;
    formEl.validate((valid) => {
      if (valid) {
        axios.post("category/store", infoForm).then((response) => {
          if (response.success) {
            ElMessage({
              type: "success",
              message: "保存成功",
            });
          } else {
            ElMessage({
              type: "error",
              message: "保存失败",
            });
          }
        });
      } else {
        return false;
      }
    });
  };

  const handleUploadBannerSuccess = (res) => {
    infoForm.img_url = res.data.fileUrl;
  };

  const getTopCategory = () => {
      axios.get("category/topCategory").then((response) => {
        if (response.success) {
          parentCategory.value = response.data.data;
        }
      });
  };

  const getInfo = (id) => {
    //加载分类详情
    axios.get("category/info", {
        params: { id: id },
      }).then((response) => {
        if (response.success) {
          const resInfo = response.data;
          const data = {
            name: "分类图",
            url: resInfo.img_url,
          };
          fileList.value.push(data);
          const iconData = {
            name: "图标",
            url: resInfo.icon_url,
          };
          fileList2.value.push(iconData);

          infoForm.id = resInfo.id;
          infoForm.name = resInfo.name;
          infoForm.parent_id = resInfo.parent_id;
          infoForm.img_url = resInfo.img_url;
          infoForm.sort_order = resInfo.sort_order;
        }
      });
  };

  onMounted(() => {
    getTopCategory();
    getQiniuToken();
  });

  watch(() => props.rowDetail, (newObj, oldObj) => {
    if(newObj && newObj.id) {
      getInfo(newObj.id);
      return;
    }
    
    if (newObj && newObj.parent_id) {
      infoForm.parent_id = newObj.parent_id;
    }

    infoForm.name = "";
    infoForm.img_url = "";
    infoForm.sort_order = "";
  });

</script>
  
<style scoped>
  .avatar-uploader > .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
      object-fit: contain; /* 保持宽高比例并最大限度填充容器 */

  }

  .avatar-uploader > .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }

</style>