<template>
  <div class="contactOptions">
    <div class="navContact">
      <button  @click="closeList"><fa icon="times"></fa></button>
    </div>
    <!-- /navContaxt -->
    <div class="lostOptionContact">
      <ul>
        <li><router-link to="">list</router-link></li>
        <li><router-link to="">list</router-link></li>
        <li><router-link to="">list</router-link></li>
        <li>{{data}}</li>
      </ul>
    </div>
    <!-- /lostOptionContact -->
  </div>
  <!-- /contactOptions -->
</template>

<script>
export default {
  props: ["data"],
  methods:{
      closeList(){
          this.$emit("closeContactsOptionsM",null,true)
      }/* /closeList */
  }/* /methods */
};
</script>

<style lang="scss" scoped>
</style>