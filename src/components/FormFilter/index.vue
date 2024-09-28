<template>
        <el-form :inline="true" :model="searchItems" class="demo-form-inline" label-position="top">
            <el-row :gutter="8" >
                <template v-for="item in searchItems" >
                    <el-col v-if="item.type === 'el-input'" :span="24">
                        <el-form-item label="用户昵称" >
                            <el-input placeholder="用户昵称"></el-input>
                        </el-form-item>
                    </el-col>
                </template>
            </el-row>
        </el-form>
</template>

<script setup>

    defineProps(["searchItems"]);

</script>

<style>

</style>