import { scrollTo } from '@/utils/scroll-to'
export default {
    data() {
        return {
            list: null, // 列表数据
            listLoading: false, // 加载标志
            pageIndex: 1, // 页码
            pageSize: 10,// 页面数据量
            pageSizes:[10,20, 100, 200, 300, 400],
            total: 0,// 总数

            timeRander:"",// 时间范围值
            timeDate:"",// 时间范围值
            queryTimeDate:"",// 时间范围值
            autoScroll:false, // 页面切换时自动滚动到顶部标志
            applyQueryTime:"",
        }
    },
    watch:{
        timeRander(newValue){
            if(newValue){
                newValue[1]=newValue[1].replace('00:00:00','23:59:59')
                this.formInline.startTime = newValue[0]
                this.formInline.endTime = newValue[1]
            }else{
                this.formInline.startTime = null
                this.formInline.endTime = null;
            }
        },
        timeDate(newValue){
            if(newValue){
                newValue[1]=newValue[1].replace('00:00:00','23:59:59')
                this.formInline.startDate = newValue[0]
                this.formInline.endDate = newValue[1]
            }else{
                this.formInline.startDate = null
                this.formInline.endDate = null
            }
        },
        queryTimeDate(newValue){
            if(newValue){
                newValue[1]=newValue[1].replace('00:00:00','23:59:59')
                this.formInline.queryStartDate = newValue[0]
                this.formInline.queryEndDate = newValue[1]
            }else{
                this.formInline.queryStartDate = null
                this.formInline.queryEndDate = null
            }
        },
        // 申请时间范围时间段
        applyQueryTime(newValue){
            if(newValue){
                newValue[1]=newValue[1].replace('00:00:00','23:59:59')
                this.formInline.applyQueryStartTime = newValue[0]
                this.query.applyQueryEndTime = newValue[1]
            }else{
                this.formInline.applyQueryStartTime = null
                this.formInline.applyQueryEndTime = null
            }
        },
    },
    created(){
        this.fetchData();
    },
    activated(){
        this.fetchData();
    },
    //公用方法
    methods: {
        // 列表 刷新
        refresh(){
            this.pageIndex = 1;
            this.fetchData();
        },
        // 表格列表请求数据
        fetchData() {
            if(this.listLoading){
                return false;
            }
            this.listLoading = true;
            let params = {
                page:this.pageIndex,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
            };
            let query=this.$route.query;

            this.getlist({
                ...params,
                ...this.formInline,
                ...query
            }).then((response) => {
                this.listLoading = false;
                // 不通接口 返回数据不同 这里只能一个一个做针对区分
                if(response.data&&!Array.isArray(response.data)){
                    // data 是对象不是数据时
                    this.tableData =response.data.records;
                    this.total = response.data.total||0;
                }else{
                    // data 没有 或者 data 是数组时
                    this.tableData = response.rows||response.data||response.listData;
                    this.total = response.total||0;
                }
                if(this.callBack){
                    // 有些页面作为回到方法处理
                    this.callBack(response)
                }
            }).catch(err=>{
                this.listLoading = false;
                this.tableData=[];
                this.total=0;
            });
        },
        // 表格页面数据改变
        handleSizeChange(val) {
            this.pageIndex = 1;
            this.pageSize = val;
            this.fetchData();
        },
        // 表格页面索引改变
        handleCurrentChange(val) {
            this.pageIndex = val;
            this.fetchData();
            if(this.autoScroll){
                scrollTo(100, 800)
            }

        },
        // 这个上方导航的查询
        query() {
            this.pageIndex = 1;
            this.fetchData();
        },
        formatterTime(table,row,value){
            return new Date(value).format('yyyy-MM-dd hh:mm:ss')
        },
        // 选中一行数据
        rowClick:function(row){
            //  this.currentRowId=row.oid;
            this.$refs.table.clearSelection();
            this.$refs.table.toggleRowSelection(row)
        },
        // 点击复选框时触发 (因为点击复选框没有触发选择行事件)
        selectRow:function(val,row){
            if (val.length > 1) {
                this.$refs.table.clearSelection()
                this.$refs.table.toggleRowSelection(val.pop())
            }
            //  this.currentRowId=val[0].oid;;
        },
    },
    filters: {
        filterTime: function(value) {
            return value;
        }
    }
}
