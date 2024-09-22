<template>
    <div class="page-container">
        <div class="form-table-box">
            <el-form ref="infoForm" :rules="infoRules" :model="infoForm" label-width="120px">
                <el-form-item label="管理员用户名" prop="username">
                    <el-input v-model="infoForm.username"></el-input>
                </el-form-item>
                <template v-if="infoForm.id">
                    <el-form-item label="新密码">
                        <el-switch v-model="change" active-color="#13ce66"/>
                    </el-form-item>
                    <el-form-item label="" v-if="change" prop="password">
                        <el-input type="password" v-model="infoForm.password" placeholder="输入新的密码"></el-input>
                    </el-form-item>
                </template>
                <template v-else>
                    <el-form-item label="密码">
                        <el-input type="password" v-model="infoForm.password"></el-input>
                    </el-form-item>
                </template>
                <el-form-item>
                    <el-button v-if="infoForm.id > 0" type="primary" @click="saveAdminInfo">确定保存</el-button>
                    <el-button v-else type="primary" @click="addAdminInfo">确定添加</el-button>
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
                change:false,
                infoForm: {
                    id: 0,
                    username: "",
                    password: ''
                },
                infoRules: {
                    username: [
                        {required: true, message: '请输入昵称', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ],
                },
            }
        },
        methods: {
            goBackPage() {
                this.$router.go(-1);
            },
            saveAdminInfo() {
                let { username, password, id } = this.infoForm;
                if(this.change) {
                  // 编辑密码
                    if (password != undefined) {
                        password = password.replace(/(^\s*)|(\s*$)/g, ""); // 删除左右空格
                        if (password.length < 6) {
                            this.$message({
                                type: 'error',
                                message: '密码请大于6个字符'
                            });
                            return false;
                        }
                    }
                }
                this.$refs['infoForm'].validate((valid) => {
                    if (valid) {
                        const user = { username, password, id };
                        if (!this.change) {
                            delete user.password;
                        }
                        console.log("&&&", user);
                        this.$axios.post('admin/update', {
                            ...user,
                        }).then((response) => {
                            if (response.success) {
                                this.$message({
                                    type: 'success',
                                    message: '保存成功'
                                });
                                this.goBackPage(-1);
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: response?.message?.message || "保存失败",
                                })
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            addAdminInfo() {
                let { username, password } = this.infoForm;
                if(password !== undefined){
                    password = password.replace(/(^\s*)|(\s*$)/g, "");
                    if (password.length < 6) {
                        this.$message({
                            type: 'error',
                            message: '密码请大于6个字符',
                        })
                        return false;
                    }
                }
                this.$refs['infoForm'].validate((valid) => {
                    if (valid) {
                        this.$axios.post('admin/create', {
                            username, password,
                        }).then((response) => {
                            if (response.success) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功'
                                });
                                this.$router.push({ name: 'admin'} )
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: response?.message?.message || "添加失败",
                                })
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
        },
        components: {},
        mounted() {
            this.infoForm.id = this.$route.query.id || 0;
            if (this.$route.query.id) {
                this.infoForm.id  = Number(this.$route.query.id);
                this.infoForm.username  = this.$route.query.username;
            }
        }
    }

</script>

<style scoped>
	.page-container {
		background-color: white;
		padding: 16px;
	}
</style>
