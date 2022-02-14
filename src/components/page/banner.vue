<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-button
            type="primary"
            class="handle-del mr10"
            @click="createdBanner"
        >新建广告</el-button>
      </div>
    </div>
    <div class="container">
      <el-table
          :data="tableData"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @select="selectRow"
          @row-click="rowClick"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column  prop="link"  label="链接" align="center"></el-table-column>
       <el-table-column  prop="pic"  label="图片链接" align="center"></el-table-column>

      </el-table>
      <div class="pagination">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="pageIndex"
            :page-size="pageSize"
            :total="total"
            @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import mixinTable from '@/mixin/table'
import {queryList } from '@/api/banner'
export default {
name: "banner",
  mixins:[mixinTable],
  data(){
    return {
      tableData:[],
      getlist:queryList,
      formInline:{
      },
    }
  },
  methods:{
    createdBanner(){

    },
  },
}
</script>

<style lang="scss" scoped>

</style>
