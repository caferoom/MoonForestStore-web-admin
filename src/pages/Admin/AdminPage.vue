<template>
	<div class="page-container">
		<div class="table-tools">
			<el-button type="primary" size="small" icon="plus" @click="handleAdd()">添加管理员</el-button>
		</div>
		<el-table :data="tableData" size="small" style="width: 100%" border stripe>
			<el-table-column prop="id" label="ID" width="60"></el-table-column>
			<el-table-column prop="username" label="会员名称"></el-table-column>
			<el-table-column prop="last_login_time" label="最近登录" width="200">
				<template slot-scope="scope">{{formattedTimestamp(scope.row.last_login_time)}}</template>
			</el-table-column>
			<el-table-column prop="last_login_ip" label="登录IP" width="200"></el-table-column>
			<el-table-column label="操作" width="180">
				<template slot-scope="scope">
					<el-button plain size="small" type="primary" @click="handleRowEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button :disabled="scope.row.id === loginInfo.id" plain size="small" type="danger" @click="handleRowDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import { getUserInfo } from '@/common/helper';
import * as moment from 'moment';

export default {
	data() {
		return {
			tableData: [],
            loginInfo: null,
		}
	},
	methods: {
		formattedTimestamp(last_login_time) {
			return last_login_time ? moment(last_login_time).format('YYYY-MM-DD HH:mm:ss') : "尚未登录过";
		},
		handleAdd() {
			this.$router.push({ name: 'admin_add'})
		},
		handleRowEdit(index, row) {
			this.$router.push({ name: 'admin_edit', query: { id: row.id, username: row.username } })
		},
		handleRowDelete(index, row) {
			this.$confirm('确定要删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.axios.post('admin/delete', { id: row.id }).then((response) => {
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
			this.axios.get('admin/list').then((response) => {
				if (response.success) {
					this.tableData = response.data;
				}
			});
		}
	},
	components: {
	},
	mounted() {
		this.getList();
		this.loginInfo = getUserInfo();
	}
}

</script>

<style scoped>
	.page-container {
		background-color: white;
		padding: 16px;
	}

	.table-tools {
		text-align: right;
		margin-bottom: 8px;
	}
</style>
