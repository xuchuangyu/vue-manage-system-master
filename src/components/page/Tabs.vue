<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> tab选项卡</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
                    <el-table :data="unread" :show-header="false" style="width: 100%">
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
                                <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="handle-row">
                        <el-button type="primary">全部标为已读</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`已读消息(${read.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="read" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.content}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column  width="150">
                                    <template slot-scope="scope">
                                {{$common.formatDate(scope.row.created_at)}}
                                 </template>
                            </el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger">删除全部</el-button>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`回收站(${recycle.length})`" name="third">
                    <template v-if="message === 'third'">
                        <el-table :data="recycle" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.content}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column  width="150">
                                   <template slot-scope="scope">
                                {{$common.formatDate(scope.row.created_at)}}
                                 </template>
                            </el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button @click="handleRestore(scope.$index)">还原</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger">清空回收站</el-button>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import Tabs from './Tabs.js'
    export default {
        name: 'tabs',
        data() {
            return {
                message: 'first',
                showHeader: false,
                unread: [],
                read: [],
                recycle: []
            }
        },
        mounted () {
            this.queryLIst()
        },
        activated(){
            this.queryLIst()
        },
        methods: {
           async queryLIst(){
              let datas= await Tabs.queryMessage()
              this.unread=datas.unread;
              this.read=datas.read;
              this.recycle=datas.recycle;
            },
            handerTime(time){
                time=new Date(time).getTime()
                return time;
            },
           async handleRead(index) {
               await Tabs.PutMessage({id:this.unread[index].id,read:1})
                const item = this.unread.splice(index, 1);
                this.read = item.concat(this.read);
            },
           async handleDel(index) {
                await Tabs.PutMessage({id:this.read[index].id,recycle:1})
                const item = this.read.splice(index, 1);
                this.recycle = item.concat(this.recycle);
            },
           async handleRestore(index) {
                 await Tabs.PutMessage({id:this.recycle[index].id,recycle:-1})
                const item = this.recycle.splice(index, 1);
                this.read = item.concat(this.read);
            }
        },
        computed: {
            unreadNum(){
                return this.unread.length;
            }
        }
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
</style>

