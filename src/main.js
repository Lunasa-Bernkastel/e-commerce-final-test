import './assets/main.css'
import "bootstrap/dist/css/bootstrap.css"
import { createApp } from 'vue'
import App from './App.vue'
import './product.js'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { store } from './store/index'

const router = createRouter ({
   history: createWebHistory (),
   routes, 
   scrollBehavior (to, from, savedPosition) {
    return { top: 0 }
   }
})

createApp(App)
.use(store)
.use(router)
.mount('#app')
import "bootstrap/dist/js/bootstrap.js"
