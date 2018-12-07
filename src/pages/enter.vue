<template>
  <div class="back">
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
          show: true,
          test:[]
      }
    },
    components: {
      'v-login': login,
      'v-register': register
    },
    mounted:function() {

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
 // background: url(http://oqjgod7s1.bkt.clouddn.com/bg-min.jpg);
}

</style>
