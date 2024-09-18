<template>
    <div class="page-container">
        <div class="operation-nav">
            <el-button type="primary" size="small" @click="goBackPage" icon="arrow-left">返回</el-button>
        </div>
        <div class="content-main">
            <div class="table-tools">
                <el-button type="primary" size="small" plain @click="addExceptArea" icon="arrow-left">添加偏远地区</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%" border stripe>
                <el-table-column prop="id" label="ID" width="100px"></el-table-column>
                <el-table-column prop="content" label="名称" width="200px"></el-table-column>
                <el-table-column prop="areaName" label="偏远地区"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" plain
                                    @click="handleRowEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button size="small"
                                    @click="handleRowDelete(scope.$index, scope.row)"
                                    type="danger" plain>
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
            }
        },
        methods: {
            goBackPage() {
                this.$router.go(-1);
            },
            addExceptArea(){
                this.$router.push({name: 'except_area_add'});
            },
            handleRowEdit(index, row) {
                this.$router.push({ name: 'except_area_add', query: { id: row.id } })
            },
            handleRowDelete(index, row) {
                this.$confirm('确定要删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.post('freight/exceptAreaDelete', {id: row.id}).then((response) => {
                        if (response.success) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getInfo();
                        }
                    })
                });
            },
            getInfo() {
                this.axios.get('freight/exceptArea').then((response) => {
                    if (response.success) {
                        this.tableData = response.data;
                    }
                })
            }
        },
        mounted() {
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