<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                 <el-input v-model="query.title" placeholder="请输入文章标题" class="handle-input mr10"></el-input>
                    <el-autocomplete
                    v-model="query.category"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入文章分类"
                    valueKey="name"
                    @select="handleSelect"
                 ></el-autocomplete>

                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button @click="$router.push('/article-add')"> 添加文章 </el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
               <el-table-column type="selection" width="55" align="center"></el-table-column>
                 <el-table-column  prop="id" label="ID" width="55" align="center"></el-table-column>
                 <el-table-column  prop="title" label="文章标题" align="center"></el-table-column>
                 <el-table-column  prop="category" label="文章分类" align="center"></el-table-column>
                <el-table-column label="操作" width="280" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                          <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleComment(scope.$index, scope.row)"
                        >测试评论</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="评论内容">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import article from '../../api/article'
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                title:'',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
        this.getCategoryDate()
    },
    activated(){
       this.getData();
       this.getCategoryDate()
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        async getData() {
         let query={};
         Object.assign(query,this.query)
         let datas=await article.queryList(query)
         this.tableData=datas.datas.rows;
         this.pageTotal=datas.datas.count;
        },
       async getCategoryDate(){
            let datas=await article.queryCategoryList();
            this.restaurants=datas.datas;
       },
     querySearch(queryString, cb) {

        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) !=-1);
        };
      },
        handleSelect(item){
              this.getData();
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },

        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(async () => {
                    await article.del(row.id)
                      this.getData();
                    // this.$message.success('删除成功');
                    // this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
       async handleComment(index,row){
            try{
             let prompt= await  this.$prompt('请输入评论内容', '提示',)
             let param={};
             param['content']=prompt.value;
             param['articleId']=  this.tableData[index].id;

            let datas= await  article.postComment(param)
            }catch(err){

            }
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
          //  this.idx = index;
        //    this.form = row;

        //  this.editVisible = true;
            this.$router.push({path:'/article-edit',query:{id:row.id}})
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
