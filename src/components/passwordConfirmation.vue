<template>
  <div class="password">
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
        <div class="custom-select">
          <select name="yourNumber">
            <option value="default" v-text="sn" selected></option>
          </select>
        </div>
        <!-- /custom-select -->
        <div class="names">
          <div class="password">
            <input
              type="password"
              required
              name="password"
              v-model="password"
              placeholder="pasword"
              id=""
            />
            <span v-text="validPassword"></span>
          </div>
          <div class="confirmationPassword">
            <input
              type="password"
              required
              name="password_confirmation"
              v-model="confirmation_password"
              placeholder="confirmation password"
              id=""
            />
            <span v-text="validConfirmationPassword"></span>
          </div>
        </div>
      </form>
      <button
        type="submit"
        class="btn btn-success complate"
        :disabled="!validPasswords"
        @click.prevent="confirmationPassword"
      >
        Let's got
      </button>
      <!-- /form -->
      <div v-text="setImgeAndSerialNemder" style="display: none"></div>
    </div>
    <!-- /container -->
  </div>
</template>

<script>
import * as cookie from "vue-cookies"
export default {
  data() {
    return {
      password: "",
      confirmation_password: "",
      sn: "",
    }; /* end of returen */
  } /* end of data */,
  mounted() {} /* end of mounted */,
  methods: {
    confirmationPassword() {
      var payload = {
        password: this.password,
        profile: this.$store.getters.myProfile,
      }; /* end of payload */
      this.$store.dispatch("sendprofilePassword", payload);
      payload = {};

      cookie.set("user",this.$store.getters.myProfile,"90d")
      console.log("user :",cookie.get("user"))
      this.$router.push("/home");
    } /* /confirmationPassword */,
  } /* end of methods */,
  computed: {
    validPassword() {
      if (this.password.length > 0 && this.password.length < 8) {
        return "the password must be 8 digits or more , " + this.password.length;
      } else {
        return "";
      } /* /end of if */
    } /* end of validPassword */,
    validConfirmationPassword() {
      if (
        this.confirmation_password.length > 0 &&
        this.password.length >= 8 &&
        this.password != this.confirmation_password
      ) {
        return "the passwords dose not match";
      } else {
        return "";
      } /* end of if */
    } /* /validConfirmationPassword */,
    validPasswords() {
      if (
        this.password.length >= 8 &&
        !(this.password != this.confirmation_password)
      ) {
        return true;
      } else {
        return false;
      } /* end of if */
    } /* /validPasswords */,
    setImgeAndSerialNemder() {
      return this.$store.getters.myProfile;
    } /* /setImgeAndSerialNemder */,
  } /* end of computed */,
  watch: {
    setImgeAndSerialNemder(x) {
      if (x.profile_image) {
        document.getElementById("blah").src =
          this.$store.state.imgPath + x.profile_image;
      } /* end of if */
      this.sn = x.sn;
    } /* /setImgeAndSerialNemder */,
  } /* end of watch */,
}; /* end of export default */
</script>

<style lang="scss" scoped >
.custom-select {
  width: 190px;
  background: none;
} /* /custom-select */
</style>