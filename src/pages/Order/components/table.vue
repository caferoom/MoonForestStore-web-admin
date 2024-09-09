<!-- <template>
  <el-table stripe :data="tableData">
    <el-table-column type="expand" fixed >
        <template slot-scope="scope">
            <div class="content-wrap clearfix">
              <div class="left">
                <div class="goods-list" v-for="iitem in scope.row.goodsList">
                  <img :src="iitem.list_pic_url" class="goods-img" />
                  <div class="goods-name">{{ iitem.goods_aka }}</div>
                  <div class="goods-number">
                    <label>数量：</label>{{ iitem.number }}
                  </div>
                </div>
              </div>
              <div class="user-wrap">
                <div class="avatar-wrap">
                  <img :src="scope.row.userInfo.avatar" class="avatar-img" />
                  <div class="nickname">{{ scope.row.userInfo.nickname }}</div>
                </div>
                <div class="name">姓名：{{ scope.row.userInfo.name }}</div>
                <div class="mobile">手机：{{ scope.row.userInfo.mobile }}</div>
              </div>
              <div class="main">
                <div v-if="scope.row.expressInfo != ''" class="express-info">
                  {{ scope.row.expressInfo }}
                </div>
                <div class="m1">
                  <div class="user-name">{{ scope.row.consignee }}</div>
                  <div class="user-mobile">{{ scope.row.mobile }}</div>
                </div>
                <div class="user-address">
                  {{ scope.row.full_region }}{{ scope.row.address }}
                </div>
                <div v-if="scope.row.postscript != ''" class="user-post">
                  留言：{{ scope.row.postscript }}
                </div>
                <el-input
                  class="admin-memo"
                  type="textarea"
                  @blur="changeMemo(scope.row.id, scope.row.admin_memo)"
                  v-model="scope.row.admin_memo"
                  placeholder="备注"
                ></el-input>
              </div>
              <div class="right">
                <el-button
                  v-if="scope.row.print_status == 1 && scope.row.order_status == 300"
                  class="d-btn"
                  type="primary"
                  @click="deliveryConfirm(scope.row.id)"
                  size="mini"
                  >发货
                </el-button>
                <el-button
                  v-if="scope.row.order_status == 101"
                  size="mini"
                  @click="orderEdit(scope.row)"
                  >修改价格
                </el-button>
                <el-button
                  v-else-if="
                    scope.row.order_status == 300 || scope.row.order_status == 301
                  "
                  size="mini"
                  @click="orderEdit(scope.row)"
                  >打印快递单
                </el-button>
                <el-button
                  class="right-detail"
                  type="text"
                  @click="viewDetail(scope.row.id)"
                  size="mini"
                >
                  查看详情
                </el-button>
              </div>
            </div>
        </template>
    </el-table-column>
    <el-table-column label="订单号" prop="order_sn" fixed width="180"/>
    <el-table-column label="订单状态" prop="order_status_text" width="180"/>
    <el-table-column label="客户姓名" prop="name" width="100" />
    <el-table-column label="商品数量" prop="goodsCount" width="100" />
    <el-table-column label="客户手机号" prop="mobile" width="180" />
    <el-table-column label="线下支付订单" prop="offline_pay" width="180" />
    <el-table-column label="下单时间" prop="add_time" width="180" />
    <el-table-column label="付款时间" prop="pay_time" width="180" >
        <template slot-scope="scope">
        <span v-if="scope.row.pay_time !== 0">{{ scope.row.pay_time }}</span>
        <span v-else>-</span>
        </template>
    </el-table-column>
    <el-table-column label="收件地址" prop="delivery_address" width="180" />
    <el-table-column label="价格(改价前)" prop="change_price" width="180" />
    <el-table-column label="商品价格" prop="goods_prices" width="180" />
    <el-table-column label="运费" prop="freight_price" width="180" />
    <el-table-column label="合计(含运费)" prop="actual_price" width="180" />
    <el-table-column label="操作" fixed="right" width="100">
        <el-button type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
    </el-table-column>
  </el-table>
  <div class="page-box">
    <el-pagination
        @current-change="handlePageChange"
        :current-page="page"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
        return {
          tableData: [{
            order_sn: "1232312321312312",
            name: '王小虎',
            mobile: "1830020000412",
            order_time: "2016-05-02:18:00:00",
            pay_time: "2016-05-03:20:00:00",
            delivery_address: "抵制抵制抵制",
            goods_prices: "200.00",
            express_price: '0.00',
            total_price: '200.00'
          }, {
            waybill: "1232312321312312",
            name: '王小虎',
            mobile: "1830020000412",
            order_time: "2016-05-02:18:00:00",
            pay_time: "2016-05-03:20:00:00",
            delivery_address: "抵制抵制抵制",
            goods_prices: "200.00",
            express_price: '0.00',
            total_price: '200.00'
          }
        ]
        }
    }
  }
</script>

<style scoped>

</style> -->
