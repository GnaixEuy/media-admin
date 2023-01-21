<template>
    <div style="height: 100vh;">
        <el-menu class="sidebar-el-menu" :default-openeds="openeds" router @open="handleOpen" @close="handleClose"
            background-color="#545c64" text-color="#fff" active-text-color="#ad90da">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>业务管理</span>
                </template>
                <el-menu-item-group>
                    <template slot="title">视频业务</template>
                    <el-menu-item index="VideoManager">
                        <i class="el-icon-video-camera"></i>
                        <span slot="title">视屏管理</span>
                    </el-menu-item>
                    <el-menu-item index="RecommendManager">
                        <i class="el-icon-s-flag"></i>
                        <span slot="title">推荐管理</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-menu-item index="UserManager">
                <i class="el-icon-menu"></i>
                <span slot="title">用户管理</span>
            </el-menu-item>
            <li style="flex:1;"></li>
            <el-menu-item index="about">
                <i class="el-icon-setting"></i>
                <span slot="title">平台信息</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>


<script>


export default {
    name: "SiderBar",
    data() {
        return {
            openeds: ['1'],
            uniqueOpened: false
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style scoped>
.sidebar-el-menu:not(.el-menu--collapse) {
    height: 100%;
}

.sidebar-el-menu {
    position: absolute;
    left: 0;
    /* top: 70px; */
    bottom: 0;
    overflow-y: scroll;

}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
    display: flex;
    flex-direction: column;
}

.sidebar-el-menu:not(.el-menu--collapse)>ul {
    height: 100%;
}

.sidebar-el-menu:not(.el-menu--collapse)>ul.doc {
    flex: 0 0 56px;
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 100%;
    align-items: center;
    font-size: 14px;
    color: #fff;
}

.sidebar-el-menu:not(.el-menu--collapse)>ul.doc>.icon {
    width: 24px;
    font-size: 18px;
    vertical-align: middle;
    margin-right: 5px;
}
</style>