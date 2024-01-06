<template>
  <div class="login">
    <div class="container">
      <form action="" method="post">
        <div class="image">
          <label for="image">
            <img
              style="cursor: default"
              id="blah"
              src="../assets/uploads/image/default.svg"
              alt=""
            />
          </label>
        </div>
        <div class="custom-select" v-text="sn"></div>
        <!-- /custom-select -->
        <div class="names">
          <div class="identfiy">
            <input
              type="text"
              required
              name="identfiy"
              v-model="identfiy"
              placeholder="Email or phone number"
              id=""
            />
            <span v-if="identfiyFiled" v-text="identfiyFiled"></span>
            <span v-else-if="errMsg && errMsg=='phone dose not match'" v-text="errMsg+' try agine'" ></span>
          </div>
          <div class="password">
            <input
              type="password"
              required
              name="password"
              v-model="password"
              placeholder="password"
              id=""
            />
            <span v-if="validPassword" v-text="validPassword" ></span>
            <span v-else-if="errMsg && errMsg=='password dose not match'" v-text="errMsg+' try agine'" ></span>
          </div>
        </div>
      </form>
      <button
        type="submit"
        class="btn btn-success complate"
        @click.prevent="login"
        :disabled="!isValidLogun"
      >
        login <fa icon="sign-in-alt" />
      </button>
      <!-- /form -->
    </div>
    <!-- /container -->
  </div>
</template>

<script>
import * as cookie from "vue-cookies";
export default {
  data() {
    return {
      user: cookie.get("user"),
      imgPath: this.$store.state.imgPath,
      sn: "",
      password: "",
      identfiy: "",
      payload: null,
    }; /* end of return */
  } /* /end of data */,
  mounted() {
    this.getUserInfo();
  } /* /mounted */,
  methods: {
    getUserInfo() {
      if (this.user) {
        if (this.user.profile_image) {
          document.getElementById("blah").src =
            this.imgPath + this.user.profile_image;
        } /* end of if */
        this.sn = this.user.sn;
      } /* end of if */
    } /* /getUserInfo */,
    login() {
      if (
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          this.identfiy
        )
      ) {
        this.payload = {
          type: "email",
          identify: this.identfiy,
          password: this.password,
        }; /* end of payload */
      } else if (!isNaN(this.identfiy)) {
        this.payload = {
          type: "phone",
          identify: this.identfiy,
          password: this.password,
        }; /* end of payload */
      } /* end of if */
      if (this.payload) {
        this.$store.state.myProfile = null;
        this.$store.dispatch("login", this.payload);
      } else {
        console.log("payload is null :", this.payload);
      } /* end of if */
    } /* /login */,
  } /* end of methods */,
  computed: {
    identfiyFiled() {
      console.log(isNaN(this.identfiy));
      if (
        this.identfiy.length > 0 &&
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          this.identfiy
        ) ^
          (isNaN(this.identfiy) == false)
      ) {
        return "must be email or phone number";
      } else {
        return "";
      } /* end of if */
    } /* /vlaidateIdentfy */,
    validPassword() {
      if (this.password.length > 0 && this.password.length < 8) {
        return (
          "the password must be 8 digits or more , " + this.password.length
        );
      } else {
        return "";
      } /* /end of if */
    } /* end of validPassword */,
    isValidLogun() {
      if (
        !(this.password.length < 8) &&
        this.identfiy.length > 0 &&
        (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          this.identfiy
        ) ||
          isNaN(this.identfiy) == false)
      ) {
        return true;
      } else {
        return false;
      } /* end of if */
    } /* /isValidLogun */,
    userLogined() {
      return this.$store.getters.myProfile;
    } /* end of userLogined */,
    errMsg() {
      if (this.$store.getters.errMsg) {
         return this.$store.getters.errMsg.error;
      } /* end of if */
      return "";
    } /* end of errMsg */,
  } /* /compted */,
  watch: {
    userLogined(x) {
      if (x) {
        cookie.remove("users");
        cookie.set("users", x);
      } /* end of if  */
    } /* end of userLogined */,
  } /* end of watch */,
};
</script>

<style lang="scss" scoped>
.custom-select {
  width: 190px;
  background: none;
  margin: 2px 0px 15px 0px;
} /* /custom-select */
</style>