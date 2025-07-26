import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { useSessionStore } from './stores/sessionStore'

const session = useSessionStore()

const app = createApp(App)

if (session.isLoggedIn()) {
  console.log('User session exists:', session.getUser())
} else {
  console.log('No session found.')
}
// app.use(VueSession as any) // cast to `any` to bypass type issues
app.use(router)
app.mount('#app')