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
              <el-option label="男生最爱"></el-option>
              <el-option label="最热"></el-option>
              <el-option label="女生最爱"></el-option>
              <el-option label="难吃的菜"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input v-model="form.price" autocomplete="off"></el-input>
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
         <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" height="100%" border style="width: 100%">
            <el-table-column prop="categoryId" label="类目id">
            </el-table-column>
            <el-table-column prop="productName" label="商品名称">
            </el-table-column>
            <el-table-column prop="categoryNumber" label="类目编号">
            </el-table-column>
            <el-table-column prop="creationTime" label="创建时间">
            </el-table-column>
            <el-table-column prop="changeTime" label="修改时间">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="small" type="danger" @click="handleDelete(slot-scope.$index, slot-scope.row)">操作
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

export default {
  data() {
    return {
      loading: true,
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
      categoryInfo: [{
          categoryId:'3',
          productName:'鸡捞面',
          categoryNumber:'5',
          creationTime:'2018-7-30 15:08:44',
          changeTime:'2018-7-30 15:08:44'
      },
      {
          categoryId:'3',
          productName:'鸡捞面',
          categoryNumber:'5',
          creationTime:'2018-7-30 15:08:44',
          changeTime:'2018-7-30 15:08:44'
      },
      {
          categoryId:'3',
          productName:'鸡捞面',
          categoryNumber:'5',
          creationTime:'2018-7-30 15:08:44',
          changeTime:'2018-7-30 15:08:44'
      },
      {
          categoryId:'3',
          productName:'鸡捞面',
          categoryNumber:'5',
          creationTime:'2018-7-30 15:08:44',
          changeTime:'2018-7-30 15:08:44'
      },
      {
          categoryId:'3',
          productName:'鸡捞面',
          categoryNumber:'5',
          creationTime:'2018-7-30 15:08:44',
          changeTime:'2018-7-30 15:08:44'
      },
      {
          categoryId:'3',
          productName:'鸡捞面',
          categoryNumber:'5',
          creationTime:'2018-7-30 15:08:44',
          changeTime:'2018-7-30 15:08:44'
      },
      {
          categoryId:'3',
          productName:'鸡捞',
          categoryNumber:'5',
          creationTime:'2018-7-30 15:08:44',
          changeTime:'2018-7-30 15:08:44'
      },
     ],
     
      currentPage: 1,
      currentIndex: '',
      pageSize:4,
      total:1000,
      input10:"",
      tableData: ''
    }
  },
  created() {
    
    setTimeout(() => {
      this.loading = false
    }, 1500)
    this.tableData = this.categoryInfo;
    
  },
  methods: {
    add(){
      this.dialogFormVisible = true
    },
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
      var search = this.categoryInfo.filter(order => {
          if(order.productName == this.input10.trim()) {
            return order;
          }
      })
        this.tableData = search;
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
