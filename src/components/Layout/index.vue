<template>
  <el-container>
    <el-header><NavBar :menuItems="NavMenu" :defaultActive="defaultActive" @onItemClick="onNavBarClick" /></el-header>
      <el-container>
        <el-aside v-if="hasSideBar" width="200px">
          <SideBar :menuItems="sideMenu" />
        </el-aside>
        <el-container>
          <el-main>
            <router-view />
          </el-main>
        <el-footer>
          <Footer/>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup>
import SideBar from './SideBar.vue';
import NavBar from './NavBar.vue';
import Footer from './Footer.vue';
import { workspaceMenuTree } from "@/common/menu";
import { ref } from "vue";

  const defaultActive = "WORKSPACE";
  const NavMenu = [{
      title: '首页',
      index: "HOME",
      disabled: true,
    }, {
      title: "工作台",
      index: "WORKSPACE",
      children: workspaceMenuTree, 
    }
  ];
  
  const sideMenu = ref(NavMenu.find(menu => menu.index === defaultActive).children || []);
  const hasSideBar = ref(NavMenu.find(menu => menu.index === defaultActive).children || NavMenu.find(menu => menu.index === defaultActive).children.length !== 0);

  const onNavBarClick = (e) => {
    sideMenu.value = NavMenu.find(menu => menu.index === e).children || [];
    hasSideBar.value = Boolean(sideMenu.value && sideMenu.value.length !== 0);
  };

</script>