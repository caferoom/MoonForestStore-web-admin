<template>
    <div class="page-container">
        <div class="operation-nav">
            <el-button type="primary" size="small" @click="goBackPage" icon="arrow-left">返回列表</el-button>
        </div>
        <div class="form-table-box">
            <el-form ref="infoForm" :rules="infoRules" :model="infoForm" label-width="120px">
                <el-form-item label="模板名字" prop="name">
                    <el-input v-model="infoForm.name" placeholder="请输入模板名称" autofocus></el-input>
                </el-form-item>
                <el-form-item label="包装费用">
                    <el-input v-model="infoForm.package_price"></el-input>
                </el-form-item>
                <el-form-item label="快递收费方式">
                    <el-radio-group v-model="infoForm.freight_type">
                        <el-radio :label="0">按件计费</el-radio>
                        <el-radio :label="1">按重量计费</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="默认运费" class="default-freight">
                    <div class="form-table-box">
                        <el-table :data="defaultData" style="width: 100%" border stripe>
                            <el-table-column prop="start" :label="infoForm.freight_type == 0?'首件(个)':'首重(KG)'"
                            >
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.start" placeholder="个"
                                                @blur="submitValue(scope.$index, scope.row.start)"
                                                autofocus></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="start_fee" label="运费(元)">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.start_fee" placeholder="运费"
                                                @blur="submitValue(scope.$index, scope.row.start_fee)"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="add" :label="infoForm.freight_type == 0?'续件(个)':'续重(KG)'"
                            >
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.add" placeholder="个"
                                                @blur="submitValue(scope.$index, scope.row.add)"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="add_fee" label="运费(元)">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.add_fee" placeholder="运费"
                                                @blur="submitValue(scope.$index, scope.row.add_fee)"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="free_by_number" label="按件包邮" width="140">
                                <template slot-scope="scope">
                                    <el-switch v-if="scope.row.free_by_number == 0"
                                                v-model="scope.row.freeByNumber"
                                                active-color="#13ce66"
                                                @change="changeDefaultNumberSwitch(scope.$index, scope.row)">
                                    </el-switch>
                                    <el-input-number v-if="scope.row.free_by_number > 0" class="number_input"
                                                        :min="0" :max="99999" controls-position="right" size="mini"
                                                        v-model="scope.row.free_by_number" placeholder="件"
                                                        @blur="changeDefaultNumberInput(scope.$index, scope.row.free_by_number)"
                                                        @change="changeDefaultNumberInput(scope.$index, scope.row.free_by_number)"
                                    ></el-input-number>
                                </template>
                            </el-table-column>
                            <el-table-column prop="free_by_money" label="按金额包邮" width="140">
                                <template slot-scope="scope">
                                    <el-switch v-if="scope.row.free_by_money == 0"
                                                v-model="scope.row.freeByMoney"
                                                active-color="#13ce66"
                                                @change="changeDefaultMoneySwitch(scope.$index, scope.row)">
                                    </el-switch>
                                    <el-input-number v-if="scope.row.free_by_money > 0" class="money_input" :min="0"
                                                        :max="99999"
                                                        controls-position="right" size="mini"
                                                        v-model="scope.row.free_by_money" placeholder="金额"
                                                        @blur="changeDefaultMoneyInput(scope.$index, scope.row.free_by_money)"
                                                        @change="changeDefaultMoneyInput(scope.$index, scope.row.free_by_money)"
                                    ></el-input-number>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                </el-form-item>
                <el-form-item label="指定区域运费" class="special-freight">
                    <div class="form-table-box">
                        <el-table :data="tableData" style="width: 100%" border stripe>
                            <el-table-column prop="areaName" label="运送到"></el-table-column>
                            <el-table-column prop="start" :label="infoForm.freight_type == 0?'首件(个)':'首重(KG)'"
                                                width="90">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.start" placeholder="个"
                                                @blur="submitValue(scope.$index, scope.row.start)"
                                                autofocus></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="start_fee" label="运费(元)" width="90">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.start_fee" placeholder="运费"
                                                @blur="submitValue(scope.$index, scope.row.start_fee)"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="add" :label="infoForm.freight_type == 0?'续件(个)':'续重(KG)'"
                                                width="90">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.add" placeholder="个"
                                                @blur="submitValue(scope.$index, scope.row.add)"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="add_fee" label="运费(元)" width="90">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.add_fee" placeholder="运费"
                                                @blur="submitValue(scope.$index, scope.row.add_fee)"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="free_by_number" label="按件包邮" width="120">
                                <template slot-scope="scope">
                                    <el-switch v-if="scope.row.free_by_number == 0"
                                                v-model="scope.row.freeByNumber"
                                                active-color="#13ce66"
                                                @change="changeNumberSwitch(scope.$index, scope.row)">
                                    </el-switch>
                                    <el-input-number v-if="scope.row.free_by_number > 0" class="number_input"
                                                        :min="0" :max="99999" controls-position="right" size="mini"
                                                        v-model="scope.row.free_by_number" placeholder="件"
                                                        @blur="changeNumberInput(scope.$index, scope.row.free_by_number)"
                                                        @change="changeNumberInput(scope.$index, scope.row.free_by_number)"
                                    ></el-input-number>
                                </template>
                            </el-table-column>
                            <el-table-column prop="free_by_money" label="按金额包邮" width="120">
                                <template slot-scope="scope">
                                    <el-switch v-if="scope.row.free_by_money == 0"
                                                v-model="scope.row.freeByMoney"
                                                active-color="#13ce66"
                                                @change="changeMoneySwitch(scope.$index, scope.row)">
                                    </el-switch>
                                    <!-- 目前的逻辑不能实现0元包邮 TODO -->
                                    <el-input-number v-if="scope.row.free_by_money > 0" class="money_input" :min="0"
                                                        :max="99999"
                                                        controls-position="right" size="mini"
                                                        v-model="scope.row.free_by_money" placeholder="金额"
                                                        @blur="changeMoneyInput(scope.$index, scope.row.free_by_money)"
                                                        @change="changeMoneyInput(scope.$index, scope.row.free_by_money)"
                                    ></el-input-number>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="160">
                                <template slot-scope="scope">
                                    <el-button size="mini" type="primary" plain
                                                @click="handleRowEdit(scope.$index, scope.row)">编辑地区
                                    </el-button>
                                    <el-button
                                            @click.native.prevent="deleteRow(scope.$index, tableData)"
                                            type="text"
                                            size="small">
                                        移除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="add-btn">
                        <el-button type="text" @click="add_template">+添加指定地区运费</el-button>
                        <el-form-item>
                            <el-button v-if="infoForm.id" type="danger" class="float-right" @click="onSaveTemplate">
                                保存模板
                            </el-button>
                            <el-button v-else type="danger" class="float-right" @click="onAddTemplate">保存模板2
                            </el-button>
                        </el-form-item>
                    </div>
                </el-form-item>

            </el-form>
        </div>
        <el-dialog size="tiny" title="设置运送到到区域" :visible.sync="specEditVisible">
            <el-form ref="specForm" class="specFormDialig">
                <el-form-item label="" prop="value" label-width="100px">
                    <el-transfer v-model="selectedArea" :props="{key: 'id',label: 'name'}"
                                 :data="areaData" :titles="['可选', '已选']"></el-transfer>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="specEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateArea">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: true,
                nowTableIndex: 0,
                areaData: [],
                selectedArea: [],
                hiddenSelectedArea: [],
                specEditVisible: false,
                infoForm: {
                    id: 0,
                    freight_type: 0,
                    package_price: 0,
                    name: ''
                },
                infoRules: {
                    name: [
                        {required: true, message: '请输入模板名称', trigger: 'blur'},
                    ],
                },
                tableData: [],
                defaultData: [{
                    start: 1,
                    start_fee: 0,
                    add: 1,
                    add_fee: 0,
                    freeByMoney: false,
                    freeByNumber: false,
                    free_by_money: 0,
                    free_by_number: 0,
                }]
            }
        },
        methods: {
            changeDefaultNumberSwitch(index, row) {
                if (row.freeByNumber == true) {
                    this.defaultData[index].free_by_number = 1;
                }
            },
            changeDefaultMoneySwitch(index, row) {
                if (row.freeByMoney == true) {
                    this.defaultData[index].free_by_money = 1;
                }
            },
            changeDefaultNumberInput(index, row) {
                if (row == 0) {
                    this.defaultData[index].freeByNumber = false;
                }
            },
            changeDefaultMoneyInput(index, row) {
                if (row == 0) {
                    this.defaultData[index].freeByMoney = false;
                }
            },

            changeNumberSwitch(index, row) {
                if (row.freeByNumber == true) {
                    this.tableData[index].free_by_number = 1;
                }
            },
            changeMoneySwitch(index, row) {
                if (row.freeByMoney == true) {
                    this.tableData[index].free_by_money = 1;
                }
            },
            changeNumberInput(index, row) {
                if (row == 0) {
                    this.tableData[index].freeByNumber = false;
                }
            },
            changeMoneyInput(index, row) {
                if (row == 0) {
                    this.tableData[index].freeByMoney = false;
                }
            },
            submitValue(index, row) {
                // console.log(row);
                if (row == '' || row < 0) {
                    this.$message({
                        type: 'error',
                        message: '值不能为空或小于零'
                    })
                    return false;
                }
            },
            updateArea() {
                let index = this.nowTableIndex;
                let all = this.areaData;
                let selected = this.selectedArea;
                selected = selected.join(',')
                // 将area 变成 selected
                this.tableData[index].area = selected;

                let areaName = this.selectedArea;

                let newName = [];
                for (const item in areaName) {
                    all.map((ele) => ele.id == areaName[item] ? newName.push(ele.name) : '')
                }

                // 将areaName 变成selected后等areaName;
                this.tableData[index].areaName = newName.join(',');
                this.tableData[index].start = 1;
                this.tableData[index].add = 1;
                this.specEditVisible = false;
            },
            onSaveTemplate() {
                // 校验
                if (this.infoForm.name == '') {
                    this.$message({
                        type: 'error',
                        message: '名称不能为空'
                    })
                    return false;
                }
                for (const ele of this.defaultData) {
                    if (ele.start == 0 || ele.add == 0 || ele.start_fee < 0 || ele.add_fee < 0) {
                        this.$message({
                            type: 'error',
                            message: '值不能为空'
                        })
                        return false;
                    }
                    if (ele.area == '') {
                        this.$message({
                            type: 'error',
                            message: '地区不能为空'
                        })
                        return false;
                    }
                }
                for (const ele of this.tableData) {

                    if (ele.start == 0 || ele.add == 0 || ele.start_fee < 0 || ele.add_fee < 0) {
                        this.$message({
                            type: 'error',
                            message: '值不能为空'
                        })
                        return false;
                    }
                    if (ele.area == '') {
                        this.$message({
                            type: 'error',
                            message: '地区不能为空'
                        })
                        return false;
                    }
                }

                this.axios.post('freight/saveTable', {
                    table: this.tableData,
                    defaultData: this.defaultData,
                    info: this.infoForm
                }).then((response) => {
                    if (response.success) {
                        this.$message({
                            type: 'success',
                            message: '保存成功'
                        });
                        this.getInfo();
                    } else {
                        this.$message({
                            type: 'error',
                            message: '保存失败'
                        })
                    }
                })
            },
            onAddTemplate() {
                // 校验
                if (this.infoForm.name == '') {
                    this.$message({
                        type: 'error',
                        message: '名称不能为空'
                    })
                    return false;
                }
                for (const ele of this.defaultData) {
                    if (ele.start == 0 || ele.add == 0 || ele.start_fee < 0 || ele.add_fee < 0) {
                        this.$message({
                            type: 'error',
                            message: '值不能为空'
                        })
                        return false;
                    }
                    if (ele.area == '') {
                        this.$message({
                            type: 'error',
                            message: '地区不能为空'
                        })
                        return false;
                    }
                }
                for (const ele of this.tableData) {
                    if (ele.start == 0 || ele.add == 0 || ele.start_fee < 0 || ele.add_fee < 0) {
                        this.$message({
                            type: 'error',
                            message: '值不能为空'
                        })
                        return false;
                    }
                    if (ele.area == '') {
                        this.$message({
                            type: 'error',
                            message: '地区不能为空'
                        })
                        return false;
                    }
                }

                this.axios.post('freight/addTable', {
                    table: this.tableData,
                    defaultData: this.defaultData,
                    info: this.infoForm
                }).then((response) => {
                    if (response.success) {
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        this.$router.go(-1);
                    } else {
                        this.$message({
                            type: 'error',
                            message: '添加失败'
                        })
                    }
                })
            },
            deleteRow(index, rows) {
                this.$confirm('确定要删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    rows.splice(index, 1);
                });
            },
            add_template() {
                let ele = {
                    template_id: '',
                    area: '',
                    start: '',
                    start_fee: '',
                    add: '',
                    add_fee: '',
                    free_by_money: false,
                    free_by_number: false,
                }
                this.tableData.push(ele)
            },
            goBackPage() {
                this.$router.go(-1);
            },
            // 打开特殊指定区域运费某一条record的地区设置弹框
            handleRowEdit(index, row) {
                this.nowTableIndex = index;
                let nowArea = this.tableData[index].area;
                this.selectedArea = nowArea ? nowArea.split(',').map(Number) : [];
                let table = this.tableData;
                let area = '';
                for (const ele in table) {
                    if (ele != index) {
                        area = table[ele].area + ',' + area;
                    }
                }
                area = area.split(',');
                let all = this.areaData;
                // 这边前前后后做的操作其实是期望在这次设置中不能选中已经在其他条目地区设置了的地区
                for (const item of all) {
                    item.disabled = false;
                    for (const ele of area) {
                        if (item.id == ele) {
                            item.disabled = true;
                        }
                    }
                }
                this.specEditVisible = true;
            },
            getAllAreaData() {
                this.axios.post('freight/getAllProvinces').then((response) => {
                    if (response.success) {
                        this.areaData = response.data;
                    }
                })
            },
            getInfo() {
                if (this.infoForm.id) {
                    //加载快递公司详情
                    this.axios.post('freight/freightdetail', {
                        id: this.infoForm.id
                    }).then((response) => {
                        if (response.success) {
                            this.infoForm = response.data.freight;
                            this.tableData = response.data.data;
                            this.defaultData = response.data.defaultData;
                        }
                    })
                }
            }
        },
        mounted() {
            this.infoForm.id = this.$route.query.id;
            this.getInfo();
            this.getAllAreaData();
        }
    }

</script>

<style scoped>
    .number_input {
        width: 90px;
    }

    .money_input {
        width: 100px;
    }

    .el-form-item__content {
        display: flex;
        justify-content: flex-start;
    }

    .line-wrap {
        display: flex;
        justify-content: flex-start;
    }

    .default-freight .el-input {
        width: 130px;
        float: left;
    }

    .default-freight .el-input .el-input__inner {
        width: 100px;
    }

    .default-freight .line {
        display: flex;
        justify-content: flex-start;
        border-right: 1px solid #f1f1f1;
        /*padding-right: 40px;*/
        margin-right: 40px;
    }

    .default-freight .line2 {
        display: flex;
        justify-content: flex-start;
    }

    .default-freight .text {
        width: 60px;
        float: left;
        margin-left: 10px;
    }

    .default-freight .text2 {
        width: 50px;
        float: left;
        /*margin: 10px;*/
    }

    .float-right {
        float: right;
    }

    .add-btn {
        color: #3a8ee6;
        font-size: 14px;
        padding: 20px;
        border: 1px solid #f1f1f1;
        border-top: none;
        display: flex;
        justify-content: space-between;
    }
    .page-container {
        background-color: white;
        padding: 16px;
    }
</style>