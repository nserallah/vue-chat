<template>
  <div class="container">
    <div class="d-flex justify-content-center h-100">
      <div class="card">
        <div class="card-header">
          <h3 class="text-uppercase">login chat</h3>
        </div>
        <div class="card-body">
          <form>
            <div class="form-group text-center">
              
              <button @click.prevent="login()" type="submit" class="btn login_btn">Login with Google Acount</button>
              <p v-if="errorText" class="mt-3" style="color: #fff">{{ errorText }}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default {
    data() {
      return {
        errorText: null,
      }
    },
    methods: {
        login() {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
            firebase.auth().signInWithPopup(provider).then(result => {
            
            var user = result.user;
            console.log(user)
            this.$router.push('/')
            }).catch(function(error) {
              console.log(error)
            });
      }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Numans');

html,body{
background-image: url('http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg') !important;
background-size: cover;
background-repeat: no-repeat;
height: 100%;
font-family: 'Numans', sans-serif;
}

.container{
height: 100%;
align-content: center;
}

.card{
height: auto;
padding:20px;
padding-bottom:0;
margin-top: 150px;
margin-bottom: auto;
width: 400px;
background-color: rgba(0,0,0,0.5) !important;
}

.social_icon span{
font-size: 60px;
margin-left: 10px;
color: #FFC312;
}

.social_icon span:hover{
color: white;
cursor: pointer;
}

.card-header h3{
color: white;
}

.social_icon{
position: absolute;
right: 20px;
top: -45px;
}

.input-group-prepend span{
width: 50px;
background-color: #FFC312;
color: black;
border:0 !important;
}

input:focus{
outline: 0 0 0 0  !important;
box-shadow: 0 0 0 0 !important;

}

.remember{
color: white;
}

.remember input
{
width: 20px;
height: 20px;
margin-left: 15px;
margin-right: 5px;
}

.login_btn{
color: black;
background-color: #FFC312;
width: 100px;
}

.login_btn:hover{
color: black;
background-color: white;
}

.links{
color: white;
}

.links a{
margin-left: 4px;
}
</style>