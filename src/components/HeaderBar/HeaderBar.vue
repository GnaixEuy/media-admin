<template>
    <div id="header" class="header">
        <div>
        </div>
        <div>
            <el-dropdown>
                <span class="adminMessage">
                    <el-avatar :size=40 :src="user.portrait"></el-avatar>
                    <span class="adminName">{{ nickname }}</span>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <!-- <el-dropdown-item>个人中心</el-dropdown-item> -->
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
        nickname() {
            return this.$store.getters['user/nickname']
        },
        user() {
            return this.$store.getters['user/user']
        }
    }
}
</script>

<style lang="less" scoped>
.header {
    height: 60px;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;

    .adminMessage {
        padding: 0 20px;
        display: flex;
        justify-content: center;
        align-items: center;

        .adminName {
            padding: 0 10px;
        }
    }
}
</style>