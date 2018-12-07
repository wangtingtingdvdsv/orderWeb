<template>
  <div class="basetable" element-loading-text="拼命加载中">
    <div class="selectMenu">
    <el-input
    class="search"
      placeholder="请输入商品名称进行搜索"
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
          <el-form-item label="图片地址" :label-width="formLabelWidth">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                accept="image/jpeg,image/gif,image/png"
             
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>

    </div>
    <div class="tableMain">
         <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" height="600px" border style="width: 100%">
            <el-table-column prop="product_id" label="商品id">
            </el-table-column>
            <el-table-column prop="product_name" label="商品名称">
            </el-table-column>
            <el-table-column prop="product_icon" label="商品图片">
                <template scope="scope">
                     <img :src="scope.row.product_icon" width="80" height="80" />
                </template>
            </el-table-column>
            <el-table-column prop="product_price" label="商品单价">
            </el-table-column>
            <el-table-column prop="product_description" label="商品描述">
            </el-table-column>
            <el-table-column prop="seller_phone" label="卖家电话">
            </el-table-column>
            <el-table-column prop="category_type" label="商品类目">
            </el-table-column>
            <el-table-column prop="product_sales" label="总销量">
            </el-table-column>
            <el-table-column prop="update_time" label="创建时间">
            </el-table-column>
            <!-- <el-table-column label="操作" width="170">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改
                    </el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">下架
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

export default {
  data() {
    return {
      dialogFormVisible:false,
      imageUrl: '',
      input10:"",
      tableData:[],
      listInfo: [],
      formLabelWidth: '120px',
      form: {},
      currentPage: 1,
      currentIndex: '',
      pageSize:5,
      page:1,
      total:1000
    }
  },
  mounted() {
    this.getOrderList()
    this.tableData = this.listInfo;
  },
  methods: {
      getOrderList() {
        var that = this;
        axios.get('http://localhost:3004/seller/product/list')
        .then(res => {
          let data = res.data.data;
          for(let i = 0; i < data.length; i++) {
            that.listInfo[i]={};
            that.listInfo[i] = data[i]
          }
          console.log(this.listInfo);
          that.page++;   
        }).catch(err => {console.log(err)})
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      
      },
      beforeAvatarUpload(file) {

        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return  isLt2M;
      }, 
    add() {
            this.dialogFormVisible = true
    },

    search() {
      var search = this.listInfo.filter(order => {
          if(order.product_name == this.input10.trim()) {
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
    handleSizeChange() {
      this.pagesize = this.pageSize;
    },
    handleCurrentChange:function(currentPage){
        this.currentPage = currentPage;
    }
  },
}
</script>
<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
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
