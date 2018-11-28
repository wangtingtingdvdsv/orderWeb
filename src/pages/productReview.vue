<template>

  <div class="basetable" v-loading="loading" element-loading-text="拼命加载中">
    <div class="selectMenu">
    <el-input
    class="search"
      placeholder="请输入商品名称进行搜索"
      v-model="input10"
      clearable>
    </el-input>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
    <div class="tableMain">
         <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" height="100%" border style="width: 100%">
            <el-table-column prop="productId" label="商品id">
            </el-table-column>
            <el-table-column prop="productName" label="商品名称">
            </el-table-column>
            <el-table-column prop="productQualityReview" label="商品质量评价（单位：星-人）">
                <template slot-scope="scope">
                    <p>1星：{{slot-scope.row.productQualityReview.one}} &nbsp;&nbsp; 2星：{{slot-scope.row.productQualityReview.two}} </p>
                    <p>3星：{{slot-scope.row.productQualityReview.three}} &nbsp;&nbsp; 4星：{{slot-scope.row.productQualityReview.four}}&nbsp;&nbsp; 5星：{{slot-scope.row.productQualityReview.five}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="productTasteReview" label="商品口味评价（单位：星-人）">
                <template slot-scope="scope">
                    <p>1星：{{slot-scope.row.productTasteReview.one}} &nbsp;&nbsp; 2星：{{slot-scope.row.productTasteReview.two}} </p>
                    <p>3星：{{slot-scope.row.productTasteReview.three}} &nbsp;&nbsp;4星：{{slot-scope.row.productTasteReview.four}}&nbsp;&nbsp; 5星：{{slot-scope.row.productTasteReview.five}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="productPackageReview" label="商品包装评价（单位：星-人）">
                <template slot-scope="scope">
                    <p>1星：{{slot-scope.row.productPackageReview.one}}&nbsp;&nbsp; 2星：{{slot-scope.row.productPackageReview.two}} </p>
                    <p>3星：{{slot-scope.row.productPackageReview.three}}&nbsp;&nbsp; 4星：{{slot-scope.row.productPackageReview.four}}&nbsp;&nbsp; 5星：{{slot-scope.row.productPackageReview.five}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="generalReview" label="总评">
            </el-table-column>
        </el-table>
    </div>
    <div class="page">
      <el-pagination 
          @size-change="handleSizeChange" 
          @current-change="handleCurrentChange" 
          :current-page="currentPage" 
          :page-size='pageSize' 
          layout="prev, pager, next, jumper" 
          :total="tableData.length">
      </el-pagination>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import { reformat } from '../common/reformartDate'
import $ from 'jquery'
export default {
  data() {
    return {
      loading: true,
      input10:"",
      tableData:'',
      reviewInfo: [{
            productId:'180989312',
            productName:'鸡捞',
            productQualityReview:{
                one:'2',
                two:'3',
                three:'4',
                four:'1',
                five:'2'
            },
            productTasteReview:{
                one:'2',
                two:'3',
                three:'4',
                four:'1',
                five:'2'
            },
            productPackageReview:{
                one:'2',
                two:'3',
                three:'4',
                four:'1',
                five:'2'
            },
            generalReview:'34'
        },
        {
            productId:'180989312',
            productName:'鸡捞面',
            productQualityReview:{
                one:'2',
                two:'3',
                three:'4',
                four:'1',
                five:'2'
            },
            productTasteReview:{
                one:'2',
                two:'3',
                three:'4',
                four:'1',
                five:'2'
            },
            productPackageReview:{
                one:'2',
                two:'3',
                three:'4',
                four:'1',
                five:'2'
            },
            generalReview:'34'
        },
        {
            productId:'180989312',
            productName:'鸡捞面',
            productQualityReview:{
                one:'2',
                two:'3',
                three:'4',
                four:'1',
                five:'2'
            },
            productTasteReview:{
                one:'2',
                two:'3',
                three:'4',
                four:'1',
                five:'2'
            },
            productPackageReview:{
                one:'2',
                two:'3',
                three:'4',
                four:'1',
                five:'2'
            },
            generalReview:'34'
        },
        {
            productId:'180989312',
            productName:'鸡捞面',
            productQualityReview:{
                one:'2',
                two:'3',
                three:'4',
                four:'1',
                five:'2'
            },
            productTasteReview:{
                one:'2',
                two:'3',
                three:'4',
                four:'1',
                five:'2'
            },
            productPackageReview:{
                one:'2',
                two:'3',
                three:'4',
                four:'1',
                five:'2'
            },
            generalReview:'34'
        },
        {
            productId:'180989312',
            productName:'鸡捞面',
            productQualityReview:{
                one:'2',
                two:'3',
                three:'4',
                four:'1',
                five:'2'
            },
            productTasteReview:{
                one:'2',
                two:'3',
                three:'4',
                four:'1',
                five:'2'
            },
            productPackageReview:{
                one:'2',
                two:'3',
                three:'4',
                four:'1',
                five:'2'
            },
            generalReview:'34'
        },
        {
            productId:'180989312',
            productName:'鸡捞面',
            productQualityReview:{
                one:'2',
                two:'3',
                three:'4',
                four:'1',
                five:'2'
            },
            productTasteReview:{
                one:'2',
                two:'3',
                three:'4',
                four:'1',
                five:'2'
            },
            productPackageReview:{
                one:'2',
                two:'3',
                three:'4',
                four:'1',
                five:'2'
            },
            generalReview:'34'
        }
      ],
      cityList: [
        { name: '国王大道' },
        { name: '尼泊尔' },
        { name: '沃斯卡亚工业区' },
        { name: '花村' },
        { name: '尼泊尔' },
        { name: '月球基地' },
      ],
      dialogFormVisible: false,
      formLabelWidth: '80px',
      form: {},
      value6: '',
      currentPage: 1,
      currentIndex: '',
      pageSize:4,
      total:1000,
    }
  },
  created() {
    setTimeout(() => {
      this.loading = false
    }, 1500)
    this.tableData = this.reviewInfo;
  },
  methods: {
    showTime() {
      this.$alert(this.value6, '起止时间', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: '已显示'
          })
        }
      })
    },
    search() {
      var search = this.reviewInfo.filter(order => {
          if(order.productName == this.input10.trim()) {
            return order;
          }
      })
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
