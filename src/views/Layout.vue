<template>
    <el-container>
        <el-aside width="200px">
            <sider-bar />
        </el-aside>
        <el-container>
            <el-header><header-bar /></el-header>
            <el-main><router-view /></el-main>
        </el-container>
    </el-container>

</template>

<script>
import SiderBar from '@/components/Siderbar/SiderBar.vue';
import HeaderBar from '@/components/HeaderBar/HeaderBar.vue';
export default {
    components: { SiderBar, HeaderBar },
}
</script>


<style scoped>

</style>