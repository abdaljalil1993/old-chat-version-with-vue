<template>
  <div class="complateSignUp">
    <div class="container">
      <form action="" method="post">
        <div class="image">
          <label for="image">
            <img id="blah" src="../assets/uploads/image/default.svg" alt="" />
          </label>
          <input type="file" name="image" id="image" />
        </div>
        <div class="custom-select">
          <select name="yourNumber">
            <option value="undefained" selected>Select serial number :</option>
            <option
              v-for="(num, index) in serialNumber[0]"
              :key="index"
              :value="index + 1"
            >
              {{ num }}
            </option>
          </select>
        </div>
        <!-- /custom-select -->
        <div class="names">
          <input
            type="text"
            required
            name="f-name"
            v-model="f_name"
            placeholder="First Name"
            id=""
          />
          <input
            type="text"
            required
            name="l-namw"
            v-model="l_name"
            placeholder="Lasting Name"
            id=""
          />
          <input
            type="email"
            required
            name="email"
            v-model="email"
            placeholder="Your Email"
            id=""
          />
        </div>
      </form>
      <button
        type="submit"
        class="btn btn-success complate"
        @click.prevent="compliteSignUp"
      >
        Complate
      </button>
      <!-- /form -->
    </div>
    <!-- /container -->
    <div v-text="getSerailNumber" style="display: none"></div>
  </div>
  <!-- /complateSignUp -->
</template>

<script>
export default {
  data() {
    return {
      serialNumber: [],
      yourNember: "",
      f_name: "",
      l_name: "",
      email: "",
      fileImg: "",
      payload: {},
    }; //end return
  }, //end of data
  mounted() {
    this.readURL();
    this.validSerialNumber();
  } /* end of mounted */,
  created() {} /* /created */,
  computed: {
    getSerailNumber() {
      return this.$store.state.serialNumber;
    } /* /getSerialNumber */,
  } /* /computed */,
  watch: {
    getSerailNumber(x) {
      this.serialNumber.push(x);
    } /* /getSerialNumber */,
  } /* /watch */,
  methods: {
    readURL() {
      var img_inpt = document.getElementById("image");
      img_inpt.addEventListener("change", (e) => {
        this.fileImg = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          var blah = document.getElementById("blah");
          const uploaded_img = reader.result;
          blah.src = uploaded_img;
        }); /* end of reader listener */
        reader.readAsDataURL(img_inpt.files[0]);
      }); /* /end eventListener */
    } /* end of readUrl function */,
    validSerialNumber() {
      var valSerlNum = document.querySelector("select[name=yourNumber]");
      valSerlNum.addEventListener("change", () => {
        var custmSelect = document.getElementsByClassName("custom-select")[0];
        if (valSerlNum.value == "undefained") {
          custmSelect.style.border = "2px solid #e01d1d";
          this.yourNember = "";
        } else {
          this.yourNember = this.serialNumber[0][valSerlNum.value - 1];
          custmSelect.style.border = "2px solid #f1eeee";
        } /* /end of if */
      }); /* end of eventListener */
    } /* /validSerialNumber */,
    compliteSignUp() {
      if (
        this.f_name &&
        this.l_name &&
        this.email &&
        this.yourNember &&
        this.$store.state.user_id
      ) {
        this.payload = {
          f_name: this.f_name,
          l_name: this.l_name,
          email: this.email,
          sn: this.yourNember,
          id: this.$store.state.user_id,
          img: this.fileImg,
        }; /* /end of payload object */
        this.$store.dispatch("complateSingup", this.payload);
        this.$router.push("/set-password");
        this.payload = {};
      } else {
        console.log(
          this.f_name,
          this.l_name,
          this.email,
          this.yourNember,
          this.$store.state.user_id,
          this.fileImg
        );
        console.log("some thing is wrong");
      } /* /end of if */
    },
  } /* end of methods */,
}; /* /export defualt */
</script>

<style lang="scss" scoped>
.custom-select {
  background: none;
  margin-bottom: 10px;
  border: 1px solid #f1eeee;
  width: 200px;
}
</style>