<template>
    <div class="page-container">
    <el-page-header @back="onBack">
      <template #breadcrumb>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item >客户管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'user' }">客户列表</el-breadcrumb-item>
          <el-breadcrumb-item>客户详情</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <template #content>
        <div class="flex items-center">
          <span class="text-large font-600 mr-3"> 客户详情 </span>
          <span
            class="text-sm mr-2"
            style="color: var(--el-text-color-regular)"
          >
            客户的详细信息，包括订单情况，收件地址等
          </span>
        </div>
      </template>
      <el-descriptions :column="3" size="small" class="mt-4">
        <el-descriptions-item label="用户ID">
          kooriookami
        </el-descriptions-item>
        <el-descriptions-item label="昵称">
          kooriookami
        </el-descriptions-item>
        <el-descriptions-item label="电话">
          18100000000
        </el-descriptions-item>
        <el-descriptions-item label="注册时间">
          18100000000
        </el-descriptions-item>
        <el-descriptions-item label="最近登录">
          18100000000
        </el-descriptions-item>
        <el-descriptions-item label="城市">Suzhou</el-descriptions-item>
        <el-descriptions-item label="性别">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="地址">
          No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </el-descriptions-item>
      </el-descriptions>
    </el-page-header>
    <el-row :gutter="16">
    <el-col :span="6">
        <el-card>
            <template #header>提交订单数</template>
            <el-statistic :value="98500" suffix="单" />
        </el-card>
    </el-col>
    <el-col :span="6">
      <el-card>
        <template #header>成交订单</template>
        <el-statistic :value="98500" suffix="单" />
      </el-card>
    </el-col>
    <el-col :span="6">
        <el-card>
            <template #header>消费金额</template>
            <el-statistic :value="98500" suffix="元" />
        </el-card>
    </el-col>
    <el-col :span="6">
        <el-card>
            <template #header>加入购物车</template>
            <el-statistic :value="98500" suffix="件" />
        </el-card>
    </el-col>
    </el-row>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="订单" name="first"></el-tab-pane>
            <el-tab-pane label="地址管理" name="second"></el-tab-pane>
            <el-tab-pane label="购物车" name="third"></el-tab-pane>
            <el-tab-pane label="足迹" name="fourth"></el-tab-pane>
        </el-tabs>
        <OrderTable v-if="activeName === 'first'" :id="user_id" />
        <AddressTable v-if="activeName === 'second'" :id="user_id" />
        <shoppingCartTable v-if="activeName === 'third'" :id="user_id" />
        <TrackTable v-if="activeName === 'fourth'" :id="user_id" />
    </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import { useRouter, useRoute } from "vue-router";
    import AddressTable from "./components/address";
    import OrderTable from "./components/order";
    import shoppingCartTable from "./components/shoppingCart";
    import TrackTable from "./components/track";
    import axios from "axios"; // 确保正确引入 axios
    import { ElMessage } from "element-plus"; // 确保引入 ElMessage

    const router = useRouter();
    const route = useRoute();

    const activeName = ref("first");
    const user_id = ref(Number(route.query.id || 0));
    const dataInfo = ref({});

    const onBack = () => {
        router.go(-1);
    };

    const submitName = (index, row) => {
        axios.post("user/updateName", { id: row.id, name: row.name }).then((response) => {
            if (response.data.success) {
            ElMessage({
                type: "success",
                message: "修改成功!",
            });
            } else {
            ElMessage({
                type: "error",
                message: "修改失败",
            });
            }
        });
    };

    const submitMobile = (index, row) => {
        axios.post("user/updateMobile", { id: row.id, mobile: row.mobile }).then((response) => {
            if (response.data.success) {
            ElMessage({
                type: "success",
                message: "修改成功!",
            });
            } else {
            ElMessage({
                type: "error",
                message: "修改失败",
            });
            }
        });
    };

    const datainfo = () => {
        if (user_id.value <= 0) {
            return false;
        }
        axios
            .get("user/datainfo", {
            params: {
                id: user_id.value,
            },
            })
            .then((response) => {
            if (response.data.success) {
                dataInfo.value = response.data.data;
            }
            });
    };

    onMounted(() => {
        datainfo();
    });
</script>

<style>
</style>
