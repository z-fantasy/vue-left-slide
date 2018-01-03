<template>
  <div id="app">
    <left-slide :handleGray="'edit'">
      <p>向左滑动试1</p>
    </left-slide>
    <left-slide :handleRed="'delete'">
      <p>向左滑动试2</p>
    </left-slide>
    <left-slide :handleGray="'edit'" :handleRed="'delete'">
      <p>向左滑动试3</p>
    </left-slide>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js left slide component'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
