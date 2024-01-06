<template>
  <div class="home">
    <div class="container">
      <div class="navbar">
        <div class="logo"><router-link to="/home">MEMO</router-link></div>
        <div class="darkMod">
          <input type="checkbox" name="switch" id="switch" />
          <label for="switch" id="labForSwitch"></label>
        </div>
        <!-- /logo -->
      </div>
      <!-- /navbar -->
      <div class="sidebar">
        <div class="leftSideBar">
          <div class="mynav">
            <div class="imgProfile">
              <router-link to="">
                <img
                  src="../assets/uploads/image/default.svg"
                  id="myImg"
                  alt=""
                />
              </router-link>
            </div>
            <div class="listOptionProfile">
              <ul>
                <li><fa icon="circle-notch"></fa></li>
                <li><fa icon="plus"></fa></li>
                <li>
                  <button id="settingButton">
                    <fa icon="ellipsis-h" @click.prevent="seetingProfile()" />
                  </button>
                </li>
              </ul>
            </div>
            <!-- /listOptionProfile -->
          </div>
          <!-- /mynav -->
          <div class="serachBar">
            <div class="icon">
              <fa icon="search" />
            </div>
            <input type="text" placeholder="search ..." />
          </div>
          <!-- /serachBar -->
          <div class="wepperContactList">
            <div class="contactList">
              <div class="wepper-card" v-if="reciveMyChat">
                <div
                  class="carad"
                  v-for="(item, index) in reciveMyChat"
                  :key="index"
                >
                  <router-link
                    @click.prevent="
                      getMessageByUser(item.reciver_id, item.sender_id)
                    "
                    to=""
                  >
                    <div class="imgContactProfile">
                      <div v-if="item.image">
                        <img src="item.image" alt="" />
                      </div>
                      <div v-else>
                        <img src="../assets/uploads/image/default.svg" alt="" />
                      </div>
                    </div>
                    <div class="user-lastMsg">
                      <div class="user">عمار هادي</div>
                      <div class="lastMessage">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Recusandae, consequatur!
                      </div>
                    </div>
                    <!-- /user-lastMsg -->
                  </router-link>
                  <div class="dateAndOptions">
                    <span>{{ item.created_at }}</span>
                    <div class="aroow">
                      <button
                        class="focusBtn"
                        data-check="0"
                        @click="contactsOptionsM(index)"
                        data-rotate-arow="180"
                      >
                        <fa icon="chevron-down" style="font-size: 13px" />
                      </button>
                    </div>
                    <!-- /aroow -->
                  </div>
                  <!-- /dateAndOptions -->
                </div>
                <!-- /carad -->
              </div>
              <!-- /wepper-card -->
            </div>
          </div>
          <!-- /wepperContactList -->
        </div>
        <!-- /leftSideBar -->
        <div class="rightSidebar">
          <div class="memologo">
            <img src="../assets/uploads/image/memo.png" alt="" />
          </div>

          <!-- /contactsOptionsMenu -->

          <!-- /settingYourProfile -->
          <div class="chatRoom" style="z-index: -1">
            <ChatComponent :msgs="messagesByUsers"></ChatComponent>
            <div class="contactsOptionsMenu" v-if="contactsOptionsMenu">
              <ContactOptionMenu
                :data="dataForContactProfile"
                @closeContactsOptionsM="contactsOptionsM"
              />
            </div>
            <div class="settingYourProfile" v-if="settingYourProfile">
              <SettingsComponent
                @closeListSetting="closeListSetting"
                data="hellow this data from home component"
              />
            </div>
          </div>
        </div>
        <!-- /rightSidebar -->
      </div>
      <!-- /sidebar -->
    </div>
  </div>
  <!-- /home -->
</template>

<script>
import ChatComponent from "./ChatComponent.vue";
import ContactOptionMenu from "./ContactOptionMenu.vue";
import SettingsComponent from "./SettingsComponent.vue";
import * as cookie from "vue-cookies";
import moment from "moment";

