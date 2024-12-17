<template>
  <div class="page-container">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>分类管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="main-page" >
			<div class="title">
				<div class="page-title">分类管理</div>
				<div class="page-title-sub">商品分类管理</div>
			</div>
		</div>
    <div class="table-tools">
      <el-button size="small" plain type="primary" @click="handleRowEdit(null)" >添加分类</el-button>
    </div>
    <el-table :data="categoryData" style="width: 100%" border stripe row-key="id">
      <el-table-column prop="name" label="分类名称">
        <template #default="scope">
          <span v-if="scope.row.level==1" class="bg-gray">{{scope.row.name}}</span>
          <span v-if="scope.row.level==2" class="bg-left">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="img_url" label="分类图片">
        <template #default="scope">
          <el-image
          style="width: 60px; height: 40px"
          :src="scope.row.img_url"
          :preview-src-list="[scope.row.img_url]"
          :preview-teleported="true"
          fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column label="是否在客户端展示">
        <template #default="scope">
          <el-switch
            v-model="scope.row.is_show"
            @change="changeShowStatus($event, scope.row.id)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="sort_order" label="排序">
        <template #default="scope">
          <el-input-number :min="1" :max="99" v-model="scope.row.sort_order" placeholder="排序" @change="submitSort(scope.row)"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="280">
        <template #default="scope">
          <el-button size="small" @click="handleRowEdit(scope.row)">编辑</el-button>
          <el-button  v-if="scope.row.parent_id === 0" size="small" @click="handleRowEdit({ parent_id: scope.row.id })" >新增子分类</el-button>
          <el-button size="small" type="danger" @click="handleRowDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <EditOrAddDialog :rowDetail="rowDetail" v-model:dialogVisible="dialogVisible" />
  </div>
</template>
  
<script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { ElMessage, ElMessageBox } from 'element-plus'
    import axios from 'axios';
    import EditOrAddDialog from "./components/EditOrAddDialog";

    const router = useRouter()
    const categoryData = ref([])  
    const dialogVisible = ref(false);
    const rowDetail = ref(null);
    const id = ref(11);
    
    const innerSortByOrder = () => {
        categoryData.value = categoryData.value.sort((a, b) => b.sort_order - a.sort_order);
        categoryData.value.forEach(data => data.children.sort((a, b) => b.sort_order - a.sort_order));
    }

    const changeShowStatus = ($event, id) => {
        axios.get('category/showStatus', { params: { status: $event, id } }).then(res => {
            if (res.success) {
                ElMessage({
                    type: 'success',
                    message: '变更成功'
                });
            } else {
                ElMessage({
                    type: 'error',
                    message: '变更失败'
                });
            }
        })
    }
    
    const submitSort = (row) => {
        axios.post('category/updateSort', { id: row.id, sort: row.sort_order }).then(res => {
            if (res.success) {
                ElMessage({
                    type: 'success',
                    message: '变更成功'
                });
                innerSortByOrder();
            } else {
                ElMessage({
                    type: 'error',
                    message: '变更失败'
                });
            }
        })
    }
    
    const handleRowEdit = (row) => {
      dialogVisible.value = true;
      rowDetail.value = row;
    }
    
    const handleRowDelete = (row) => {
      ElMessageBox.confirm('确定要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('category/destory', { id: row.id }).then((response) => {
          if (response.success) {
            ElMessage.success('删除成功!')
            getList();
          } else {
            ElMessage.error('删除失败，该分类有子分类!')
          }
        })
      })
    }
  
    const getList = () => {
        axios.get('category/all', { params: { page: 1 } })
            .then((response) => {
                if (response.success) {
                    categoryData.value = response.data
                }
            }
        );
    }
    
    onMounted(getList);

</script>
  
<style scoped>
  .table-tools {
    text-align: right;
    margin-bottom: 8px;
  }

  .page-container {
    background-color: white;
    padding: 16px;
  }


  	.main-page {
		margin: 16px 0px;
	}

	.title {
		margin: 16px 0px;
	}
	.page-title {
		font-size: 18px;
		line-height: 24px;
		font-weight: 700;
		color: var(--el-text-color-primary);
	}
	.page-title-sub {
		font-size: 14px;
		line-height: 20px;
		color: var(--el-text-color-regular);
	}
</style>