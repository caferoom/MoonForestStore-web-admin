<template>
    <div class="page-container">
        <div class="form-table-box">
            <el-form ref="infoForm" :rules="infoRules" :model="infoForm" label-width="120px">
                <el-form-item label="名称" prop="content">
                    <el-input v-model="infoForm.content" placeholder="请输入名称" autofocus></el-input>
                </el-form-item>
                <el-form-item class="special-freight">
                    <div class="form-table-box">
                        <el-table :data="tableData" style="width: 100%" border stripe>
                            <el-table-column prop="areaName" label="偏远地区"></el-table-column>
                            <el-table-column label="操作" width="160">
                                <template slot-scope="scope">
                                    <el-button size="small" type="primary" plain
                                                @click="handleRowEdit(scope.$index, scope.row)">编辑地区
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="infoForm.id" type="primary" @click="onSaveTemplate">确定保存</el-button>
                    <el-button v-else type="primary" size="small" @click="onAddTemplate">确定添加</el-button>
                    <el-button size="small" @click="goBackPage">返回列表</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog size="tiny" title="设置偏远地区" :visible.sync="editDialogIsShow">
            <el-form ref="specForm" class="specFormDialig">
                <el-form-item label="" label-width="100px">
                    <el-transfer v-model="selectedArea" :props="{key: 'id',label: 'name'}" :data="areaData" :titles="['可选', '已选']" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="editDialogIsShow = false">取 消</el-button>
                <el-button size="small" type="primary" @click="updateArea">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                areaData: [],
                selectedArea: [],
                editDialogIsShow: false,
                infoForm: {
                    id: null,
                    content: ''
                },
                tableData: [{
                    area: '',
                    ghost: 0
                }],
                infoRules: {
                    content: [
                        { required: true, message: '请输入名称', trigger: 'blur'},
                    ],
                },
            }
        },
        methods: {
            updateArea() {
                let all = this.areaData;
                let selected = [...this.selectedArea];
                selected = selected.join(',')
                this.tableData[0].area = selected;

                let areaName = [...this.selectedArea];

                let newName = [];
                for (const item in areaName) {
                    all.map((ele) => ele.id == areaName[item] ? newName.push(ele.name) : '')
                }
                let name = newName.join(',');

                this.tableData = [];
                this.tableData.push({
                    area: selected,
                    areaName: name
                })
                this.editDialogIsShow = false;
            },
            onSaveTemplate() {
                this.$refs['infoForm'].validate((valid) => {
                    if (valid) {
                        let data = this.tableData[0];
                        if (data.area == '') {
                            this.$message({
                                type: 'error',
                                message: '地区不能为空'
                            })
                            return false;
                        }
                        this.axios.post('freight/saveExceptArea', {
                            id: this.infoForm.id,
                            area: this.tableData[0].area,
                            content: this.infoForm.content,
                        }).then((response) => {
                            if (response.success) {
                                this.$message({
                                    type: 'success',
                                    message: '保存成功'
                                });
                                this.getInfo();
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
            onAddTemplate() {
                this.$refs['infoForm'].validate((valid) => {
                    if (valid) {
                        let data = this.tableData[0];
                        if (data.area == '') {
                            this.$message({
                                type: 'error',
                                message: '地区不能为空'
                            })
                            return false;
                        }
                        this.axios.post('freight/addExceptArea', {
                            area: this.tableData[0].area,
                            content: this.infoForm.content,
                        }).then((response) => {
                            if (response.success) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功'
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
            goBackPage() {
                this.$router.go(-1);
            },
            getAllAreaData() {
                this.axios.post('freight/getAllProvinces').then((response) => {
                    if (response.success) {
                        this.areaData = response.data;
                    }
                })
            },
            handleRowEdit(index, row) {
                let nowArea = this.tableData[0].area;
                this.selectedArea = nowArea ? nowArea.split(',').map(Number) : [];
                this.editDialogIsShow = true;
            },
            getInfo() {
                if (typeof this.infoForm.id === "number") {
                    //加载快递公司详情
                    this.axios.post('freight/exceptAreaDetail', {
                        id: this.infoForm.id
                    }).then((response) => {
                        if (response.success) {
                            const info = response.data;
                            this.infoForm = info;
                            this.tableData = [{
                                area: info.area,
                                areaName: info.areaName
                            }]
                        }
                    })
                }
            }
        },
        mounted() {
            this.infoForm.id = this.$route.query.id;
            this.getInfo();
            this.getAllAreaData();
        }
    }
</script>

<style scoped>
    .page-container {
        background-color: white;
        padding: 16px;
    }
</style>