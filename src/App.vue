<template>
  <router-view v-if="isWithoutAuthentication()" />
  <Layout  v-else />
</template>

<script>
import { flatRoutes } from './common/menu';
import Layout from './components/layout/layout.vue';

  export default {
    name: "admin",
    components: {
      Layout,
    },
    data() {
      return {
      };
    },
    methods: {
      isWithoutAuthentication() {
        const path = this.$route.path;
        return !flatRoutes.find(route => route.url === path);
      }
    },
    mounted() {
    },
  };
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
  background: #f5f7f9;
  font-family: Noto Sans SC, PingFang SC;
}

a,
a:hover {
  text-decoration: none;
}

.content-nav {
  height: 40px;
  background: #f5f7fa;
  margin: 0 0 10px 0;
  display: flex;
}

.content-nav .breadcrumb {
  height: 40px;
  line-height: 40px;
  flex: 1;
  color: #8492a6;
}

.content-nav .operation-nav {
  width: auto;
  display: flex;
  align-items: center;
}

.filter-box {
  height: auto;
  overflow: hidden;
}

.page-box {
  margin-top: 20px;
  text-align: right;
}

.form-table-box .el-input__inner {
  max-width: 240px;
}

.form-table-box .el-textarea {
  width: 400px;
}

.form-table-box .el-form {
  margin-top: 40px;
}

.form-tip {
  color: #888;
  font-size: 12px;
  line-height: 30px;
}
</style>
