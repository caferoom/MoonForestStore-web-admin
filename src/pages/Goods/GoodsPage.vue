<template>
    <div class="page-container">
        <div class="table-tools">
            <router-link to="/goods/add">
                <el-button type="primary" icon="plus" size="small">添加商品</el-button>
            </router-link>
        </div>
        <div class="content-main">
            <!-- <div class="block">
				<span class="wrapper">
					<el-button :plain="true" type="primary" :class="activeClass == 1 ? 'active' : '' "
							   @click="sortOrder(1)" size="small">按销量排序</el-button>
					<el-button :plain="true" type="primary" :class="activeClass == 2 ? 'active' : '' "
							   @click="sortOrder(2)" size="small">按售价排序</el-button>
					<el-button :plain="true" type="primary" :class="activeClass == 3 ? 'active' : '' "
							   @click="sortOrder(3)" size="small">按库存排序</el-button>
				</span>
            </div> -->
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部商品" name="first"/>
                <el-tab-pane label="出售中" name="second"/>
                <el-tab-pane label="已售完" name="third"/>
                <el-tab-pane label="已下架" name="fourth"/>
            </el-tabs>
            <div class="filter-box">
                <el-form :inline="true" :model="filterForm" class="form-inline">
                    <el-form-item label="商品名称">
                        <el-input size="small" v-model="filterForm.name" placeholder="商品名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="onSubmitFilter">查询</el-button>
                        <el-button size="small" @click="clear">清空</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="tableData" style="width: 100%" stripe>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-table :data="props.row.product" style="width: 100%" stripe>
                            <el-table-column prop="id" label="id" width="60"></el-table-column>
                            <el-table-column prop="goods_sn" label="商品SKU" width="140">
                                <template slot-scope="scope">
                                    <el-input @blur="checkSkuOnly(scope.$index, scope.row)" size="mini"
                                                v-model="scope.row.goods_sn" placeholder="商品SKU"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="goods_aka" label="快递单上的简称" width="160">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.goods_name"
                                                placeholder="简称"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="value" label="型号/规格" width="140">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.value" placeholder="如1斤/条"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="cost" label="成本(元)" width="90">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.cost" placeholder="成本"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="retail_price" label="零售(元)" width="90">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.retail_price"
                                                placeholder="零售"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="goods_weight" label="重量(KG)" width="90">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.goods_weight"
                                                placeholder="重量"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="goods_number" label="库存" width="90">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.goods_number"
                                                placeholder="库存"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="140">
                                <template slot-scope="scope">
                                    <el-button
                                            size="mini"
                                            type="danger"
                                            icon="el-icon-check" circle
                                            @click="specSave(scope.$index, scope.row)">
                                    </el-button>
                                    <el-switch
                                            size="mini"
                                            v-model="scope.row.is_on_sale"
                                            active-text=""
                                            inactive-text=""
                                            active-value="1"
                                            inactive-value="0"
                                            @change='changeProductStatus($event,scope.row.id)'>
                                    </el-switch>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID" width="120"></el-table-column>
                <el-table-column prop="list_pic_url" label="商品图片" width="80">
                    <template slot-scope="scope">
                        <img :src="scope.row.list_pic_url" alt="" style="width: 40px;height: 40px">
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="商品名称"></el-table-column>
                <el-table-column prop="sort_order" label="排序" width="140" sortable>
                    <template slot-scope="scope">
                        <el-input-number class="sort-width" size="mini" :min="1" :max="100" controls-position="right" v-model="scope.row.sort_order" placeholder="排序" @blur="submitSort(scope.$index, scope.row)" @change="submitSort(scope.$index, scope.row)"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column prop="sell_volume" label="销量" width="80" sortable></el-table-column>
                <el-table-column prop="goods_number" label="库存" width="80" sortable>
                </el-table-column>
                <el-table-column label="首页显示" width="80">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.is_index"
                                active-text=""
                                inactive-text=""
                                @change='changeShowStatus($event,scope.row.id)'>
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="上架" width="80">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.is_on_sale"
                                active-text=""
                                inactive-text=""
                                @change='changeStatus($event,scope.row.id)'>
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleRowEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" plain type="danger" @click="handleRowDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page-box">
                <el-pagination @current-change="handlePageChange" :current-page="page" :page-size="size" layout="total, prev, pager, next, jumper" :total="total" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                page: 1,
				size:10,
                total: 0,
                filterForm: {
                    name: ''
                },
                tableData: [],
                activeName: 'second',
                pIndex: 0,
                num: 0,
                activeClass: 0,
                expand:true,
            }
        },
        methods: {
            stockSyc(){
                this.$confirm('确定要同步库存?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.post('crontab/updateStockByHand').then((response) => {
                        if (response.success) {
                            this.$message({
                                type: 'success',
                                message: '同步成功'
                            });
                            this.getOnSaleList();
                        }
                    })
                }).catch(() => {

                });
            },
            updateGoodsNumber(){
                this.axios.post('goods/updateGoodsNumber').then((response) => {
                    if (response.success) {
                        this.$message({
                            type: 'success',
                            message: '同步成功2/2，完成'
                        });
                    }
                })
            },
            specSave(index,row){
                if(row.goods_name == '' || row.value == '' || row.cost == '' || row.retail_price == '' || row.goods_weight == ''){
                    this.$message({
                        type: 'error',
                        message: '值不能为空!'
                    });
                    return false;
                }
                this.axios.post('goods/updatePrice', row).then((response) => {
                    if (response.success) {
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                    }
					else {
                        
						this.$message({
						    type: 'error',
						    message: response.message.message
						});
					}
                })
               
            },
            checkSkuOnly(index,row){
                console.log(index);
                console.log(row);
                if(row.goods_sn == ''){
                    this.$message({
                        type: 'error',
                        message: 'SKU不能为空'
                    })
                    return false;
                }
                this.axios.post('goods/checkSku', {info: row}).then((response) => {
                    if (response.success) {
                        this.$message({
                            type: 'success',
                            message: '该SKU可以用！'
                        })
                    }
                    else{
                        this.$message({
                            type: 'error',
                            message: '该SKU已存在！'
                        })
                    }
                })
            },
            // do not used and what's shot_name
            submitName(index, row){
                this.axios.post('goods/updateShortName', { id: row.id,short_name:row.short_name }).then((response) => {
                    if (response.success) {
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                    }
                })
            },
            submitSort(index, row){
                this.axios.post('goods/updateSort', { id: row.id,sort:row.sort_order }).then((response) => {})
            },
            handleClick(tab, event) {
                let pindex = tab._data.index;
				this.page = 1;
                this.activeClass = 0;
                if (pindex == 0) {
                    this.getList();
                    this.pIndex = 0;
                }
                else if (pindex == 1) {
                    this.getOnSaleList();
                    this.pIndex = 1;
                }
                else if (pindex == 2) {
                    this.getOutList();
                    this.pIndex = 2;
                }
                // else if (pindex == 3) {
                //     this.getDropList();
                //     this.pIndex = 3;
                // }
            },
            handlePageChange(val) {
                this.page = val;
                let nIndex = this.pIndex;
                if (nIndex == 0) {
                    this.getList();
                }
                else if (nIndex == 1) {
                    this.getOnSaleList();
                }
                else if (nIndex == 2) {
                    this.getOutList();
                }
                else if (nIndex == 3) {
                    this.getDropList();
                }
                // else if (nIndex == 4) {
                //     this.sortOrder(this.num);
                // }
            },
            handleRowEdit(index, row) {
                this.$router.push({name: 'goods_add', query: {id: row.id}})
            },
            handleRowDelete(index, row) {

                this.$confirm('确定要删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                let that = this;
                that.axios.post('goods/destory', {id: row.id}).then((response) => {
                    if (response.success) {
                        that.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        let pIndex = localStorage.getItem('pIndex');
                        console.log(pIndex);
                        if (pIndex == 0) {
                            that.getList();
                        }
                        else if (pIndex == 1) {
                            that.getOnSaleList();
                        }
                        else if (pIndex == 2) {
                            that.getOutList();
                        }
                        else if (pIndex == 3) {
                            that.getDropList();
                        }
                    }
                })
                }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消删除'
//                    });
                });
            },
            onSubmitFilter() {
                this.page = 1;
                this.getList();
            },
            clear(){
                this.axios.get('goods', {
                    params: {
                        page: this.page,
                        name: ''
                    }
                }).then((response) => {
                    if (response.success) {
                        this.tableData = response.data.data
                        this.page = response.data.currentPage
                        this.total = response.data.count
                    }
                })
            },
            getList() {
                this.axios.get('goods', {
                    params: {
                        page: this.page,
						size: this.size,
                        name: this.filterForm.name
                    }
                }).then((response) => {
                    if (response.success) {
                        this.tableData = response.data.data;
                        this.page = response.data.currentPage;
                        this.total = response.data.count;
                    }
                })
            },
            getOnSaleList() {
                this.axios.get('goods/onsale', {
                    params: {
                        page: this.page,
						size: this.size
                    }
                }).then((response) => {
                    if (response.success) {
                        this.tableData = response.data.data;
                        this.page = response.data.currentPage;
                        this.total = response.data.count;
                    }
                })
            },
            getOutList() {
                this.axios.get('goods/out', {
                    params: {
                        page: this.page,
						size: this.size
                    }
                }).then((response) => {
                    if (response.success) {
                        this.tableData = response.data.data;
                        this.page = response.data.currentPage;
                        this.total = response.data.count;
                    }
                })
            },
            getDropList() {
                this.axios.get('goods/drop', {
                    params: {
                        page: this.page,
						size: this.size
                    }
                }).then((response) => {
                    if (response.success) {
                        this.tableData = response.data.data;
                        this.page = response.data.currentPage;
                        this.total = response.data.count;
                    }
                })
            },
            // sortOrder(num) {
            //     this.num = num;
            //     this.pIndex = 4;
            //     this.activeClass = num;
            //     this.axios.get('goods/sort', {
            //         params: {
            //             page: this.page,
			// 			size: this.size,
            //             index: num
            //         }
            //     }).then((response) => {
            //         if (response.success) {
            //             this.tableData = response.data.data;
            //             this.page = response.data.currentPage;
            //             this.total = response.data.count;
            //         }
            //     })
            // },
            changeStatus($event, para) {
                this.axios.get('goods/saleStatus', {
                    params: {
                        status: $event,
                        id: para
                    }
                }).then((response) => {
                })
            },
            changeProductStatus($event, para) {
                this.axios.get('goods/productStatus', {
                    params: {
                        status: $event,
                        id: para
                    }
                }).then((response) => {
                })
            },
            changeShowStatus($event, para) {
                this.axios.get('goods/indexShowStatus', {
                    params: {
                        status: $event,
                        id: para
                    }
                }).then((response) => {
                })
            }
        },
        mounted() {
            this.getOnSaleList();
        }
    }

</script>

<style scoped>
    .sort-width{
        width: 90px;
    }
    .right{
        float: right;
    }
    .form-inline {
        margin-top: 2px;
        height: 40px;
        margin-right: 20px;
    }

    .block {
        margin-bottom: 10px;
        height:42px;
        display: flex;
        align-items: center;
        justify-content:space-between;
    }

    .active {
        border-color: #ff4949;
        color: #ff4949;
    }

    .page-container {
        background-color: white;
        padding: 16px;
    }

    .table-tools {
		text-align: right;
		margin-bottom: 8px;
	}
</style>
