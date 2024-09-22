<template>
    <div class="page-container">
        <div class="content-main">
            <div class="form-table-box">
                <div class="table-tools">
				    <el-button type="primary" size="small" icon="plus" @click="exceptareaList">偏远地区设置</el-button>
				    <el-button type="primary" size="small" icon="plus" @click="addFreightTemplate">添加快递模板</el-button>
                </div>
                <el-table :data="tableData" style="width: 100%" border stripe>
                    <el-table-column prop="id" label="ID" width="100px"></el-table-column>
                    <el-table-column prop="name" label="名字"></el-table-column>
                    <el-table-column prop="package_price" label="包装费"></el-table-column>
                    <el-table-column prop="freight_type" label="按件/按重" width="200">
                        <template slot-scope="scope">
                            {{ scope.row.freight_type == 0 ? '按件' : '按重' }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="170">
                        <template slot-scope="scope">
                            <el-button size="small" @click="handleRowEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="small" type="danger" @click="handleRowDelete(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            expressList(){
                this.$router.push({name: 'shipper'});
            },
            exceptareaList(){
                this.$router.push({name: 'except_area'});
            },
            addFreightTemplate(){
                this.$router.push({name: 'freight_add'});
            },
            handleRowEdit(index, row) {
                this.$router.push({name: 'freight_add', query: { id: row.id }})
            },
            handleRowDelete(index, row) {
                this.$confirm('确定要删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('freight/remove', {id: row.id}).then((response) => {
                        if (response.success) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getList();
                        }
                    })
                });
            },
            getList() {
                this.$axios.get('freight/getAll').then((response) => {
                    if (response.success) {
                        this.tableData = response.data
                    }
                })
            }
        },
        mounted() {
            this.getList();
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
