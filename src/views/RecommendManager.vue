<template>
    <div class="page">
        <el-container style="padding-left: 15px;">
            <el-main>
                <el-table :data="videoList">
                    <el-table-column prop="id" label="id">
                    </el-table-column>
                    <el-table-column prop="createdBy.id" label="创建人id">
                    </el-table-column>
                    <el-table-column label="创建人">
                        <template slot-scope="scope">
                            <img :src="scope.row.createdBy.portrait" width="40" height="40"
                                style=";border-radius: 20px;" class="head_pic" />
                            <span style="position: absolute;top: 30%;left: 20%;">{{
                                scope.row.createdBy.userNickname
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createdDateTime" label="创建时间">
                    </el-table-column>
                    <el-table-column label="是否推荐">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.recommend" size="mini" type="danger"
                                @click="recommendVideo(scope.$index, scope.row)">
                                取消推荐
                            </el-button>
                            <el-button v-else size="mini" type="success"
                                @click="recommendVideo(scope.$index, scope.row)">推荐
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
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

<script >
import video from '../api/video.js'
import videoApi from '../api/video.js'
export default {

    data() {
        return {
            videoList: [],
            pageNo: 1,      // 默认当前是第一页
            pageSize: 5,    // 当前每页的数据是5条
            totalCount: 0,   // 总数默认为0
        }
    },
    mounted() {
        this.getList()
    },

    methods: {
        getList() {
            videoApi.getVideoListPage()
        },
        getList() {
            videoApi.getVideoListPage({
                page: this.pageNo - 1,
                size: this.pageSize,
            }).then(res => {
                let { code, message, data } = res
                if (code == 200) {
                    this.videoList = data.content
                    this.totalCount = data.totalElements
                }
            })
        },
        recommendVideo(index, obj) {
            videoApi.recommend(obj.id, !obj.recommend).then(res => {
                console.log(res);
                let { code, data } = res
                if (code == 200) {
                    this.$message.success(data)
                    this.getList()
                }



            })
        },
        handleSizeChange(val) {
            this.getList()
        },
        handleCurrentChange(val) {
            this.getList()
        }
    }
}

</script>

<style >

</style>
