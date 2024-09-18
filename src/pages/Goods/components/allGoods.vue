<template>
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
</template>

<script>


export default {
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
  },
};
</script>

<style>

</style>
