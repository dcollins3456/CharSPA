import { createRouter, createWebHistory } from 'vue-router'
import CharMenu from '@/views/CharMenu.vue'
import CharObj from '@/views/CharObj.vue'
import AddChar from '@/views/AddChar.vue'
import CrewObj from '@/views/CrewObj.vue'
import { useSpaStore } from "@/stores/";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      props: true,
      components: {
        "nav-bar": CharMenu,
        default: CrewObj
      }
    },
    {
      path: "/crew",
      components: {
        "nav-bar": CharMenu,
        default: CrewObj
      }
    },
    {
      path: "/:id",
      props: true,
      components: {
        "nav-bar": CharMenu,
        default: CharObj
      }
    },
    {
      path: "/add",
      components: {
        "nav-bar": CharMenu,
        default: AddChar
      }
    },
  ]
})


export default router
