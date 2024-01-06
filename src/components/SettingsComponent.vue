<template>
  <div class="setting">
    <nav class="navSetting">
      <button @click="closeListSetting"><fa icon="times"></fa></button>
    </nav>
    <!-- /nav -->
    <div class="listSetting">
      <ul>
        <li><router-link to="">list1</router-link></li>
        <li><router-link to="">list2</router-link></li>
        <li><router-link to="">list3</router-link></li>
        <li><router-link to="">list4</router-link></li>
        <li><router-link to="">list5</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    closeListSetting() {
      this.$emit("closeListSetting", true);
    } /* /closeListSetting */,
  } /* /methods */,
}; /* /export default */
</script>

<style lang="scss" scoped>
</style>