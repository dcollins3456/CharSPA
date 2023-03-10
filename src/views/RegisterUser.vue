<template>
  <div class="register">
    <div class="signupSection">
      <div class="left-box">
      </div>
      <form @submit.prevent="signUp" class="signupForm">
          <h2>Register Account</h2>
          <ul class="noBullet">
              <li>
                  <label for="email"></label>
                  <input type="email" placeholder="Email" v-model="email" id="email" class="inputFields" required/>
              </li>
              <li>
                  <label for="password"></label>
                  <input type="password" placeholder="Password" v-model="password" id="password" class="inputFields" required/>
              </li>
              <li>
                  <label for="confirm-password"></label>
                  <input type="password" placeholder="Confirm Password" v-model="confirm_password" id="confirm-password" class="inputFields" required/>
              </li>
              
              <p class="errMsg" v-if="errMsg">{{ errMsg }}</p>
          </ul>
          <div @click="register" class="form-button">
            <img class="image-hover" src="graphics/form-button-hover.png" />
            <img class="image-main" src="graphics/form-button.png" />
            <p>Register</p>
          </div><br>
          <img class="or" src="graphics/or.png"/>
          <div @click="registerWithGoogle" class="form-button google">
            <img class="image-hover" src="graphics/form-google-button-hover.png" />
            <img class="image-main" src="graphics/form-google-button.png" />
            <p>Sign up using Google</p>
          </div><br>
          <a @click="redirectToLogIn()">Already registered?  Log in => </a>
      </form>
    </div>
</div>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useRouter } from 'vue-router'

const email = ref("")
const password = ref("")
const confirm_password = ref("")
const errMsg = ref() 

const router = useRouter()

const register = () => {
  if(password.value == confirm_password.value){
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("REGISTER: ___________ Successful registration!");
      router.push('/crew');
    })
    .catch((error) => {
      console.log("REGISTER: ___________ ERROR: ", error.code)
      alert(error.message)
    });
  } else {
    errMsg.value = "Passwords do not match."
  }
  
}
const registerWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
  .then((result) => {
    console.log("REGISTER: ___________ Successful G-mail account registration!");
    router.push('/crew');
  })
  .catch((error) => {
    console.log("REGISTER: ___________ ERROR: ", error.code)
    alert(error.message)
  });
}

const redirectToLogIn = () => {
  router.push('/sign-in')
}

</script>