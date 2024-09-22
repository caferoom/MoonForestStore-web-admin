<template>
    <div class="page-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="商品分类" name="category"></el-tab-pane>
            <el-tab-pane label="商品型号" name="goodsModel"></el-tab-pane>
        </el-tabs>
        <div class="table-tools">
            <router-link v-if="activeName === 'category'" to="/category/add">
                <el-button size="small" plain type="primary" icon="plus">添加分类</el-button>
            </router-link>
            <router-link v-if="activeName === 'goodsModel'" to="/specification/detail">
                <el-button size="small" plain type="primary" icon="plus">添加型号</el-button>
            </router-link>
        </div>
        <el-table v-if="activeName === 'category'" :data="categoryData" style="width: 100%" border stripe>
            <el-table-column prop="name" label="分类名称">
                <template slot-scope="scope">
                    <div v-if="scope.row.level==1" class="bg-gray">{{scope.row.name}}</div>
                    <div v-if="scope.row.level==2" class="bg-left">{{scope.row.name}}</div>
                    <!-- {{ scope.row.level == 2 ? '　' : '' }} {{scope.row.name}} -->
                </template>
            </el-table-column>
            <el-table-column label="图标显示" width="80">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.is_channel"
                            active-text=""
                            inactive-text=""
                            @change='changeChannelStatus($event,scope.row.id)'>
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="首页显示" width="80">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.is_show"
                            active-text=""
                            inactive-text=""
                            @change='changeShowStatus($event,scope.row.id)'>
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="全部产品页面显示" width="140">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.is_category"
                            active-text=""
                            inactive-text=""
                            @change='changeCategoryStatus($event,scope.row.id)'>
                    </el-switch>
                </template>
            </el-table-column>

            <el-table-column prop="sort_order" label="排序" width="100" sortable>
                <template slot-scope="scope">
                    <el-input v-model="scope.row.sort_order" placeholder="排序" @blur="submitSort(scope.$index, scope.row)"></el-input>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleRowEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleRowDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-table v-if="activeName === 'goodsModel'" :data="specData" style="width: 100%" border stripe>
            <el-table-column prop="id" label="ID" width="100">
                <template slot-scope="scope">
                    <div class="bg-gray">{{scope.row.id}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="型号名">
                <template slot-scope="scope">
                    <div class="bg-gray">{{scope.row.name}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="sort_order" label="排序" width="200">
                <template slot-scope="scope">
                    <div class="bg-gray">{{scope.row.sort_order}}</div>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button size="small" @click="specEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="specDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeName: 'category',
                categoryData:[],
                specData: [],
            }
        },
        methods: {
            handleClick(tab, event) {
                if (tab.name === "category") {
                    this.getList();
                } else if (tab.name === "goodsModel") {
                    this.getSpecList();
                }
            },
            changeShowStatus($event, para) {
                this.$axios.get('category/showStatus', {
                    params: {
                        status: $event,
                        id: para
                    }
                }).then((response) => {

                })
            },
            changeChannelStatus($event, para) {
                this.$axios.get('category/channelStatus', {
                    params: {
                        status: $event,
                        id: para
                    }
                }).then((response) => {

                })
            },
            changeCategoryStatus($event, para) {
                this.$axios.get('category/categoryStatus', {
                    params: {
                        status: $event,
                        id: para
                    }
                }).then((response) => {

                })
            },
            submitSort(index, row){
                this.$axios.post('category/updateSort', { id: row.id,sort:row.sort_order }).then((response) => {
                })
            },
            handleRowEdit(index, row) {
                this.$router.push({name: 'category_add', query: {id: row.id}})
            },
            specEdit(index, row) {
                this.$router.push({name: 'specification_detail', query: {id: row.id}})
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
                            this.getSpecList();
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
            handleRowDelete(index, row) {
                this.$confirm('确定要删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('category/destory', {id: row.id}).then((response) => {
                        if (response.success) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });

                            this.getList();
                        }
                        else {
                            this.$message({
                                type: 'error',
                                message: '删除失败，该分类有子分类!'
                            });

                        }
                    })
                });
            },
            getList() {
                this.$axios.get('category', {
                    params: {
                        page: this.page,
                    }
                }).then((response) => {
                    if (response.success) {
                        this.categoryData = response.data;
                    }
                })
            },
            getSpecList() {
                this.$axios.get('specification').then((response) => {
                    if (response.success) {
                        this.specData = response.data
                    }
                })
            }
        },
        components: {},
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
