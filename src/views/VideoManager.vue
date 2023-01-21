<template>
    <div class="page">
        <el-container>
            <el-main>
                <div style="margin: 15px; margin-left: 70%;  width: 30%; ;">
                    <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select">
                        <el-select v-model="searchType" slot="prepend" style="width: 100px;" placeholder="请选择">
                            <el-option label="tag(不可用)" disabled value="tag"></el-option>
                            <el-option label="发布者" value="creator"></el-option>
                        </el-select>
                        <el-button v-if="searchType != null && searchType != '' && searchInput != ''" @click="search"
                            slot="append" icon="el-icon-search"></el-button>
                        <el-button v-else slot="append" icon="el-icon-search" disabled></el-button>
                    </el-input>
                </div>
                <el-row style="width: 100%;">
                    <el-col :span="5" v-for="(o, index) in allVideoList" :key="o.id">
                        <el-card style="margin: 0px; width: 90%;" :body-style="{ padding: '10px' }">
                            <img :src="o.cover.uri" class="image">
                            <div style="padding: 14px;">
                                <span>文案： {{ o.bio }}</span><br />
                                <span>发布者： <el-button type="text" @click="showCreator(o)">{{
                                    o.createdBy.userNickname
                                }}</el-button>
                                    <el-button type="text" @click="showComments(o)">
                                        评论</el-button>
                                </span>
                                <div>发布于： {{ o.device }}</div>
                                <div class="bottom clearfix">
                                    <time class="time">{{ o.createdDateTime }}</time>
                                    <el-button type="text"
                                        @click="direction = 'rtl'; drawer = true; getLikeThePeopleList(o); ">查看点赞人员列表信息</el-button>
                                    <!-- <el-button type="text"
                                        @click="direction = 'btt'; drawer = true; getLikeThePeopleList(o); ">查看点赞趋势信息</el-button> -->
                                </div>
                                <div>
                                    <el-button v-if="o.locked" size="mini" type="success" @click="lockVideo(index, o)">
                                        解封
                                    </el-button>
                                    <el-button v-else size="mini" type="primary"
                                        @click="lockVideo(index, o)">封禁</el-button>
                                    <el-button size="mini" type="danger" @click="deleteVideo(o)">删除</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-drawer :title="'bio: ' + item.bio" :visible.sync="drawer" :direction="direction"
                        :before-close="rtlDrawerHandleClose">
                        <div v-if="direction == 'rtl'">
                            <el-table :data="LikeThePeopleList" border style="width: 100%">
                                <el-table-column prop="nickname" label="姓名" width="180">
                                </el-table-column>
                                <el-table-column prop="createdDateTime" label="点赞时间">
                                </el-table-column>
                            </el-table>
                        </div>
                        <div v-else>

                        </div>
                    </el-drawer>
                </el-row>

                <el-dialog title="收货地址" :visible.sync="commentDialogTableVisible">
                    <el-table :data="commentList">
                        <el-table-column label="昵称" width="150">
                            <template slot-scope="scope">
                                <img :src="scope.row.commenterHeaderUrl" width="40" height="40"
                                    style="border-radius: 20px;" class="head_pic" /><span> {{
                                        scope.row.commenterName
                                    }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column property="commentContent" label="内容" width="200"></el-table-column>
                        <el-table-column property="dateTime" label="时间"></el-table-column>
                        <el-table-column label="是否删除">
                            <template slot-scope="scope">
                                <el-popconfirm title="确定要删除该评论吗？" @confirm="deleteComment(scope.$index, scope.row)">
                                    <el-button size="mini" type="danger" slot="reference">删除</el-button>
                                </el-popconfirm>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-dialog>
                <el-dialog v-if="item.createdBy != null" :title="item.createdBy.userNickname"
                    :visible.sync="userDialogTableVisible">
                    <div>
                        <img :src="item.createdBy.portrait" width="40" height="40" style="border-radius: 20px;"
                            class="head_pic" />
                    </div>
                    <div>bio : {{ item.createdBy.bio }}</div>
                    <div>创建时间：{{ item.createdBy.createdDateTime }}</div>
                    <div>生日：{{ item.createdBy.userBirthday }}</div>
                    <div>手机号：{{ item.createdBy.userPhone }}</div>
                </el-dialog>
            </el-main>
            <el-footer>
                <el-pagination small layout="total, sizes, prev, pager, next, jumper" :current-page="pageNo"
                    :page-size="pageSize" :page-sizes="[5, 10, 30, 50]" :total="totalCount"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange">
                </el-pagination>
            </el-footer>
        </el-container>

    </div>
</template>

<style>
.page {
    margin-left: 3%;
}

.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}

