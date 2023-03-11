import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import CharMenu from '@/views/CharMenu.vue'
import CharObj from '@/views/CharObj.vue'
import AddChar from '@/views/AddChar.vue'
import CrewObj from '@/views/crewObj.vue'
import RegisterUser from '@/views/RegisterUser.vue'
import SignIn from '@/views/SignIn.vue'
import EmptyMenu from '@/views/EmptyMenu.vue'
import PendingAuthorization from '@/views/PendingAuthorization.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      props: true,
      components: {
        default: SignIn
      }
    },
    {
      path: "/register",
      props: false,
      components: {
        "nav-bar": EmptyMenu,
        default: RegisterUser
      }
    },
    {
      path: "/sign-in", 
      props: false,
      components: {
        default: SignIn
      }
    },
    
    {
      path: "/ship-view",
      components: {
        "nav-bar": CharMenu,
        default: CrewObj
      },
      meta:{
        requiresAuth: true,
      }
    },
    {
      path: "/character-view",
      props: true,
      components: {
        "nav-bar": CharMenu,
        default: CharObj
      },
      meta:{
        requiresAuth: true,
      }
    },
    {
      path: "/add",
      components: {
        "nav-bar": EmptyMenu,
        default: AddChar
      },
      meta:{
        requiresAuth: true,
      }
    },
    {
      path: "/limbo",
      components:{
        "nav-bar": EmptyMenu,
        default: PendingAuthorization
      }
    }
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async(to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)){
    if (await getCurrentUser()) {
      next();
    } else {
      alert("You don't have access!")
      next("/")
    }
  } else {
    next()
  }
});

export default router
