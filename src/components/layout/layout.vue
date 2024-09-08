<template>
  <div class="container">
    <sidebar/>
    <div class="content">
      <transition name="router-fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>
  
<script>
  import Sidebar from '../Sidebar.vue';

  export default {
    name: "moonforest-layout",
    components: {
        Sidebar
    },
  };
</script>
  
<style>
  .content {
    box-sizing: border-box;
    padding: 20px 20px 20px 220px;
    min-height: 700px;
    overflow: auto;
  }
</style>
  