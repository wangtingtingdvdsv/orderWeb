<template>
  <div class="leftMenu">
    <el-menu :default-active="onRoutes" theme="dark" class="el-menu-vertical-demo" @open="handleOpen"
             @close="handleClose" router>
      <el-menu-item index="/home/productOrder"><i class="el-icon-view"></i>商品订单</el-menu-item>
      <el-menu-item index="/home/productList"><i class="el-icon-tickets"></i>商品列表</el-menu-item>
      <el-menu-item index="/home/productReview"><i class="el-icon-date"></i>商品评价</el-menu-item>
      <el-menu-item index="/home/productCategory"><i class="el-icon-plus"></i>类目列表</el-menu-item>
    </el-menu>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      }
    }
  }
</script>
<style lang="scss">
  .leftMenu {
    display: block;
    position: fixed;
    bottom: 0;
    top: 60px;
    width: 190px;
    left: 0;
    z-index: 999;
    ul {
      height: 100%;
      border-radius: 0;
    }
  }
</style>
