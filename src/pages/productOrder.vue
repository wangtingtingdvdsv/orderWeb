<template>
  <div class="basetable"  element-loading-text="拼命加载中">
    <div class="selectMenu">
      <el-input
      class="search"
      placeholder="请输入姓名进行搜索"
      v-model="input10"
      clearable>
      </el-input>
      <el-button type="primary" @click="search">搜索</el-button>

  
    </div>
    <div class="tableMain">
         <el-table height="500px" border style="width: 100%"
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
         >
            <el-table-column prop="order_id" label="订单id">
            </el-table-column>
            <el-table-column prop="user_name" label="姓名">
            </el-table-column>
            <el-table-column prop="user_phone" label="手机号">
            </el-table-column>
            <el-table-column prop="user_address" label="地址">
            </el-table-column>
            <el-table-column prop="order_amount" label="金额">
            </el-table-column>
            <el-table-column prop="order_status" label="订单状态">
            </el-table-column>
            <el-table-column prop="pay_status" label="支付状态">
            </el-table-column>
            <el-table-column prop="delivery_time" label="配送时间">
            </el-table-column>
            <el-table-column prop="update_time" label="创建时间">
            </el-table-column>
            <!-- <el-table-column label="操作" width="170">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(slot-scope.$index, slot-scope.row)">{{orderStatus}}
                    </el-button>
                    <el-button size="small" type="danger" @click="handleDelete(slot-scope.$index, slot-scope.row)">取消
                    </el-button>
                </template>
            </el-table-column> -->
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
import $ from 'jquery'
export default {
  data() {
    return {
      orderStatus:'接单',
      input10: '',
      dialogFormVisible:false,

      formLabelWidth: '120px',
      orderInfo:[],
      tableData: [],

      currentPage: 1,
      currentIndex: '',
      pageSize:5,
      total:1000,
      page:1
    }
  },
  mounted() {
    this.getOrderList()
    this.tableData = this.orderInfo;
  },
  methods: {
    getOrderList() {
      var that = this;
      axios.get('http://localhost:3004/seller/order/list')
      .then(res => {
        let data = res.data.data;
       
        for(let i = 0; i < data.length; i++) {
            that.orderInfo[i]={};
            that.orderInfo[i] = data[i]
        }
        that.page++;
      }).catch(err => {console.log(err)})
    },
    

    search() {
      var search = this.orderInfo.filter(order => {
          if(order.user_name == this.input10.trim()) {
            return order;
          }
      })
        this.tableData = search;
    },
    handleEdit(index, row) {
      // alert(index);
      // alert(row);
      // this.currentIndex = index
      // this.dialogFormVisible = true
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
    handleSizeChange() {
      this.pagesize = this.pageSize;
    },
    handleCurrentChange:function(change){
      console.log("change", change);
        this.currentPage = change;
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
