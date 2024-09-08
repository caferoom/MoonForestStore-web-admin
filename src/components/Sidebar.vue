<template>
  <div class="left-box">
    <div class="logo">
      <img src="/static/images/loading.gif" />
    </div>
    <div class="a" style="overflow-x: hidden; overflow-y: auto; height: 100%">
      <el-menu
        class="sidebar"
        :unique-opened="true"
        :default-active="defaultActive"
        @open="handleOpen"
        :router="true"
        @close="handleClose"
      >
        <el-menu-item index="/welcome">
          <i class="fa fa-tachometer"></i>
          <span>后台主页</span>
        </el-menu-item>
        <el-menu-item index="/order">
          <i class="fa fa-large fa-reorder"></i>
          <span>订单列表</span>
        </el-menu-item>
        <el-submenu index="/goods">
          <template slot="title">
            <i class="fa fa-shopping-bag"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item index="/goods">
            <i class="fa fa-circle"></i>
            <span>商品列表</span>
          </el-menu-item>
          <el-menu-item index="/nature">
            <i class="fa fa-circle"></i>
            <span>商品设置</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/shopcart">
          <i class="fa fa-large fa-shopping-cart"></i>
          <span>购物车</span>
        </el-menu-item>
        <el-menu-item index="/user">
          <i class="fa fa-large fa-users"></i>
          <span>用户列表</span>
        </el-menu-item>
        <el-submenu index="settings">
          <template slot="title">
            <i class="fa fa-large fa-wrench"></i>
            <span>店铺设置</span>
          </template>
          <el-menu-item index="/settings/showset">
            <i class="fa fa-circle"></i>
            <span>显示设置</span>
          </el-menu-item>
          <el-menu-item index="/ad">
            <i class="fa fa-circle"></i>
            <span>广告列表</span>
          </el-menu-item>
          <el-menu-item index="/notice">
            <i class="fa fa-circle"></i>
            <span>公告管理</span>
          </el-menu-item>
          <el-menu-item index="/freight">
            <i class="fa fa-circle"></i>
            <span>运费模板</span>
          </el-menu-item>
          <el-menu-item index="/shipper">
            <i class="fa fa-circle"></i>
            <span>快递设置</span>
          </el-menu-item>
          <el-menu-item index="/admin">
            <i class="fa fa-circle"></i>
            <span>管理员</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item @click="logout">
          <i class="fa fa-large fa-sign-out"></i>
          <span>退出</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultActive: "/dashboard",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      this.$confirm("是否要退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        localStorage.clear();
        this.$router.replace({ name: "login" });
      });
    },
    checkLogin() {
      this.axios.get("auth/checkLogin").then((response) => {
        console.log(response.data);
        if (response.data.statusCode === 401) {
          localStorage.clear();
          this.$router.replace({ name: "login" });
        }
      });
    },
  },
  mounted() {
    console.log(this.$route.path);
    this.checkLogin();
  },
};
</script>

<style>
.left-box {
  width: 200px;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  height: 100%;
  float: left;
  flex-direction: column;
  background: #fff;
}

.left-box .sidebar {
  width: 200px;
  flex: 1;
  border-radius: 0;
  /*background: #233445;*/
}

.left-box .fa {
  margin-right: 10px;
  font-size: 18px;
  /*color: #ccc;*/
}

.left-box span {
  /*color: #ccc;*/
}

.left-box .el-submenu .el-menu-item .fa {
  margin-right: 10px;
  font-size: 10px;
}

/*渐变背景*/
.back {
  background: -webkit-linear-gradient(138deg, #8731e8 0%, #4528dc 100%);
  background: -o-linear-gradient(138deg, #8731e8 0%, #4528dc 100%);
  background: linear-gradient(-48deg, #8731e8 0%, #4528dc 100%);
  opacity: 0.7;
}

.left-box .logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  width: 200px;
  border-right: solid 1px #e6e6e6;
  /*box-shadow: 0 1px 1px rgba(0, 0, 0, .5);*/
}

.left-box .logo img {
  height: 60px;
}
</style>
