<template>
	<div  class="page-container" >
        <div>
            <el-button type="primary" size="small" @click="goBackPage" icon="arrow-left">返回</el-button>
        </div>
        <div class="form-table-box">
            <el-form ref="infoForm" :rules="infoRules" :model="infoForm" label-width="120px">
                <el-form-item label="名字" prop="name">
                    <el-input v-model="infoForm.name"></el-input>
                </el-form-item>
                <el-form-item label="代号" prop="code">
                    <el-input v-model="infoForm.code"></el-input>
                </el-form-item>
                <el-form-item label="客户编号">
                    <el-input v-model="infoForm.CustomerName"></el-input>
                    <div class="form-tips">打印电子面单，需要填写</div>
                </el-form-item>
                <el-form-item label="月结账号">
                    <el-input v-model="infoForm.MonthCode"></el-input>
                    <div class="form-tips">打印电子面单，需要填写</div>
                </el-form-item>
                <el-form-item label="排序" prop="sort_order">
                    <el-input-number v-model="infoForm.sort_order" :min="1" :max="1000"></el-input-number>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmitInfo">确定保存</el-button>
                    <el-button @click="goBackPage">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                infoForm: {
                    id: 0,
                    name: '',
                    code: '',
                    sort_order: 0
                },
                infoRules: {
                    name: [
                        {required: true, message: '请输入快递公司名字', trigger: 'blur'},
                    ],
                    code: [
                        {required: true, message: '请输入快递公司代号', trigger: 'blur'},
                    ],
                    MonthCode: [
                        {required: true, message: '请输入快递公司月结账号', trigger: 'blur'},
                    ],
                },
            }
        },
        methods: {
            goBackPage() {
                this.$router.go(-1);
            },
            onSubmitInfo() {
                this.$refs['infoForm'].validate((valid) => {
                    if (valid) {
                        this.axios.post('shipper/save', this.infoForm).then((response) => {
                            if (response.success) {
                                this.$message({
                                    type: 'success',
                                    message: '保存成功'
                                });
                                this.$router.go(-1);
                            } else {
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
            getInfo() {
                //加载快递公司详情
                this.axios.get('shipper/getDetailInfoById', {
                    params: {
                        id: this.infoForm.id
                    }
                }).then((response) => {
                    this.infoForm = response.data;
                })
            }

        },
        components: {},
        mounted() {
            this.infoForm.id = this.$route.query.id || 0;
            if (this.infoForm.id > 0) {
                this.getInfo();
            }
        }
    }

</script>

<style scoped>
    .header {
        margin-bottom: 8px;
    }

    .page-container {
        background-color: white;
        padding: 16px;
    }
</style>