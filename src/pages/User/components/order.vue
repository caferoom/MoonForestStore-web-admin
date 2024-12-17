<template>
    <el-table :data="data" style="width: 100%" border>
        <el-table-column type="expand">
            <template v-slot="scope">
                <div class="goods-list" v-for="iitem in scope.row.goodsList">
                    <img :src="iitem.list_pic_url" class="goods-img">
                    <span class="goods-name">{{iitem.goods_name}}</span>
                    <span class="goods-spec">{{iitem.goods_specifition_name_value}}</span>
                    <span class="goods-number">数量：{{iitem.number}}</span>
                    <span class="goods-number">¥{{iitem.retail_price}}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="order_sn" label="订单号" width="200"/>
        <el-table-column prop="add_time" label="下单时间" width="170"/>
        <el-table-column prop="order_status_text" label="订单状态" width="90"/>
        <el-table-column prop="consignee" label="收件人" width="90"/>
        <el-table-column prop="mobile" label="收件人联系电话" width="160"/>
        <el-table-column prop="full_region" label="收件地址" width="240">
            <template v-slot="scope">
                {{scope.row.full_region}}{{scope.row.address}}
            </template>
        </el-table-column>
        <el-table-column prop="postscript" label="买家备注" width="180" />
        <el-table-column prop="goodsCount" label="商品总数" width="90"/>
        <el-table-column prop="change_price" label="改价前" width="90">
            <template v-slot="scope">
                {{scope.row.change_price!= scope.row.actual_price ? `改价前${item.change_price}元` : "-"}}
            </template>
        </el-table-column>
        <el-table-column prop="actual_price" label="合计" width="280">
            <template v-slot="scope">
                当前合计{{scope.row.actual_price}}元（含运费{{scope.row.freight_price}}元）
            </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="90">
            <template v-slot="scope">
                <el-button type="primary" plain @click="viewDetail(scope.row.order_sn)">详情</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
        background
        :default-page-size="pageSize"	
        :page-sizes="PAGE_SIZES"
        v-model:current-page="page"
        v-model:page-size="pageSize"
        :total="total"
        layout="total, prev, pager, next, jumper, sizes"
    />
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue';
	import axios from '@/common/request/axios';
	import { useRouter } from 'vue-router';
	const router = useRouter();

    const PAGE_SIZES = [5, 50, 100, 200];
    const data = ref([]);
    const page = ref(1);
    const total = ref(0);
	const pageSize = ref(PAGE_SIZES[0]);

    // 定义入参
    const props = defineProps({
        id: Number,
    });

    // 方法
    const getOrder = () => {
        axios.get('user/order', {
            params: {
                id: props.id,
                page: page.value,
                size: pageSize.value,
            }
        }).then((response) => {
            if (response.success) {
                data.value = response.data.data;
                page.value = response.data.currentPage;
                total.value = response.data.count
            }
        })
    };

    const viewDetail = (index) => {
        router.push({name: 'order_detail', query: {order_sn: index}});
    };

    onMounted(() => {
        getOrder();
    });

    watch([page, pageSize], getOrder);

</script>

<style>
  .goods-list {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .goods-img {
    height: 100px;
  }

</style>
