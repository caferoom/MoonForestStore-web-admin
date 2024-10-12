<template>
    <el-table :data="data" style="width: 100%" stripe border>
        <el-table-column prop="id" label="商品ID" width="100px"></el-table-column>
        <el-table-column prop="list_pic_url" label="图片" width="70px">
            <template slot-scope="scope">
                <img :src="scope.row.list_pic_url" alt="" style="width: 50px;height: 50px">
            </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
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
    const getTrackData = () => {
        axios.get('user/foot', {
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

    onMounted(() => {
        getTrackData();
    });

    watch([page, pageSize], getTrackData);

</script>

<style>
</style>
