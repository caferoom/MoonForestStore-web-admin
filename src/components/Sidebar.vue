<template>
  <div class="left-box">
      <!-- <div class="logo">
        <img src="/static/images/loading.gif" />
      </div> -->
    <div class="a" style="overflow-x: hidden; overflow-y: auto; height: 100%">
      <el-menu
        class="sidebar"
        :unique-opened="true"
        :default-active="defaultActive"
        router
      >
        <template v-for="(menu, index) in menuTree">
          <el-menu-item v-if="!menu.children" :index="menu.url" @click="handleClick(menu.onClick)">
            <i :class="menu.icon"></i>
            <span>{{menu.name}}</span>
          </el-menu-item>
          <el-submenu v-else :index="menu.url" >
            <template slot="title">
              <i :class="menu.icon"></i>
              <span>{{menu.name}}</span>
            </template>
            <template v-for="subMenu in menu.children">
              <el-menu-item :index="subMenu.url" @click="handleClick(subMenu.onClick)">
                <span>{{subMenu.name}}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { setUserInfo } from "@/common/helper";
import { menuTree } from "../common/menu";

export default {
  data() {
    return {
      defaultActive: "/dashboard",
      menuTree: [
        ...menuTree, 
        {
          name: "退出",
          url: "",
          icon: "el-icon-location",
          onClick: this.logout,
        },
      ],
    };
  },
  methods: {
    handleClick(method) {
      method && method();
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
  },
  mounted() {
    this.axios.post("admin/userInfo").then(res => {
        if (res.success) {
          setUserInfo(res.data);
        }
      });
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
