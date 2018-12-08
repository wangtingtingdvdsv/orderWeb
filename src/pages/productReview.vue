<template>

  <div class="basetable" >
    <div class="selectMenu">
    <el-input
    class="search"
      placeholder="请输入商品id进行搜索"
      v-model="input10"
      clearable>
    </el-input>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
    <div class="tableMain">
         <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" height="550px" border style="width: 100%">
            <el-table-column prop="comment_id" label="评价id">
            </el-table-column>
            <el-table-column prop="product_id" label="商品id">
            </el-table-column>
            <el-table-column prop="quality_score" label="商品质量评价（单位：星-人）">

            </el-table-column>
            <el-table-column prop="taste_score" label="商品口味评价（单位：星-人）">

            </el-table-column>
            <el-table-column prop="packing_score" label="商品包装评价（单位：星-人）">
            </el-table-column>
        </el-table>
    </div>
    <div class="page">
      <el-pagination 
          @size-change="handleSizeChange" 
          @current-change="handleCurrentChange" 
          :current-page="page" 
          :page-size='pageSize' 
          layout="prev, pager, next, jumper" 
          :total="tableData.length">
      </el-pagination>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import { reformat } from '../common/reformartDate'
export default {
  data() {
    return {
      loading: true,
      input10:"",
      tableData:[],
      reviewInfo: [],

      dialogFormVisible: false,
      formLabelWidth: '80px',
      form: {},
      value6: '',
      currentPage: 1,
      currentIndex: '',
      pageSize:5,
      total:1000,
      page:0
    }
  },
  created() {
    this.getOrderList()
    this.tableData = this.reviewInfo;
  },
  methods: {
      getOrderList() {
        var that = this;
        axios.get('https://wangtingting.top:9005/seller/comment')
        .then(res => {
          let data = res.data.data;
          for(let i = 0; i < data.length; i++) {
            that.reviewInfo[i]={};
            that.reviewInfo[i] = data[i]
          }
          console.log(this.reviewInfo);
          that.page++;   
        }).catch(err => {console.log(err)})
      },
    search() {
      console.log(this.input10.trim())
      console.log( this.reviewInfo);
      var search = this.reviewInfo.filter(order => {
        
          if( order.product_id === this.input10.trim()) {
            console.log("时");
            return order;
          }
      })
      console.log(search);
        this.tableData = search;
    },
    update() {
      this.form.date = reformat(this.form.date)
      this.tableData.push(this.form)
      this.dialogFormVisible = false
    },
    handleEdit(index, row) {
      this.form = this.tableData[index]
      this.currentIndex = index
      this.dialogFormVisible = true
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    cancel() {
      this.dialogFormVisible = false
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange:function(currentPage){
        this.currentPage = currentPage;
    }
  },
}
</script>
<style lang="scss">
.basetable {
  .tableMain {
    margin: {
      top: 10px;
    }
  }
  .page {
    float: right;
    margin: {
      top: 10px;
    }
  }
}
.search{
  display: inline-block;
  width: 40%;
}
</style>
