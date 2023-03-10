<template>
  <div class="signin">
    <div class="signupSection">
        <div class="left-box">
        </div>
        <form @submit.prevent="signUp" class="signupForm">
            <h2>Sign In</h2>
            <ul class="noBullet">
                <li>
                    <label for="email"></label>
                    <input type="email" placeholder="Email" v-model="email" id="email" class="inputFields" required/>
                </li>
                <li>
                    <label for="password"></label>
                    <input type="password" placeholder="Password"  v-model="password" id="password" class="inputFields" required/>
                </li>
                
                <p class="errMsg" v-if="errMsg">{{ errMsg }}</p>
            </ul>
            <div @click="signin" class="form-button">
              <img class="image-hover" src="graphics/form-button-hover.png" />
              <img class="image-main" src="graphics/form-button.png" />
              <p>Submit</p>
            </div><br>
            <img class="or" src="graphics/or.png"/>
            <div @click="signInWithGoogle" class="form-button google">
              <img class="image-hover" src="graphics/form-google-button-hover.png" />
              <img class="image-main" src="graphics/form-google-button.png" />
              <p>Sign in with Google</p>
            </div><br>
            <a @click="redirectToRegisterUser()">New to CharSPA? Please register here...</a>
        </form>
    </div>
  </div> 
        
        


</template>

<script setup>
import { ref } from "vue"
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useRouter } from 'vue-router'

const email = ref("")
const password = ref("")
const errMsg = ref() 
const router = useRouter()

const signin = () => {
  console.log("SIGN IN CALLED")
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
        console.log("SIGN-IN: ___________ Successful login!");
        router.push('/crew');
    })
    .catch((error) => {
        console.log("SIGN-IN: ___________ ERROR: ", error.code)
        switch(error.code){
        case "auth/invalid-email":
            errMsg.value = "Invalid email"
            break
        case "auth/user-not-found":
            errMsg.value = "No account with that email was found"
            break
        case "auth/wrong-password":
            errMsg.value = "Incorrect password"
            break
        default:
            errMsg.value = "Email or password was incorrect"
            break        
        }  
    });
}
const signInWithGoogle = () => {
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
const redirectToRegisterUser = () => {
  router.push('/register')
}

</script>

<style>


</style>