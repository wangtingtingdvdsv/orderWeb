<template>
  <div class="back">
    <!-- <el-button-group>
      <router-link to="/enter/register">注册</router-link>
      <router-link to="/enter/login">登录</router-link>
      <!-- <el-button type="primary">登录</el-button>
      <el-button type="primary">注册<i class="el-icon--right"></i></el-button> 
    </el-button-group>
     <router-view></router-view> -->
    <v-login @changeShow="changeShow" v-show="!show"></v-login>
    <v-register @changeShow="changeShow" v-show="show"></v-register>      
  </div>
</template>

<script>
import login from '../components/login.vue'
import register from '../components/register.vue'
  export default {
    data () {
      return {
          show: true
      }
    },
    components: {
      'v-login': login,
      'v-register': register
    },
    methods: {
      changeShow() {
        this.show = !this.show;
      } 
    }

  }
</script>
<style lang="scss" scoped>
.back{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;right: 0;
  background-size: cover;
  background: url(http://oqjgod7s1.bkt.clouddn.com/bg-min.jpg);
}

</style>
