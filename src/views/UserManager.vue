<template>
    <div class="page">
        <el-container style="margin-left: 5%;">
            <el-main>
                <div style="margin: 15px; margin-left: 70%;  width: 30%; ;">
                    <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select">
                        <el-select v-model="searchType" style="width: 100px;" slot="prepend" placeholder="请选择">
                            <el-option label="姓名" value="name"></el-option>
                            <el-option label="电话号码" value="phone"></el-option>
                        </el-select>
                        <el-button v-if="searchType != null && searchType != '' && searchInput != ''" @click="search"
                            slot="append" icon="el-icon-search"></el-button>
                        <el-button v-else slot="append" icon="el-icon-search" disabled></el-button>
                    </el-input>
                </div>
                <el-table border ref="selectedUserList" :data="allUserList" :row-class-name="tableRowClassName">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="id" label="用户id" width="75">
                    </el-table-column>
                    <el-table-column label="头像" width="60">
                        <template slot-scope="scope">
                            <img :src="scope.row.face" width="40" height="40" style="border-radius: 20px;"
                                class="head_pic" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="nickname" sortable label="昵称" width="90">
                    </el-table-column>

                    <el-table-column prop="sex" label="性别" width="70">
                        <template slot-scope="scope">
                            {{ scope.row.sex == 0 ? '女' : scope.row.sex == 1 ? '男' : '保密' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="mobile" label="电话号码" width="110">
                    </el-table-column>
                    <el-table-column prop="city" label="城市" width="60">
                    </el-table-column>
                    <el-table-column prop="description" label="个人简介">
                    </el-table-column>
                    <el-table-column prop="profession" label="职业">
                    </el-table-column>
                    <el-table-column prop="createdTime" sortable label="创建时间">
                    </el-table-column>
                    <el-table-column label="是否封禁" style="text-align: center; align-items: center;">
                        <template slot-scope="scope">
                            <el-popconfirm title="确定要删除该用户吗？" @confirm="deleteUser(scope.row)">
                                <el-button size="mini" type="danger" slot="reference">删除</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
            <el-footer>
                <el-pagination small layout="total, sizes, prev, pager, next, jumper" :current-page="pageNo"
                    :page-size="pageSize" :page-sizes="[5, 10, 30, 50]" :total="totalCount" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange">
                </el-pagination>
            </el-footer>
        </el-container>
    </div>
</template>

<script >
import user from '../api/user'
export default {
    name: "UserManager",
    data() {
        return {
            allUserList: [],
            selectedUserList: [],
            pageNo: 1,      // 默认当前是第一页
            pageSize: 5,    // 当前每页的数据是5条
            totalCount: 100,   // 总数默认为0
            searchType: '',
            searchInput: ''
        }
    },
    methods: {
        search() {
            if (!this.searchInput || (!this.searchInput && !this.searchType)) {
                this.getAllUserInfoList()
                return
            }
            user.getUserInfoBySearch(this.searchType, this.searchInput).then(res => {
                let { code, message, data } = res
                if (code == 200) {
                    this.$message.success('查询成功')
                    this.allUserList = data.records
                    this.totalCount = data.total
                }
                this.searchInput = ''
                this.searchType = ''
            })
        },
        tableRowClassName({ row, rowIndex }) {
            if (row.locked) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
        },
        handleCurrentChange(val) { // 修改当前页所触发的函数
            this.pageNo = val;       // 更新当前的页
            this.getAllUserInfoList();          // 按新的pageNo和pageSize进行查询
        },
        handleSizeChange(val) { // 修改每页所存数据量的值所触发的函数
            this.pageSize = val;  // 修改页的大小
            this.getAllUserInfoList();       // 按新的pageNo和pageSize进行查询
        },
        getAllUserInfoList() {
            user.search({
                pages: this.pageNo - 1,
                size: this.pageSize,
            }).then(res => {
                let { code, message, data } = res;
                if (code == 200) {
                    this.pageNo = data.pages
                    this.pageSize = data.size
                    this.allUserList = data.records
                    this.totalCount = data.total
                } else {
                    this.$message.error(message)
                }
            })
        },
        lockUser(index, userInfo) {
            user.lock(userInfo.id).then(res => {
                let { code, message, data } = res
                if (code == 200) {
                    this.$message.success(message)
                    this.getAllUserInfoList()
                }
            })
        },
        deleteUser(userInfo) {
            user.remove(userInfo.id).then(res => {
                let { code, data } = res
                if (code == 200) {
                    this.$message.success(data)
                    this.getAllUserInfoList()
                }
            }).catch(err => {
                console.log(err);
                this.$message.error('出错了，联系管理员')
            })
        }
    },
    mounted() {
        this.getAllUserInfoList()
    }

}

</script>

<style >
.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}

.el-select .el-input {
    width: 110px;
}

.input-with-select .el-input-group__prepend {
    background-color: #fff;
}

.el-container {
    height: 100%
}
</style>
