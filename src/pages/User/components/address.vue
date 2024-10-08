<template>
    <div>
        <div>
            <div class="table-tools">
                <el-button type="primary">新增地址</el-button>
            </div>
            <el-table :data="addressData" style="width: 100%" border>
                <el-form-item prop="id" label="" label-width="0px" />
                <el-table-column label="收件人" prop="name" width="280">
                    <template v-slot="scope" >
                        <el-tag v-if="scope.row.is_default" type="success" effect="dark">默认地址</el-tag>
                        {{ scope.row.name }}
                    </template>
                </el-table-column>
                <el-table-column label="收件人电话" prop="mobile" width="360"></el-table-column>
                <el-table-column label="地址" prop="fullAddress"></el-table-column>
                <el-table-column label="操作" fix="right" width="260px">
                  <template v-slot="scope">
                    <el-button :disabled="scope.row.is_default" type="primary" plain @click="setDefaultAddress(scope.row.id)">设为默认</el-button>
                    <el-button type="primary" plain @click="addressEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" plain @click="deleteAddress(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
			<el-pagination
				background
				:default-page-size="pageSize"	
				:page-sizes="PAGE_SIZES"
				v-model:current-page="page"
				v-model:page-size="pageSize"
				:total="total"
				layout="total, prev, pager, next, jumper, sizes"
			/>
        </div>
        <el-dialog title="修改地址" v-model="dialogAddressVisible">
            <el-form :model="newAddressData">
                <el-form-item label="所在地区:" label-width="120px">
                    <el-cascader
                            :options="options"
                            placeholder="请选择"
                            v-model="addOptions">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="详细地址:" label-width="120px">
                    <el-input class="el-input" v-model="newAddressData.address" auto-complete="off"
                              placeholder="请输入详细地"></el-input>
                </el-form-item>
                <el-form-item label="收货人:" label-width="120px">
                    <el-input class="el-input" v-model="newAddressData.name" auto-complete="off"
                              placeholder="请输入收货人"></el-input>
                </el-form-item>
                <el-form-item label="手机:" label-width="120px">
                    <el-input class="el-input" v-model="newAddressData.mobile" auto-complete="off"
                              placeholder="请输入收货人手机"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddressVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAddress">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
    import { ref, reactive, onMounted, watch } from 'vue';
	import axios from '@/common/request/axios';
    import { ElMessage, ElMessageBox } from 'element-plus';

    const addressData = ref([])
    const page = ref(1)
    const total = ref(0)
    const infoForm = reactive({})
    const dialogAddressVisible = ref(false)
    const newAddressData = ref({})
    const addOptions = ref([])
    const options = ref([])
	const PAGE_SIZES = [5, 50, 100, 200];
	const pageSize = ref(PAGE_SIZES[0]);

    // 定义入参
    const props = defineProps({
        id: Number,
    });

    // 方法
    const setDefaultAddress = (id) => {
		ElMessageBox.confirm("是否讲该地址设置为默认地址?", {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		})
		.then(() => {
            axios.post('user/setDefaultAddress', {
                userId: props.id,
                recordId: id,
            }).then((response) => {
                if (response.success) {
                page.value = 1;
                getAddress();
                }
            });   
		})
		.catch(() => {})
    }

    const getAddress = () => {
        axios.post('user/addressList', {
            id: props.id,
            page: page.value,
            size: pageSize.value,
        }).then((response) => {
            if (response.success) {
                addressData.value = response.data.data;
                page.value = response.data.currentPage;
                total.value = response.data.total;
            }
        });
    }

    const getAllRegion = () => {
        axios
          .get('common/getAllRegion')
          .then((response) => {
            if (response.success) {
              options.value = response.data
            }
          }
        );
    };

    const deleteAddress = (id) => {
		ElMessageBox.confirm("是否删除该地址?", {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		})
		.then(() => {
            axios.post('user/deleteAddress', {
                id: id,
            }).then((response) => {
                if (response.success) {
                    ElMessage({
                        type: 'success',
                        message: '删除成功'
                    });
                    getAddress();
			    } else {
                    ElMessage({
                        type: 'error',
                        message: '删除失败'
                    });
                }
            });   
		})
		.catch(() => {})
    }

    const saveAddress = () => {
        newAddressData.value.addOptions = addOptions.value
        axios.post('user/saveaddress', newAddressData.value)
        .then((response) => {
            if (response.success) {
                alert('修改成功!')
                addressData.value = []
                getAddress()
                dialogAddressVisible.value = false
            } else {
                alert('修改失败')
            }
        });
    }

    const addressEdit = (item) => {
        newAddressData.value = item;
        addOptions.value = [item.province_id, item.city_id, item.district_id];
        dialogAddressVisible.value = true;
    }

    onMounted(() => {
        getAllRegion()
        getAddress();
    });

    watch([page, pageSize], getAddress);

</script>

<style>
    .table-tools {
        padding: 8px 0px;
        display: flex;
        justify-content: end;
    }
</style>
