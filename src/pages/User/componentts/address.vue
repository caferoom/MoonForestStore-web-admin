<template>
    <div>
        <div>
            <div class="top">
                <div class="l">
                    <div class="f1" style="width: 100px;">收件人</div>
                    <div class="f1" style="width: 100px;">手机</div>
                    <div class="f1" style="width: 600px;">详细地址</div>
                </div>
                <div class="r">操作</div>
            </div>
            <div class="bottom" v-for="item in addressData">
                <div class="l">
                    <div class="f1" style="width: 100px;">{{item.name}}</div>
                    <div class="f1" style="width: 100px;">{{item.mobile}}</div>
                    <div class="f1" style="width: 600px;">{{item.full_region}}</div>
                </div>
                <div class="r">
                    <el-button size="small" @click="addressEdit(item)">编辑</el-button>
                </div>
            </div>
            <div class="page-box">
                <el-pagination @current-change="handlePageChange" :current-page="page" :page-size="10"
                               layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="修改地址" :visible.sync="dialogAddressVisible">
            <el-form :model="nowAddressData">
                <el-form-item label="所在地区:" label-width="120px">
                    <el-cascader
                            :options="options"
                            placeholder="请选择"
                            v-model="addOptions">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="详细地址:" label-width="120px">
                    <el-input class="el-input" v-model="nowAddressData.address" auto-complete="off"
                              placeholder="请输入详细地"></el-input>
                </el-form-item>
                <el-form-item label="收货人:" label-width="120px">
                    <el-input class="el-input" v-model="nowAddressData.name" auto-complete="off"
                              placeholder="请输入收货人"></el-input>
                </el-form-item>
                <el-form-item label="手机:" label-width="120px">
                    <el-input class="el-input" v-model="nowAddressData.mobile" auto-complete="off"
                              placeholder="请输入收货人手机"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddressVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAddress">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
        data() {
            return {
                addressData: [],
                page: 1,
                total: 0,
                infoForm: {
                    id: 0
                },
                dialogAddressVisible: false,
                nowAddressData: {},
                addOptions: [],
                options: [],
            }
        },
        methods: {
            saveAddress() {
                this.nowAddressData.addOptions = this.addOptions;
                this.$axios.post('user/saveaddress', this.nowAddressData).then((response) => {
                    if (response.success) {
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                        this.addressData = [];
                        this.getAddress();
                        this.dialogAddressVisible = false;
                    } else {
                        this.$message({
                            type: 'error',
                            message: '修改失败'
                        })
                    }
                })
            },
            addressEdit(item) {
                this.nowAddressData = item;
                this.addOptions.push(
                    item.province_id,
                    item.city_id,
                    item.district_id,
                )

                this.dialogAddressVisible = true
            },
            handlePageChange(val) {
                this.page = val;
                this.getAddress();
            },
            getAddress() {
                if (this.infoForm.id <= 0) {
                    return false
                }
                let that = this;
                this.$axios.get('user/address', {
                    params: {
                        id: that.infoForm.id,
                        page: this.page,
                    }
                }).then((response) => {
                    if (response.success) {
                        this.addressData = response.data.data;
                        this.page = response.data.currentPage;
                        this.total = response.data.count;
                    }
                })
            },
            getAllRegion() {
                let that = this;
                this.$axios.get('common/getAllRegion').then((response) => {
                    if (response.success) {
                        this.options = response.data;
                    }
                })
            },
        },
        mounted() {
            this.infoForm.id = this.$route.query.id || 0;
            this.getAllRegion();
        }
    }
</script>

<style>
</style>
