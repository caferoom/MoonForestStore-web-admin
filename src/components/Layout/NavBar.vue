<template>
  <div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :default-active="defaultActive"	
      :ellipsis="false"
      @select="onItemClick"
      ref="p"
    >
      <el-menu-item>
        <img
          style="width: 100px"
          src="https://element-plus.org/images/element-plus-logo.svg"
          alt="Element logo"
        />
      </el-menu-item>
      <el-menu-item v-for="item in menuItems" :index="item.index" :key="item.index" :disabled="item.disabled">
        <template #title>{{item.title}}</template>
      </el-menu-item>
      <el-sub-menu>
        <template #title><el-avatar src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" /><div class="username">特朗普</div></template>
          <el-menu-item disabled index="personalCenter">个人中心</el-menu-item>
          <el-menu-item index="exit">退出</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
  </template>
  
  <script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

    // 定义入参
    defineProps({
        menuItems: {
            type: Array<{
              index: string;
              title: string;
              disabled?: boolean;
            }>,
            required: true
        },
        defaultActive: {
          type: String,
        },
    });
    const emit = defineEmits<{
      onItemClick: [index: String],
    }>();

    const onItemClick = (e: String) => {
      if (e === "exit") {
        ElMessageBox.confirm(
          '是否要退出?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
        .then(() => {
          localStorage.clear()
          router.replace({ name: 'login' })
        });
      } else {
        emit('onItemClick', e);
      }
    }
  </script>
  
  <style>
  .el-menu--horizontal > .el-menu-item:nth-child(3) {
    margin-right: auto;
  }

  .username {
    margin-left: 8px;
  }

  </style>