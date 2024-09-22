<template>
    <el-menu
      :unique-opened="true"
      default-active="/home"
      class="el-menu-vertical"
      :router="true"
    >
      <template v-for="item in menuItems" :key="item.path">
        <el-sub-menu v-if="item.children && item.children.length !== 0" :index="item.path">
          <template #title>
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            {{ item.title }}
          </template>
          <el-menu-item v-for="subItem in item.children" :key="subItem.path" :index="subItem.path">
            <el-icon>
                <component :is="subItem.icon" />
              </el-icon>
            {{ subItem.title }}
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.path">
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          {{ item.title }}
        </el-menu-item>
      </template>
    </el-menu>
</template>
  
<script lang="ts" setup>
    // 定义入参
    defineProps({
        menuItems: {
            type: Array<{
              path: string;
              title: string;
              icon: string;
              children?: {
                path: string;
                title: string;
                icon: string;
              }[];
            }>,
            required: true
        },
    });
</script>
  
<style>
    .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    }
</style>