export default {
  data() {
    return {
      contactsOptionsMenu: false,
      dataForContactProfile: {},
      settingYourProfile: false,
      messagesByUsers: null,
    }; /* end of return */
  } /* end of data */,

  components: {
    ChatComponent,
    ContactOptionMenu,
    SettingsComponent,
  } /* end of components */,

  mounted: function () {
    this.darkMode();
    this.checkMode();
    this.myChat();
    this.myProfile();
  } /* end of mounted */,
  computed: {
    reciveMyChat() {
      console.log("My Chat :", this.$store.getters.myChat);
      if (this.$store.getters.myChat) {
        this.$store.getters.myChat.forEach((item) => {
          var start = moment(item.created_at);
          var end = moment(new Date());
          item.created_at = end.from(start, true);
          if (item.image) {
            item.image = this.$store.state.imgProfilePath + item.image;
          } /* end of if */
        }); /* end of for each */

        return this.$store.getters.myChat;
      } else {
        return null;
      } /* end of if */
    } /* end of reciveMyChat */,

    getMessageByUsers() {
      if (this.$store.getters.getMessageByUser) {
        console.log(this.$store.getters.getMessageByUser)
        return this.$store.getters.getMessageByUser;
      } else {
        return null;
      } /* end of if */
    } /* /getMessageById */,

  } /* /computed */,
  watch: {
    getMessageByUsers(x) {
      const memologo = document.getElementsByClassName("memologo")[0];
      memologo.style.display = "none";
      const chatRoom = document.getElementsByClassName("chatRoom")[0];
      chatRoom.style.zIndex = "3";
      this.messagesByUsers = x;
    } /* /getMessageByUser */,
  } /* /watch */,
  methods: {
    darkMode() {
      var swtch = document.getElementById("switch");
      swtch.addEventListener("change", function () {
        const root = document.documentElement;
        if (cookie.get("mode") == "light") {
          cookie.set("mode", "light", "360d");
          swtch.setAttribute("checked", "checked");
          root.style.setProperty("--bg", "#4d4962");
          root.style.setProperty("--bgbar", "#3f3c52");
          root.style.setProperty("--bgSearch", "#4c4e68");
          root.style.setProperty("--bgw", "#3a3b44");
          root.style.setProperty("--fntClr", "rgb(197 193 193)");
          root.style.setProperty("--cShadow", "#1c1b1b");
          root.style.setProperty("--cMsg", "#3cab44");
          root.style.setProperty("--brdList", "#464646");
          cookie.set("mode", "dark");
          console.log(cookie.get("mode"));
        } else {
          swtch.removeAttribute("checked");
          root.style.setProperty("--bgw", "#fff");
          root.style.setProperty("--bg", "#f4f1f1");
          root.style.setProperty("--bgbar", "#e8e6e6");
          root.style.setProperty("--bgSearch", "#faf6f6");
          root.style.setProperty("--fntClr", "rgb(48, 48, 48)");
          root.style.setProperty("--cShadow", "#a9a1a1");
          root.style.setProperty("--cMsg", "#74da7c");
          root.style.setProperty("--brdList", "#e3e3e3");
          cookie.set("mode", "light", "360d");
        } /* end of if */
      }); /* end of addEventListener */
    } /* /listItemProfile */,

    checkMode() {
      var swtch = document.getElementById("switch");
      const root = document.documentElement;

      if (!cookie.get("mode")) {
        cookie.set("mode", "light", "360d");
      } /* end of if */

      if (cookie.get("mode") == "light") {
        swtch.removeAttribute("checked");
        root.style.setProperty("--bgw", "#fff");
        root.style.setProperty("--bg", "#f4f1f1");
        root.style.setProperty("--bgbar", "#e8e6e6");
        root.style.setProperty("--bgSearch", "#faf6f6");
        root.style.setProperty("--fntClr", "rgb(48, 48, 48)");
        root.style.setProperty("--cShadow", "#a9a1a1");
        root.style.setProperty("--cMsg", "#74da7c");
        root.style.setProperty("--brdList", "#e3e3e3");
      } else {
        swtch.setAttribute("checked", "checked");
        root.style.setProperty("--bg", "#4d4962");
        root.style.setProperty("--bgbar", "#3f3c52");
        root.style.setProperty("--bgSearch", "#4c4e68");
        root.style.setProperty("--bgw", "#3a3b44");
        root.style.setProperty("--fntClr", "rgb(197 193 193)");
        root.style.setProperty("--cShadow", "#1c1b1b");
        root.style.setProperty("--cMsg", "#3cab44");
        root.style.setProperty("--brdList", "#464646");
      } /* end of if */
    } /* /checkMode */,

    contactsOptionsM(x, close) {
      this.settingYourProfile = false;
      var focusBtn = document.getElementsByClassName("focusBtn")[x];
      var focusBtnNotX = document.getElementsByClassName("focusBtn");
      if (!close) {
        if (focusBtn.dataset.check == "0") {
          focusBtn.dataset.check = "1";
          this.dataForContactProfile.id = x;
          this.contactsOptionsMenu = true;
          focusBtn.style.transform =
            "rotate(" + focusBtn.dataset.rotateArow + "deg)";
          focusBtn.dataset.rotateArow = 0;

          for (var i = 0; i < focusBtnNotX.length; i++) {
            if (
              focusBtnNotX[i].dataset.check == "1" &&
              focusBtnNotX[i] != focusBtn
            ) {
              focusBtnNotX[i].dataset.check = "0";
              focusBtnNotX[i].dataset.rotateArow = 180;
              focusBtnNotX[i].style.transform = "rotate(0deg)";
            } /* end of if */
          } /* end of for loop */
        } else {
          focusBtn.dataset.check = "0";
          this.contactsOptionsMenu = false;
          console.log("false :", focusBtn.dataset.rotateArow);
          this.dataForContactProfile.id = {};
          focusBtn.style.transform =
            "rotate(" + focusBtn.dataset.rotateArow + "deg)";
          focusBtn.dataset.rotateArow = 180;
        } /* end of if */
      } else {
        for (var j = 0; j < focusBtnNotX.length; j++) {
          focusBtnNotX[j].dataset.check = "0";
          focusBtnNotX[j].dataset.rotateArow = 180;
          focusBtnNotX[j].style.transform = "rotate(0deg)";
        } /* end of for loop */
        this.contactsOptionsMenu = false;
      } /* end of if */
    } /* /contactsOptionsMenu */,

    seetingProfile() {
      var focusBtnNotX = document.getElementsByClassName("focusBtn");
      for (var i = 0; i < focusBtnNotX.length; i++) {
        focusBtnNotX[i].dataset.check = "0";
        focusBtnNotX[i].dataset.rotateArow = 180;
        focusBtnNotX[i].style.transform = "rotate(0deg)";
      } /* end of for loop */
      this.contactsOptionsMenu = false;
      if (this.settingYourProfile == false) {
        this.settingYourProfile = true;
      } else {
        this.settingYourProfile = false;
      } /* end of if */
    } /* /seetingProfile */,
    closeListSetting(check) {
      if (check == true) {
        this.settingYourProfile = false;
      } /* end of if */
    } /* /closeListSetting */,
    myChat() {
      console.log("myContact ...");
      const user = cookie.get("user");
      var payload = { user_id: user.id };
      this.$store.dispatch("myContact", payload);
    } /* /myContact */,

    myProfile() {
      if (cookie.get("user")) {
        if (cookie.get("user").profile_image) {
          const myImg = document.getElementById("myImg");
          myImg.src =
            this.$store.state.imgProfilePath + cookie.get("user").profile_image;
        } /* /end of if */
      } /* end of if */
    } /* /myProfile */,

    getMessageByUser(reciver, sender) {
      const payload = { sender_id: sender, reciver_id: reciver };
      this.$store.dispatch("getMessageByUser", payload);
    } /* /getMessageByUser */,
  } /* end of methods */,
}; /* end of export default */
</script>

<style lang="scss" scoped>
#switch {
  width: 0;
  height: 0;
  visibility: hidden;
}

#labForSwitch {
  background-color: #c5cfd1;
  border-radius: 100px;
  position: relative;
  cursor: pointer;
  transition: 0.5s;
}

#labForSwitch::after {
  content: "";
  width: 14px;
  height: 14px;
  background-color: #e8f5f7;
  position: absolute;
  border-radius: 70px;
  top: 2.5px;
  left: 5px;
  transition: 0.5s;
}

#switch:checked + #labForSwitch:after {
  left: calc(100% - 10px);
  transform: translateX(-100%);
}

#switch:checked + #labForSwitch {
  background-color: #243d42;
}
</style>