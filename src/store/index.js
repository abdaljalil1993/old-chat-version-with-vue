import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    confirmationResult: null,
    emphasisLen: "",
    phone: "",
    serialNumber: [],
    user_id: "",
    myProfile: {},
    errMsg: null,
    imgProfilePath: "http://192.168.1.8:8080/src/yawar_chat/uploads/profile/",
    imgPath:"http://192.168.1.8:8080/src/yawar_chat/uploads/image/",
    videoPath: "http://192.168.1.8:8080/src/yawar_chat/uploads/video/",
    audioPath: "http://192.168.1.8:8080/src/yawar_chat/uploads/audio/",
    filePath: "http://192.168.1.8:8080/src/yawar_chat/uploads/files/",
    pattUrl: "http://192.168.1.8",
    myChat: null,
    getMessageByUser: null,
  },
  getters: {
    myProfile(state) {
      if (state.myProfile) {
        return state.myProfile;
      } else {
        return "";
      } /* end of if */
    } /* end of my profile */,
    errMsg(state) {
      if (state.errMsg) {
        console.log("errMsg :", state.errMsg);
        return state.errMsg;
      } else {
        return "";
      } /* end of if */
    } /* end of errMsg */,
    myChat(state) {
      if (state.myChat) {
        return state.myChat;
      } else {
        return null;
      } /* end of if */
    } /* /myChat */,
    getMessageByUser(state) {
      if (state.getMessageByUser) {
        return state.getMessageByUser;
      } else {
        return null;
      } /* end of if */
    } /* /getMessageByUser */,
  } /* /getters */,
  mutations: {
    getSignupReslutes(state, data) {
      state.phone = data.data.user[1];
      state.user_id = data.data.user[0];
      state.serialNumber = data.data.numbers;
    } /* /getSignupResute */,
    getMyProfile(state, data) {
      state.myProfile = data;
    } /* end of getMyProfile */,
    getErrorMessage(state, data) {
      state.errMsg = data;
    } /* end of getErrorMessage */,
    myChat(state, data) {
      state.myChat = data;
    } /* /myChat */,
    getMessageByUser(state, data) {
      state.getMessageByUser = data;
    } /* /getMessageByUser */,
  } /* /mutations */,
  actions: {
    signup(context, payload) {
      const ex = new URLSearchParams();
      ex.append("phone", payload.phone);
      axios
        .post(
          context.state.pattUrl + ":8080/src/yawar_chat/APIS/signup.php",
          ex
        )
        .then((res) => {
          console.log("data :", res.data);
          context.commit("getSignupReslutes", res.data);
        })
        .catch((err) => console.log(err));
    } /* /signup */,

    async login(context, payload) {
      const result = await axios
        .post(context.state.pattUrl + ":3000/loginUser", payload)
        .catch((err) => console.log(err));

      if (result.data.profile) {
        context.commit("getMyProfile", result.data.profile);
      } else {
        context.commit("getErrorMessage", result.data);
      } /* end of if */
    } /* end of login */,

    async complateSingup(context, payload) {
      const ex = new FormData();
      ex.append("id", payload.id);
      ex.append("sn", payload.sn);
      ex.append("first_name", payload.f_name);
      ex.append("last_name", payload.l_name);
      ex.append("email", payload.email);
      ex.append("img_profile", payload.img);
      const result = await axios
        .post(context.state.pattUrl + ":3000/uploadImgProfile", ex)
        .catch((err) => console.log(err));
      console.log("resulte :", result);
      context.commit("getMyProfile", result.data[0]);
    } /* /complateSingup */,

    async sendprofilePassword(context, payload) {
      if (payload) {
        const resulte = await axios
          .post(context.state.pattUrl + ":3000/setPasswordProfile", payload)
          .catch((err) => console.log(err));
        context.commit("getMyProfile", resulte.data[0]);
      } else {
        console.log("some thinks is wrong");
      } /* /payload */
    } /* /sendPassword */,

    async myContact(context, payload) {
      console.log(payload)
      /* const resulte = await axios.get("http://192.168.1.11:8080/src/yawar_chat/APIS/mychat.php?user_id="+payload.user_id).catch((err) => console.log(err)); */
      const resulte = await axios
        .get(
          context.state.pattUrl +
            ":8080/src/yawar_chat/APIS/mychat.php?user_id=8"
        )
        .catch((err) => console.log(err));
      context.commit("myChat", resulte.data.data);
    } /* /myContact */,
    async getMessageByUser(context, payload) {
      console.log("sss :",payload)
      const resulte = await axios
        .post(context.state.pattUrl + ":8000/messagesbyusers", payload)
        .catch((err) => console.log(err));
      if (resulte) {
        console.log(resulte)
        context.commit("getMessageByUser", resulte.data);
      } /* end of if */
    } /* /getMessageByUser */,
  } /* /actions */,
});
