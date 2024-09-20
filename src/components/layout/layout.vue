<template>
  <div>
    <sidebar/>
    <div class="content">
      <transition name="router-fade" mode="out-in">
        <div>
          <el-breadcrumb class="breadcrumb"> 
            <template v-for="(item, index) in breadcrumbItems" :key="index">
              <el-breadcrumb-item  :to="String(item.url).startsWith('/') ? {path: item.url} : null">{{ item.name }}</el-breadcrumb-item>
            </template>
          </el-breadcrumb>
          <router-view/>
        </div>
      </transition>
    </div>
  </div>
</template>
  
<script>
  import Sidebar from '../Sidebar.vue';
  import { menuTree } from '@/common/menu';
  export default {
    name: "moonforest-layout",
    components: {
        Sidebar
    },
    data: () => {
      return {
        breadcrumbItems: [],
      }
    },
    watch: {
      $route(to, from) {
        this.breadcrumbItems = this.getBreadcrumbFromUrl(to.path);
      }
    },
    mounted() {
      this.breadcrumbItems = this.getBreadcrumbFromUrl(this.$route.path)
    },
    methods: {
      getBreadcrumbFromUrl(path) {
        function func (arr, item, directPath) {
          if (directPath === item.url) {
            return [...arr, {
              name: item.name,
              url: item.url,
            }];
          } else if (!item.children || item.children.length === 0) {
            return null;
          } else {
            let result = null;
            item.children.forEach(child => {
              const r = func([...arr, {
                name: item.name,
                url: item.url,
              }], child, directPath);
              if (r) {
                result = r;
              }
            });
            return result;
          }
        }
        const [first, ...extra] = func([], {name: "首页", url: "/", children: menuTree }, path);
        return extra;
      }
    }
  };
</script>
  
<style>
  .content {
    box-sizing: border-box;
    margin-left: 200px;
    min-height: 700px;
    padding: 20px;
    overflow: auto;
  }

  .breadcrumb {
    margin-bottom: 20px;
  }

</style>
  