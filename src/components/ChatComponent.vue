<template>
  <div class="chat-room">
    <div class="wepper-chat">
      <!-- here we will display old message -->
      <!-- /myMessageCover -->
    </div>
    <!-- /wepper-chat -->
    <div class="formSendMessage">
      <form action="">
        <div class="uploadFile">
          <label for="file">
            <fa icon="plus" />
          </label>
          <input type="file" id="file" />
        </div>
        <!-- /uploadFile -->
        <div class="myMessageInput">
          <input type="text" v-model="inputMsg" placeholder="message ..." />
          <button class="btn addMsg" @click.prevent="addMsg">
            <fa icon="paper-plane" />
          </button>
        </div>
        <!-- /myMessageInput -->

        <div class="voiceInput">
          <label for="voice">
            <fa icon="microphone" />
          </label>
          <input type="file" name="" id="voice" />
        </div>
        <!-- /voiceInput -->
      </form>
    </div>
  </div>
  <!-- /chat-room -->
</template>

<script>
import moment from "moment";
import file from "../assets/uploads/image/file.png";
import download from "../assets/uploads/image/download.png";
export default {
  props: ["msgs"],
  data() {
    return {
      inputMsg: "",
      myOldsMessage: null,
      user: null,
      date: null,
    }; /* /return */
  } /* /data */,
  mounted() {} /* /mounted */,
  methods: {
    addMsg() {
      console.log("added ...");
      var ddt = new Date();
      var start = moment(ddt);
      var end = moment(new Date());
      ddt = end.from(start, true);
      const wepperChat = document.getElementsByClassName("wepper-chat")[0];
      wepperChat.innerHTML +=
        "<div class='myMessageCover'>" +
        "<div class='message'>" +
        "<p>" +
        this.inputMsg +
        "</p>" +
        "<div class='created'>" +
        ddt +
        "</div>" +
        "</div>" +
        "</div>";
      this.inputMsg = "";
      wepperChat.scrollTop = wepperChat.scrollHeight;
      this.datesss();
    } /* /addMsg */,

    datesss() {
      const cImg = document.getElementsByClassName("message");
      for (var i = 0; i < cImg.length; i++) {
        cImg[i].addEventListener("click", function () {
          const dt = this.getElementsByClassName("created")[0];
          dt.classList.toggle("showDate");
        }); /* end of addListener */
      } /* end of for loop */
    } /* end of imgDate */,
  } /* /methods */,

  watch: {
    msgs(x) {
      const wepperChat = document.getElementsByClassName("wepper-chat")[0];
      wepperChat.innerHTML = "";
      if (x) {
        x.forEach((item) => {
          var p = document.createElement("p");
          var video = document.createElement("video");
          var audio = document.createElement("audio");
          var source = document.createElement("source");
          var created = document.createElement("div");
          var message = document.createElement("div");
          var myMessageCover = document.createElement("div");
          var messageYouCover = document.createElement("div");

          //this for file messgae
          var coverFile = document.createElement("div");
          var rl = document.createElement("a");
          var downloadLink = document.createElement("a");
          var img = document.createElement("img");
          var img2 = document.createElement("img");
          var title = document.createElement("div");

          video.style.width = "100%";
          audio.style.width = "100%";
          audio.style.maxHeight = "400px";
          video.style.maxHeight = "400px";
          switch (item.message_type) {
            case "text":
              var start = moment(item.created_at);
              var end = moment(new Date());
              item.created_at = end.from(start, true);
              if (item.sender_id == 8) {
                //create p tag
                p.textContent = item.message;
                //create div created
                created.classList.add("created");
                created.textContent = item.created_at;
                //create div message
                message.classList.add("message");
                //create my myMessageCover
                myMessageCover.classList.add("myMessageCover");
                //add p and created into message
                message.appendChild(p);
                message.appendChild(created);
                //add messages div into myMessageCover
                myMessageCover.appendChild(message);
                wepperChat.appendChild(myMessageCover);
              } else {
                //add text content for p
                p.textContent = item.message;
                //create div created
                created.classList.add("created");
                created.textContent = item.created_at;
                //create div message
                message.classList.add("message");
                //create my myMessageCover
                messageYouCover.classList.add("messageYouCover");
                //add p and created into message
                message.appendChild(p);
                message.appendChild(created);
                //add messages div into myMessageCover
                messageYouCover.appendChild(message);
                wepperChat.appendChild(messageYouCover);
              } /* end of if */
              break;
            /* end of text case */
            case "video":
              if (item.sender_id == 8) {
                //create p tag
                /* here we will create video element */
                video.controls = "controls";
                video.classList.add("videoType");
                video.classList.add("flex");
                source.src = this.$store.state.videoPath + item.message;
                //create div created
                created.classList.add("created");
                created.textContent = item.created_at;
                //create div message
                message.classList.add("message");
                //create my myMessageCover
                myMessageCover.classList.add("myMessageCover");
                //add p and created into message
                video.appendChild(source);
                message.appendChild(video);
                message.appendChild(created);
                //add messages div into myMessageCover
                myMessageCover.appendChild(message);
                wepperChat.appendChild(myMessageCover);
              } else {
                video.controls = "controls";
                video.classList.add("videoType");
                source.src = this.$store.state.imgPath + item.message;
                //create div created
                created.classList.add("created");
                created.textContent = item.created_at;
                //create div message
                message.classList.add("message");
                //create my myMessageCover
                messageYouCover.classList.add("messageYouCover");
                //add p and created into message
                video.appendChild(source);
                message.appendChild(video);
                message.appendChild(created);
                //add messages div into myMessageCover
                messageYouCover.appendChild(message);
                wepperChat.appendChild(messageYouCover);
              } /* end of if */
              break;
            /* /case video */
            case "voice":
              if (item.sender_id == 8) {
                //create p tag
                /* here we will create video element */
                audio.controls = "controls";
                audio.classList.add("audioType");
                source.src = this.$store.state.audioPath + item.message;
                //create div created
                created.classList.add("created");
                created.textContent = item.created_at;
                //create div message
                message.classList.add("message");
                message.style.width = "80%";
                message.style.height = "80px";
                //create my myMessageCover
                myMessageCover.classList.add("myMessageCover");
                //add p and created into message
                audio.appendChild(source);
                message.appendChild(audio);
                message.appendChild(created);
                //add messages div into myMessageCover
                myMessageCover.appendChild(message);
                wepperChat.appendChild(myMessageCover);
              } else {
                audio.controls = "controls";
                audio.classList.add("audioType");
                source.src = this.$store.state.audioPath + item.message;
                //create div created
                created.classList.add("created");
                created.textContent = item.created_at;
                //create div message
                message.classList.add("message");
                //create my myMessageCover
                messageYouCover.classList.add("messageYouCover");
                //add p and created into message
                audio.appendChild(source);
                message.appendChild(audio);
                message.appendChild(created);
                //add messages div into myMessageCover
                messageYouCover.appendChild(message);
                wepperChat.appendChild(messageYouCover);
              } /* end of if */
              break;
            /* end of video */
            case "file":
              if (item.sender_id == 8) {
                downloadLink.href = this.$store.state.filePath + item.message;
                img2.src = download;
                downloadLink.appendChild(img2);
                downloadLink.target = "_blank";
                rl.appendChild(downloadLink);

                p.textContent = item.orginalName;
                title.appendChild(p);

                img.src = file;
                title.appendChild(img);
                title.classList.add("title");

                coverFile.appendChild(rl);
                coverFile.appendChild(title);
                coverFile.classList.add("fileType");

                created.classList.add("created");
                created.textContent = item.created_at;

                message.appendChild(coverFile);
                message.appendChild(created);
                message.classList.add("message");

                myMessageCover.appendChild(message);
                myMessageCover.classList.add("myMessageCover");

                wepperChat.appendChild(myMessageCover);
              } else {
                downloadLink.href = this.$store.state.filePath + item.message;
                img2.src = download;
                downloadLink.appendChild(img2);
                downloadLink.target = "_blank";
                rl.appendChild(downloadLink);

                p.textContent = item.orginalName;
                title.appendChild(p);

                img.src = file;
                title.appendChild(img);
                title.classList.add("title");

                coverFile.appendChild(rl);
                coverFile.appendChild(title);
                coverFile.classList.add("fileType");

                created.classList.add("created");
                created.textContent = item.created_at;

                message.appendChild(coverFile);
                message.appendChild(created);
                message.classList.add("message");

                messageYouCover.appendChild(message);
                messageYouCover.classList.add("messageYouCover");

                wepperChat.appendChild(messageYouCover);
              } /* end of if */
              break;
            /* end of file */
            case "image":
              if (item.sender_id == 8) {
                //create p tag
                /* here we will create video element */
                img.classList.add("imgType");
                img.classList.add("flex");
                img.src = this.$store.state.imgPath + item.message;
                //create div created
                created.classList.add("created");
                created.textContent = item.created_at;
                //create div message
                message.classList.add("message");
                //create my myMessageCover
                myMessageCover.classList.add("myMessageCover");
                //add p and created into message
                rl.appendChild(img);
                rl.target = "_blank";
                rl.href = this.$store.state.imgPath + item.message;
                message.appendChild(rl);

                message.style.width = "250px";
                //add messages div into myMessageCover
                myMessageCover.appendChild(message);
                wepperChat.appendChild(myMessageCover);
              } else {
                img.classList.add("imgType");
                img.classList.add("flex");
                img.src = this.$store.state.imgPath + item.message;
                //create div created
                created.classList.add("created");
                created.textContent = item.created_at;
                //create div message
                message.classList.add("message");
                //create my myMessageCover
                messageYouCover.classList.add("messageYouCover");
                //add p and created into message
                img.appendChild(source);
                message.appendChild(img);
                message.appendChild(img);
                message.style.maxWidth = "250px";
                //add messages div into myMessageCover
                messageYouCover.appendChild(message);
                wepperChat.appendChild(messageYouCover);
              } /* end of if */
              break;
            default:
              console.log(`somethings wrong`);
              break;
          } /* /switch */
        }); /* end of forEach */
        wepperChat.scrollTop = wepperChat.scrollHeight;
        this.datesss();
      } /* end of if */
    } /* /msgs */,
  } /* /watch */,
};
</script>

<style lang="scss" scoped>
</style>