<template>
  <div>
   <el-button @click="openDialog">确认</el-button>
   <Demo2 ref="child"></Demo2>
  </div>
</template>

<script>
import Demo2 from './demo2.vue'
export default {
  name:"demo1",
  components: {
    Demo2,
  },
  data (){
    return {
      inputValue: ''
    };
  },
  methods:{
    openDialog() {
      this.$refs.child.openDialog1();
    }
  }
}
</script>

<style>

</style>