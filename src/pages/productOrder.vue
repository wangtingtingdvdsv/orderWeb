<template>
  <div class="basetable" v-loading="loading" element-loading-text="拼命加载中">
    <div class="selectMenu">
    <el-input
      class="search"
      placeholder="请输入姓名进行搜索"
      v-model="input10"
      clearable>
    </el-input>
      <el-button type="primary" @click="search">搜索</el-button>
      <el-button type="primary" @click="add" class="add">新增</el-button>
  <el-dialog title="" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类目" :label-width="formLabelWidth">
            <el-select v-model="form.category" placeholder="请选择所属类目">
              <el-option label="男生最爱" value="男生最爱"></el-option>
              <el-option label="最热" value="最热"></el-option>
              <el-option label="女生最爱" value="女生最爱"></el-option>
              <el-option label="难吃的菜" value="难吃的菜"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input v-model="form.price" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="卖家电话" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input v-model="form.description" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="图片url地址" :label-width="formLabelWidth">
            <el-input v-model="form.picUrl" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="tableMain">
         <el-table height="100%" border style="width: 100%"
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
         >
            <el-table-column prop="orderId" label="订单id">
            </el-table-column>
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="phone" label="手机号">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
            <el-table-column prop="amount" label="金额">
            </el-table-column>
            <el-table-column prop="orderStatus" label="订单状态">
            </el-table-column>
            <el-table-column prop="paymentStatus" label="支付状态">
            </el-table-column>
            <el-table-column prop="deliveryTime" label="配送时间">
            </el-table-column>
            <el-table-column prop="creationTime" label="创建时间">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(slot-scope.$index, slot-scope.row)">接单
                    </el-button>
                    <el-button size="small" type="danger" @click="handleDelete(slot-scope.$index, slot-scope.row)">取消
                    </el-button>
                </template>
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
      input10: '',
      dialogFormVisible:false,
      form: {
          name: '',
          category: '',
          price:'',
          phone:'',
          description:'',
          picUrl:''

        },
        formLabelWidth: '120px',
      orderInfo: [{
          orderId:'2321989312',
          name:'王婷',
          phone:'12310959261',
          address:'陕西省西安市长安区滦镇高桥泉子头村',
          amount:'45.45',
          orderStatus:'已接单',
          paymentStatus:'支付成功',
          deliveryTime:'2018-9-19 22:00:12',
          creationTime:'2018-9-19 21:25:45'
      },{
          orderId:'1321989312',
          name:'王婷婷',
          phone:'12310959261',
          address:'陕西省西安市长安区滦镇高桥泉子头村',
          amount:'45.45',
          orderStatus:'已接单',
          paymentStatus:'支付成功',
          deliveryTime:'2018-9-19 22:00:12',
          creationTime:'2018-9-19 21:25:45'
      },
      {
          orderId:'1221989312',
          name:'王婷婷',
          phone:'12310959261',
          address:'陕西省西安市长安区滦镇高桥泉子头村',
          amount:'45.45',
          orderStatus:'已接单',
          paymentStatus:'支付成功',
          deliveryTime:'2018-9-19 22:00:12',
          creationTime:'2018-9-19 21:25:45'
      },
      {
          orderId:'1231989312',
          name:'王婷婷',
          phone:'12310959261',
          address:'陕西省西安市长安区滦镇高桥泉子头村',
          amount:'45.45',
          orderStatus:'已接单',
          paymentStatus:'支付成功',
          deliveryTime:'2018-9-19 22:00:12',
          creationTime:'2018-9-19 21:25:45'
      },
      {
          orderId:'```312',
          name:'王婷婷',
          phone:'12310959261',
          address:'陕西省西安市长安区滦镇高桥泉子头村',
          amount:'45.45',
          orderStatus:'已接单',
          paymentStatus:'支付成功',
          deliveryTime:'2018-9-19 22:00:12',
          creationTime:'2018-9-19 21:25:45'
      },
      {
          orderId:'&12321989312',
          name:'王婷婷',
          phone:'12310959261',
          address:'陕西省西安市长安区滦镇高桥泉子头村',
          amount:'45.45',
          orderStatus:'已接单',
          paymentStatus:'支付成功',
          deliveryTime:'2018-9-19 22:00:12',
          creationTime:'2018-9-19 21:25:45'
      },
       {
          orderId:'*12321989312',
          name:'王婷婷',
          phone:'12310959261',
          address:'陕西省西安市长安区滦镇高桥泉子头村',
          amount:'45.45',
          orderStatus:'已接单',
          paymentStatus:'支付成功',
          deliveryTime:'2018-9-19 22:00:12',
          creationTime:'2018-9-19 21:25:45'
      },
       {
          orderId:'(12321989312',
          name:'王婷婷',
          phone:'12310959261',
          address:'陕西省西安市长安区滦镇高桥泉子头村',
          amount:'45.45',
          orderStatus:'已接单',
          paymentStatus:'支付成功',
          deliveryTime:'2018-9-19 22:00:12',
          creationTime:'2018-9-19 21:25:45'
      },
       {
          orderId:')12321989312',
          name:'王婷婷',
          phone:'12310959261',
          address:'陕西省西安市长安区滦镇高桥泉子头村',
          amount:'45.45',
          orderStatus:'已接单',
          paymentStatus:'支付成功',
          deliveryTime:'2018-9-19 22:00:12',
          creationTime:'2018-9-19 21:25:45'
      },
       {
          orderId:'$12321989312',
          name:'王婷婷',
          phone:'12310959261',
          address:'陕西省西安市长安区滦镇高桥泉子头村',
          amount:'45.45',
          orderStatus:'已接单',
          paymentStatus:'支付成功',
          deliveryTime:'2018-9-19 22:00:12',
          creationTime:'2018-9-19 21:25:45'
      },
       {
          orderId:'^12321989312',
          name:'王婷婷',
          phone:'12310959261',
          address:'陕西省西安市长安区滦镇高桥泉子头村',
          amount:'45.45',
          orderStatus:'已接单',
          paymentStatus:'支付成功',
          deliveryTime:'2018-9-19 22:00:12',
          creationTime:'2018-9-19 21:25:45'
      }],
      tableData: '',
      value6: '',
      currentPage: 1,
      currentIndex: '',
      pageSize:4,
      total:1000,
    }
  },
  mounted() {

  },
  created() {
    setTimeout(() => {
      this.loading = false
    }, 1500)
    this.tableData = this.orderInfo;
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
    add() {
            this.dialogFormVisible = true
    },
    search() {
      var search = this.orderInfo.filter(order => {
          if(order.name == this.input10.trim()) {
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
.add{
  float: right;
  margin-right: 40px;
}
</style>
