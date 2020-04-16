<template>
  <div class="container">
    <h3 class="text-center">Vue Chat</h3>
    <div class="messaging">
      <div class="inbox_msg">
        <div class="inbox_people">
          <div class="headind_srch">
            <div class="recent_heading">
              <h4>Recent</h4>
            </div>
          </div>
          <div class="inbox_chat">
            <div @click="showOurMsg" class="chat_list active_chat">
              <div class="chat_people">
                <div class="chat_img">
                  <img :src="authAvatar" alt="sunil" />
                </div>
                <div class="chat_ib">
                  <h5>
                    {{sendMeName}}
                    <span class="chat_date">{{lastMsgTime}}</span>
                  </h5>
                  <p>
                    Test, which is a new approach to have all solutions
                    astrology under one roof.
                  </p>
                  <p
                    v-if="incomMsgCount > 0"
                    class="messages-counter"
                  >You Have {{incomMsgCount}} New Messages</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>

        <div class="mesgs">
          <div class="msg_history" v-chat-scroll="{smooth: true, notSmoothOnInit: true}">
            <div v-for="message in messages" :key="message.id">
              <div :class="[message.author === authUser.displayName ? '' : 'incoming_msg mb-3']">
                <div
                  v-if="message.author !== authUser.displayName"
                  :class="[message.author === authUser.displayName ? '' : 'incoming_msg_img']"
                >
                  <img :src="message.userAvatar" alt="sunil" class="rounded-circle" />
                </div>
                <div
                  :class="[message.author === authUser.displayName ? 'outgoing_msg' : 'received_msg']"
                >
                  <div
                    :class="[message.author === authUser.displayName ? 'sent_msg' : 'received_withd_msg']"
                  >
                    <p>{{ message.message }}</p>
                    <span class="time_date">{{message.author}} | {{ message.createdAt }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="seen-icon">
            <div v-if="!test" class="text-right">
              {{sendMeName}} seen your message
              <i class="fas fa-eye mr-4"></i>
            </div>
          </div>

          <div class="type_msg">
            <div class="input_msg_write">
              <input
                @click="showOurMsg()"
                @keyup.enter="saveMessage()"
                v-model="message"
                type="text"
                class="write_msg"
                placeholder="Type a message"
              />
              <button @click.prevent="saveMessage()" class="msg_send_btn" type="button">
                <i class="fas fa-paper-plane" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import { db } from "../firebase";
import moment from "moment";
export default {
  name: "Chat",
  data() {
    return {
      message: null,
      messages: [],
      authUser: {},
      incomMsgCount: 0,
      sendMeName: "",
      authAvatar: "",
      test: false,
      lastMsgTime: null
    };
  },

  methods: {
    saveMessage() {
      //Save to fire Store
      db.collection("chat")
        .add({
          message: this.message,
          author: this.authUser.displayName,
          userAvatar: this.authUser.photoURL,
          createdAt: moment(this.messages.timestamp).format("LTS"),
          id: null,
          read: false,
          seen: false
        })
        .then(function(docRef) {
          db.collection("chat")
            .doc(docRef.id)
            .update({
              id: docRef.id
            });
        });

      this.showOurMsg();
      this.message = null;
    },
    fechMessages() {
      db.collection("chat")
        .orderBy("createdAt")
        .onSnapshot(querySnapshot => {
          let allMessages = [];
          querySnapshot.forEach(doc => {
            allMessages.push(doc.data());
          });

          this.incomMsgCount = 0;
          allMessages.forEach(msg => {
            this.lastMsgTime = msg.createdAt;
            if (msg.author !== this.authUser.displayName) {
              this.sendMeName = msg.author;
              this.authAvatar = msg.userAvatar;

              !msg.read ? this.incomMsgCount++ : null;
            }

            if (msg.author === this.authUser.displayName) {
              !msg.seen ? (this.test = true) : (this.test = false);
            }
          });
          this.messages = allMessages;
        });
    },
    showOurMsg() {
      this.messages.forEach(msg => {
        if (msg.author !== this.authUser.displayName) {
          this.incomMsgCount = 0;

          db.collection("chat")
            .doc(msg.id)
            .update({
              read: true,
              seen: true
            });
        }
      });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authUser = user;
      } else {
        this.authUser = {};
      }
    });

    this.fechMessages();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          next();
        } else {
          vm.$router.push("/login");
        }
      });
    });
  }
};
</script>

<style scoped>
.container {
  max-width: 1170px;
  margin: auto;
}
img {
  max-width: 100%;
}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%;
  border-right: 1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
  padding-bottom: 21px;
  background-color: #fff;
}
.top_spac {
  margin: 20px 0 0;
}

.recent_heading {
  float: left;
  width: 40%;
}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%;
}
.headind_srch {
  padding: 10px 29px 10px 20px;
  overflow: hidden;
  border-bottom: 1px solid #c4c4c4;
}

.recent_heading h4 {
  color: #05728f;
  font-size: 21px;
  margin: auto;
}
.srch_bar input {
  border: 1px solid #cdcdcd;
  border-width: 0 0 1px 0;
  width: 80%;
  padding: 2px 0 4px 6px;
  background: none;
}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon {
  margin: 0 0 0 -27px;
}

.chat_ib h5 {
  font-size: 15px;
  color: #464646;
  margin: 0 0 8px 0;
}
.chat_ib h5 span {
  font-size: 13px;
  float: right;
}
.chat_ib p {
  font-size: 14px;
  color: #989898;
  margin: auto;
}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people {
  overflow: hidden;
  clear: both;
}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat {
  height: 500px;
  overflow-y: scroll;
}

.active_chat {
  background: #ebebeb;
}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
}
.received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #000;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg {
  width: 57%;
}
.mesgs {
  float: left;
  padding: 7px 15px 0px 25px;
  width: 60%;
  background-color: #fff;
}

.sent_msg p {
  background: #05728f none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0;
  color: #fff;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.outgoing_msg {
  overflow: hidden;
  margin: 26px 0 26px;
}
.sent_msg {
  float: right;
  width: 46%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
  padding: 10px;
}

.type_msg {
  border-top: 1px solid #c4c4c4;
  position: relative;
}
.msg_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
.messaging {
  padding: 0 0 50px 0;
}
.msg_history {
  height: 466px;
  overflow-y: auto;
}
.messages-counter {
  color: #fff !important;
  background: #f00;
  padding: 8px;
  display: inline-block;
  border-radius: 10px;
  margin-top: 10px !important;
  font-size: 12px !important;
}

.seen-icon {
  height: 24px;
}
</style>
