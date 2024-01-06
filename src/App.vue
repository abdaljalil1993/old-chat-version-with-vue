
<template>
<div class="mainapp">
  <!-- you can do tag works on all pages -->
  <Global/>
</div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
  
<script>
import Global from './views/Global.vue'

export default {

  components:{
    Global
  }/* end of component */
}
</script>
