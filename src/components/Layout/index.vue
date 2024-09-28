<template>
  <el-container class="layout-container">
    <el-header class="layout-header">
      <NavBar :menuItems="NavMenu" :defaultActive="defaultActive" @onItemClick="onNavBarClick" />
    </el-header>
    <el-container class="layout-body">
      <el-scrollbar class="layout-side-bar">
        <el-aside v-if="hasSideBar" width="200px">
            <SideBar :menuItems="sideMenu" />
        </el-aside>
      </el-scrollbar>
      <el-container>
        <el-main style="padding: 0px;">
          <el-scrollbar>
            <router-view />
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup>
import SideBar from './SideBar.vue';
import NavBar from './NavBar.vue';
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

<style>


  .layout-container {
    height: 100%;
  }

  .layout-body {
    height: calc(100% - 60px);
  }
   .layout-header {
      position: sticky;
      left: 0;
      top: 0;
   }

   .layout-side-bar {
    box-sizing:content-box;
    border-right: 1px solid var(--el-menu-border-color);
   }

   .layout-side-bar .el-menu {
    border-right: 0px;
   }
</style>