<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <demo-1></demo-1> -->
    <TreeDemo></TreeDemo>
    <TreeDemo2></TreeDemo2>
    <Demo3></Demo3>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Demo1 from './components/demo1.vue'
import TreeDemo from './components/TreeDemo.vue'
import TreeDemo2 from './components/TreeDemo2.vue'
import Demo3 from './components/Demo3.vue'

export default {
  name: 'App',
  components: {
    // Demo1, 
    TreeDemo,
    TreeDemo2,
    Demo3
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
