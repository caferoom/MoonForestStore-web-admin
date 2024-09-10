<template>
	<div class="page-container">
        <div class="header">发件地址设置</div>
        <el-form ref="infoForm" :model="infoForm" :rules="infoRules" label-width="120px">
            <el-form-item label="打印后自动发货">
                <el-switch v-model="infoForm.autoDelivery"
                            @change='changeStatus(infoForm.autoDelivery)'></el-switch>
            </el-form-item>
            <el-form-item label="寄件人" prop="Name">
                <el-input v-model="infoForm.Name" placeholder="请输入非代理发货时的寄件人"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="Tel">
                <el-input v-model="infoForm.Tel" placeholder="请输入电话"></el-input>
            </el-form-item>
            <el-form-item label="省市区" prop="ProvinceName">
                <el-cascader
                        :options="options"
                        placeholder="请选择地区"
                        v-model="senderOptions">
                </el-cascader>
            </el-form-item>
            <el-form-item label="地址" prop="Address">
                <el-input v-model="infoForm.Address" placeholder="请输入具体地址"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSaveSubmit">保存</el-button>
            </el-form-item>
        </el-form>
        <div class="header">生效的快递</div>
        <el-form label-width="120px">
            <el-form-item label="">
                <div class="table-tools">
                    <router-link to="/shipper/list">
                        <el-button type="primary" size="small" icon="plus">配置生效快递</el-button>
                    </router-link>
                </div>
                <el-table :data="tableData" style="width: 100%" border stripe>
                    <el-table-column prop="name" label="名字"></el-table-column>
                    <el-table-column prop="code" label="代号"></el-table-column>
                    <el-table-column prop="CustomerName" label="客户编号"></el-table-column>
                    <el-table-column prop="monthCode" label="月结账号"></el-table-column>
                    <el-table-column label="操作" width="170">
                        <template slot-scope="scope">
                            <el-button size="small" @click="handleRowEdit(scope.$index, scope.row)">编辑
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                infoForm: {},
                page: 1,
                total: 0,
                filterForm: {
                    name: ''
                },
                tableData: [],
                options: [],
                senderOptions:[],
                infoRules: {
                    Name: [
                        {required: true, message: '请输入寄件人姓名', trigger: 'blur'},
                    ],
                    Tel: [
                        {required: true, message: '请输入寄件人电话', trigger: 'blur'},
                    ],
                    ProvinceName: [
                        {required: true, message: '请输入寄件省份', trigger: 'blur'},
                    ],
                    CityName: [
                        {required: true, message: '请输入寄件城市', trigger: 'blur'},
                    ],
                    ExpAreaName: [
                        {required: true, message: '请输入寄件区县', trigger: 'blur'},
                    ],
                    Address: [
                        {required: true, message: '请输入寄件人具体地址', trigger: 'blur'},
                    ],

                }
            }
        },
        methods: {
            getAllRegion() {
                let that = this;
                this.axios.get('common/getAllRegion').then((response) => {
                    if (response.success) {
                        this.options = response.data;
                    }
                })
            },
            changeStatus() {
                this.infoForm.autoDelivery == true ? this.infoForm.autoDelivery = 1 : this.infoForm.autoDelivery = 0;
                this.axios.post('shipper/changeAutoStatus', {status:this.infoForm.autoDelivery}).then((response) => {
                    if (response.success) {
                        this.$message({
                            type: 'success',
                            message: '更改成功'
                        });
                        this.infoForm.autoDelivery == 1 ? this.infoForm.autoDelivery = true : this.infoForm.autoDelivery = false
                    }
                    else {
                        this.$message({
                            type: 'error',
                            message: '更改失败'
                        })
                    }
                })
            },
            handleRowEdit(index, row) {
                this.$router.push({name: 'shipper_add', query: {id: row.id}})
            },
            onSaveSubmit() {
                this.infoForm.province_id = this.senderOptions[0];
                this.infoForm.city_id = this.senderOptions[1];
                this.infoForm.district_id = this.senderOptions[2];
                this.infoForm.autoDelivery == true ? this.infoForm.autoDelivery = 1 : this.infoForm.autoDelivery = 0;
                this.$refs['infoForm'].validate((valid) => {
                    if (valid) {
                        this.axios.post('shipper/storeShipperSettings', this.infoForm).then((response) => {
                            if (response.success) {
                                this.$message({
                                    type: 'success',
                                    message: '保存成功'
                                });
                                this.infoForm.autoDelivery == 1 ? this.infoForm.autoDelivery = true : this.infoForm.autoDelivery = false
                            }
                            else {
                                this.$message({
                                    type: 'error',
                                    message: '保存失败'
                                })
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            getList() {
                this.axios.get('shipper/usingDeliveryCompanyList').then((response) => {
                    if (response.success) {
                        this.tableData = response.data;
                    }
                })
            },
            getShippingAddress() {
                this.axios.get('shipper/getShippingAddress').then((response) => {
                    if (response.success) {
                        this.infoForm = response.data;
                        this.infoForm.autoDelivery == 1 ? this.infoForm.autoDelivery = true : this.infoForm.autoDelivery = false;
                        this.senderOptions.push(
                            this.infoForm.province_id,
                            this.infoForm.city_id,
                            this.infoForm.district_id
                        );
                    }

                })
            }
        },
        components: {},
        mounted() {
            this.getList();
            this.getShippingAddress(); 
            this.getAllRegion();
        }
    }
</script>
<style scoped>
    .header {
        font-weight: 700;
        font-size: 18px;
        color: #606266;
        margin-bottom: 16px;
    }

	.table-tools {
		text-align: right;
		margin-bottom: 8px;
	}

    .page-container {
		background-color: white;
		padding: 16px;
	}
</style>
