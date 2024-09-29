<template>
	<div class="page-container">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>客户管理</el-breadcrumb-item>
			<el-breadcrumb-item>客户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="main-page" >
			<div class="title">
				<div class="page-title">客户列表</div>
				<div class="page-title-sub">所有客户的基本信息，支持搜索、筛选和状态管理</div>
			</div>
			<el-divider />
			<el-form :inline="true" :model="filtersModel" ref="filterRef" label-position="top">
				<el-row :gutter="16" style="width: 100%;">
					<el-col :span="6">
						<el-form-item label="用户昵称" span="6" style="width: 100%;" prop="nickname">
							<el-input v-model="filtersModel.nickname" placeholder="全部" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="账户状态" style="width: 100%;" prop="is_disabled">
							<el-select
								style="width: 100%;"
								v-model="filtersModel.is_disabled"
								:empty-values="[null, undefined]"
								:value-on-clear="undefined"
								clearable
								placeholder="所有"
							>
								<el-option key="禁用" label="禁用" :value="true" />
								<el-option key="正常" label="正常" :value="false" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="手机号码" style="width: 100%;" prop="mobile">
							<el-input v-model="filtersModel.mobile" placeholder="全部" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="客户ID" style="width: 100%;" prop="weixin_openid">
							<el-input v-model="filtersModel.weixin_openid" placeholder="全部" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="最近登录时间" style="width: 100%;" prop="lastLoginDateRange">
							<el-date-picker
								v-model="filtersModel.lastLoginDateRange"
								type="daterange"
								start-placeholder="Start date"
								end-placeholder="End date"
							/>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div class="filter-operations">
				<el-button type="primary" @click="onSubmit(filterRef)">查询</el-button>
				<el-button type="primary" @click="onReset(filterRef)">重置</el-button>
			</div>
		</div>
		<div class="form-table-box">
			<el-table :data="tableData" style="width: 100%" border stripe>
				<el-table-column prop="is_disabled" label="账户状态" width="90" align="center" >
					<template v-slot="scope">
						<el-tag
							:type='!scope.row.is_disabled  ? "primary" : "danger"'
							effect="plain"
						>
							{{ scope.row.is_disabled ? "禁用" : "正常" }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="weixin_openid" label="微信id" />
				<el-table-column prop="nickname" label="昵称" width="220px"/>
				<el-table-column prop="gender" label="性别" width="80">
					<template v-slot="scope">
						{{ scope.row.gender === 2 ? '女' : scope.row.gender === 1 ? '男' : "未知" }}
					</template>
				</el-table-column>
				<el-table-column prop="mobile" label="手机号" width="180" />
				<el-table-column prop="last_login_time" label="最近登录" width="220px" >
					<template v-slot="scope">
						{{ dayjs(scope.row.last_login_time * 1000).format('YYYY-MM-DD HH:mm:ss') }}
					</template>
				</el-table-column>
				<el-table-column prop="register_time" label="注册时间" width="220px" >
					<template v-slot="scope">
						{{ dayjs(scope.row.register_time * 1000).format('YYYY-MM-DD HH:mm:ss') }}
					</template>
				</el-table-column>
				<el-table-column label="操作" fixed="right" width="160px">
					<template v-slot="scope">
						<el-button size="small" type="primary" @click="handleRowEdit(scope.$index, scope.row)">详情</el-button>
						<el-button v-if="scope.row.is_disabled" size="small" type="primary" plain @click="handleRowDelete(scope.$index, scope.row)">启用</el-button>
						<el-button v-else size="small" type="danger" plain @click="handleRowDelete(scope.$index, scope.row)">禁用</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div>
			<el-pagination
				background
				:default-page-size="pageSize"	
				:page-sizes="PAGE_SIZES"
				v-model:current-page="page"
				v-model:page-size="pageSize"
				:total="total"
				layout="total, prev, pager, next, jumper, sizes"
			/>
		</div>
	</div>
</template>
<script setup>
	import { ref, reactive, onMounted, watch } from 'vue'
	import { useRouter } from 'vue-router'
	import { ElMessageBox, ElMessage, dayjs } from 'element-plus'
	import axios from '@/common/request/axios';

	const router = useRouter();

	const PAGE_SIZES = [5, 50, 100, 200];
	const page = ref(1)
	const pageSize = ref(PAGE_SIZES[0])
	const filterRef = ref()
	const filtersModel = reactive({
		lastLoginDateRange: [],
		nickname: "",
		is_disabled: undefined,
		weixin_openid: "",
		mobile: "",
	});

	const total = ref(0)
	const tableData = ref([])

	const handleRowEdit = (index, row) => {
		router.push({ name: 'user_detail', query: { id: row.id } })
	};

	const handleRowDelete = (index, row) => {
	ElMessageBox.confirm(row.is_disabled ? "确定要启用吗": '确定要禁用吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(() => {
		axios.post('user/accountEnable', { id: row.id, enable: row.is_disabled }).then((response) => {
			if (response.success) {
			ElMessage({
				type: 'success',
				message: row.is_disabled  ? "启用成功!" : '禁用成功!'
			});
			getList()
			}
		})
		})
		.catch(() => {})
	};

	const onSubmit = () => {
		page.value = 1
		getList()
	};

	const onReset = (formEl) => {
		filterRef.value.resetFields();
		onSubmit();
	};

	const getList = () => {
	  const filters = {
		...filtersModel,
		lastLoginDateRange: filtersModel.lastLoginDateRange ? [
			filtersModel.lastLoginDateRange[0] && dayjs(filtersModel.lastLoginDateRange[0]).startOf("day"),
			filtersModel.lastLoginDateRange[1] && dayjs(filtersModel.lastLoginDateRange[1]).endOf("day")
		] : [],
	  };

	  axios
		.post('user/list', {
				page: page.value,
				size: pageSize.value,
				filters,
            })
		.then((response) => {
			if (response.success) {
				tableData.value = response.data.data
				page.value = response.data.currentPage
				total.value = response.data.total
			}
			})
	};

	onMounted(() => {
		getList();
	});
    watch([page, pageSize], getList);

</script>

<style scoped>
	.form-filter {
		width: 100%;
	}

	.main-page {
		margin: 16px 0px;
	}

	.title {
		margin: 16px 0px;
	}
	.page-title {
		font-size: 18px;
		line-height: 24px;
		font-weight: 700;
		color: var(--el-text-color-primary);
	}
	.page-title-sub {
		font-size: 14px;
		line-height: 20px;
		color: var(--el-text-color-regular);
	}

	.filter-operations {
		display: flex;
		justify-content: right;
	}
</style>
