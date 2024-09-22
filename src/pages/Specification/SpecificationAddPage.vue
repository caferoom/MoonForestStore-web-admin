<template>
    <div class="page-container">
        <div >
            <el-button type="primary" size="small" @click="goBackPage" icon="arrow-left">返回列表</el-button>
        </div>
        <el-form ref="infoForm" :rules="infoRules" :model="infoForm" label-width="120px">
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="infoForm.name"></el-input>
            </el-form-item>
            <el-form-item label="排序">
                <el-input-number v-model="infoForm.sort_order" :min="1" :max="1000"></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button v-if="infoForm.id > 0" type="primary" @click="updateSpec">确定保存</el-button>
                <el-button v-else type="primary" @click="addSpec">确定添加</el-button>
                <el-button v-if="infoForm.id > 0" type="danger" @click="specDelete">删除</el-button>
                <el-button @click="goBackPage">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                infoForm: {
                    id: 0,
                    name: "",
                    sort_order: 1,
                },
                infoRules:{
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ]
                }
            }
        },
        methods: {
            addSpec(){
                let info = {
                    name:this.infoForm.name,
                    sort_order:this.infoForm.sort_order
                }
                this.$refs['infoForm'].validate((valid) => {
                    if (valid) {
                        this.$axios.post('specification/add', info).then((response) => {
                            if (response.success) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                this.$router.go(-1);
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '添加失败'
                                })
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            updateSpec(){
                let info = {
                    id:this.infoForm.id,
                    name:this.infoForm.name,
                    sort_order:this.infoForm.sort_order
                }
                this.$refs['infoForm'].validate((valid) => {
                    if (valid) {
                        this.$axios.post('specification/update', info).then((response) => {
                            if (response.success) {
                                this.$message({
                                    type: 'success',
                                    message: '保存成功!'
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
            specDelete(index, row) {
                this.$confirm('确定要删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('specification/delete', {id: row.id}).then((response) => {
                        if (response.success) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.$router.go(-1);
                        }
                        else {
                            this.$message({
                                type: 'error',
                                message: '删除失败，该型号下有商品!'
                            });
                        }
                    })
                });
            },
            goBackPage() {
                this.$router.go(-1);
            },
            getInfo() {
                console.log(this.infoForm.id);
            console.log(this.infoForm.id);
            console.log(this.infoForm.id);
                if (this.infoForm.id <= 0) {
                    return false
                }
                let that = this
                this.$axios.post('specification/detail', {
                        id: that.infoForm.id
                }).then((response) => {
                    if (response.success) {
                        let resInfo = response.data;
                        console.log(resInfo);
                        that.infoForm = resInfo;
                    }

                })
            }
        },
        components: {},
        mounted() {
            this.infoForm.id = this.$route.query.id || 0;
            
            this.getInfo();
        }
    }

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
</style>
