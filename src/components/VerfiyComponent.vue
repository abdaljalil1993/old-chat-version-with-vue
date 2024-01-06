<template>
  <div class="signup">
    <div class="container">
      <h2>SignUp <span class="memo-signup">Memo</span></h2>
      <div class="paly-display-form">
        <div class="disabled"></div>
        <form class="row" action="/action_page.php" method="post">
          <div class="inputNumber">
            <div class="selector">
              <select name="phoneId">
                <option value="+964" selected>+964</option>
                <option value="+000">+000</option>
              </select>
            </div>
            <input
              type="number"
              class="col-md-8"
              v-model="phone"
              placeholder="phone number"
            />
            <span v-text="checkPhoneNumber"></span>
          </div>
          <!-- /inputNumber -->
          <div class="button-recapcha">
            <div id="recaptcha-container"></div>

            <button
              type="submit"
              :disabled="!isValid"
              class="row btn btn-sm sendCode"
              @click.prevent="sendCode"
            >
              code
            </button>
          </div>
          <!-- /button-recapcha -->
        </form>
        <!-- /form -->
       <router-link to="/login">login</router-link>
      </div>
      <!-- /paly-display-form -->
    </div>
    <!-- /container -->
    <div class="container verifyCode">
      <form class="row" action="/action_page.php" method="post">
        <div class="inputEmphasis">
          <input
            type="number"
            class="col-md-8"
            v-model="emphasis"
            placeholder="6 digits"
          />
          <span v-text="checkEmphasis"></span>

          <div
            style="
              width: 25px;
              height: 38px;
              margin-right: 8px;
              cursor: default;
            "
            class="btn loader checkloader"
            type="submit"
          ></div>
        </div>
        <!-- /inputNumber -->
      </form>
      <!-- /form -->
    </div>
    <!-- /container -->
  </div>
  <!-- /login -->
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { createStore } from "vuex";
const store = createStore();

export default {
  data() {
    return {
      phone: "",
      emphasis: "",
      el: null,
      phoneId: "iraq",
      responRecaptcha: "",
      payload: {},
    }; /* end of retern */
  } /* end of data */,

  created() {} /* end of created */,
  mounted() {
    this.ccaptchaVerifier();
  },
  computed: {
    checkPhoneNumber() {
      if (String(this.phone).length != 10 && String(this.phone).length > 0) {
        return (
          "the phone number must be 11 digits ," + String(this.phone).length
        );
      } else {
        return "";
      } /* end of check phone length */
    } /* /checkPhoneNumber */,

    isValid() {
      if (!(String(this.phone).length != 10) && store.state.responRecaptcha) {
        store.state.responRecaptcha = "";
        return true;
      }
      return false;
    } /* end of isValid */,

    checkEmphasis() {
      if (
        String(this.emphasis).length != 6 &&
        String(this.emphasis).length > 0
      ) {
        return "verify code must be 6 digit , " + String(this.emphasis).length;
      } /* end of if */
      store.state.emphasisLen = String(this.emphasis).length;
      return "";
    } /* checkEmphasis */,

    isValidEmphasis() {
      if (!(String(this.emphasis).length != 6)) {
        return true;
      } else {
        return false;
      } /* end of if */
    } /* end of isValidEmphasis*/,
  }, //end of computed
  watch: {
    isValidEmphasis(x) {
      var loader = document.getElementsByClassName("checkloader")[0];
      if (x == true) {
        loader.classList.remove("loader");
      } else {
        loader.classList.add("loader");
      } /* end of if */
    } /* / isValidEmmphasis */,
    checkEmphasis() {
      if (store.state.emphasisLen == 6) {
        setTimeout(() => {
          const confirmationResult = store.state.confirmationResult;
          confirmationResult
            .confirm(String(this.emphasis))
            .then(async (resulte) => {
              this.payload.phone = resulte.user.phoneNumber;
              this.$store.dispatch("signup", this.payload);
              this.payload = {};
              this.emphasis = "";
              this.$router.push("/personal-information");
            })
            .catch((err) => {
              console.log(err);
            });
        }, 2000);
      } /* end of if */
    } /* /checkEmphasis */,
  } /* end of watch */,
  methods: {
    sendCode() {
      //here iwill take number and send verfiy code to same number
      var phoneId = document.querySelector("select[name=phoneId]").value;
      const phonNumper = phoneId + this.phone;
      const appVerifier = window.recaptchaVerifier;
      firebase
        .auth()
        .signInWithPhoneNumber(phonNumper, appVerifier)
        .then(async (confirmationResult) => {
          store.state.confirmationResult = confirmationResult;
          document.getElementsByClassName("disabled")[0].style.display="block"
        }) /* end of confirmationResult */
        .catch((error) => {
          console.log(error); /* end of err function */
        });
      let verifyCode = document.getElementsByClassName("verifyCode")[0];
      verifyCode.classList.add("showVerifyCode");
    } /* /sendCode */,
    ccaptchaVerifier() {
      console.log("captchaVerifier ...");
      const recapcha = document.getElementById("recaptcha-container");
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(recapcha, {
        callback: async function (response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          if (response) {
            store.state.responRecaptcha = await response;
          } /* end of if respone  */
        },
        "expired-callback": function () {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      }); /* end of firebase recapcha */
      window.recaptchaVerifier.render();
    } /* end of captchaVerifier */,
  } /* end of methods */,
}; /* end of export default */
</script>