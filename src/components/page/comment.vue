<template>
    <div>
          <el-table :data="datas" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.content}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="180">
                              <template slot-scope="scope">
                              {{$common.formatDate(scope.row.created_at)}}
                             </template>
                        </el-table-column>
                        <el-table-column width="120">
                            <template slot-scope="scope">
                                <!-- <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button> -->
                            </template>
                        </el-table-column>
              </el-table>
    </div>
</template>

<script>
    import commmentApi from '../../api/comment'
    export default {
        data() {
            return {
                datas: [],
            }
        },
        mounted () {
           this.queryLIst()
        },
        methods: {
            async queryLIst() {
              let res= await commmentApi.queryComment()
              this.datas=res.datas.rows;
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