.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>

<script>
import videoApi from '../api/video.js'
export default {
    name: "VideoManager",
    data() {
        return {
            item: {},
            allVideoList: [],
            selectedVideoList: [],
            commentList: [],
            pageNo: 1,      // 默认当前是第一页
            pageSize: 5,    // 当前每页的数据是5条
            totalCount: 100,   // 总数默认为0
            searchType: '',
            searchInput: '',
            drawer: false,
            LikeThePeopleList: [],
            direction: "rtl",
            userDialogTableVisible: false,

            commentDialogTableVisible: false
        }
    },
    mounted() {
        this.getVideoListPage()
    },
    methods: {
        showComments(obj) {
            this.item = obj
            videoApi.getCommentsByVideoId(obj.id).then(res => {
                let { code, data } = res
                if (code == 200) {
                    this.commentList = data.commentList
                }
            })
            this.commentDialogTableVisible = true
        },
        showCreator(obj) {
            this.item = obj
            this.userDialogTableVisible = true
        },
        getLikeThePeopleList(obj) {
            this.item = obj
            videoApi.getLikeThePeopleList(obj.id).then(res => {
                console.log(res);
                let { code, data } = res
                if (code) {
                    this.LikeThePeopleList = data
                }
            }).catch(err => {
                console.log(err);
            })
        },
        rtlDrawerHandleClose() {
            this.drawer = false
            this.item = {}
            this.LikeThePeopleList = []
        },
        lockVideo(index, video) {
            videoApi.lock(video.id).then(res => {
                let { code, message, data } = res
                if (code == 200) {
                    this.$message.success(data)
                } else {
                    this.$message.error(data)
                }
                this.getVideoListPage()
            })
        },
        deleteVideo(video) {
            videoApi.remove(video.id).then(res => {
                let { code, message, data } = res
                if (code == 200) {
                    this.$message.success(data)
                } else {
                    this.$message.error(data)
                }
                this.getVideoListPage()
            })
        },
        search() {
            videoApi.search(this.searchType, this.searchInput).then(res => {
                let { code, data } = res;
                if (code == 200) {
                    if (data.length = 0) {
                        this.$notify({
                            title: '成功',
                            message: '无结果',
                            type: 'success'
                        });
                        this.allVideoList = []
                    } else {
                        this.allVideoList = data
                    }
                }
            })
        },
        getVideoListPage() {
            videoApi.getVideoListPage({
                page: this.pageNo - 1,
                size: this.pageSize,
            }).then(res => {
                let { code, message, data } = res
                if (code == 200) {
                    this.allVideoList = data.content
                    this.totalCount = data.totalElements
                }
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
            this.getVideoListPage();          // 按新的pageNo和pageSize进行查询
        },
        handleSizeChange(val) { // 修改每页所存数据量的值所触发的函数
            this.pageSize = val;  // 修改页的大小
            this.getVideoListPage();       // 按新的pageNo和pageSize进行查询
        },
        deleteComment(index, obj) {
            console.log(index, obj);
            videoApi.deleteComment(obj.id).then(res => {
                console.log(res);
                let { code, data } = res
                if (code == 200) {
                    this.$message.success(data)
                    videoApi.getCommentsByVideoId(this.item.id).then(res => {
                        let { code, data } = res
                        if (code == 200) {
                            this.commentList = data.commentList
                        }
                    })
                }
            })
        }
    }
}

</script>