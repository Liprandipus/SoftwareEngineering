// main.js setups Vue
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


createApp(App)
    .use(router)  // router is used globally
    .mount('#app')
