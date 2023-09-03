import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//main.js
// import { router } from './router/index'
createApp(App).use(ElementPlus).mount('#app')
// const app = createApp(App)
// 使用 Vue Router
// app.use(router)
// app.mount('#app')