<template>
  <div class="login">
    <div class="flex items-center justify-center bg-zinc-900 h-screen">
        <div class="bg-slate-900 rounded shadow-md w-full max-w-lg h-screen content-center" >
            <h1 class="text-xl font-bold">
                ONLINE TIME TRACKER
            </h1>
            <form @submit.prevent="handleLogin" class="space-y-4 p-8">
                    <label class="block text-sm font-medium mb-1 text-left text-white">
                        Username
                        <span class="text-gray-400 px-1">(e.g.: admin)</span>
                    </label>
                    <input v-model="credentials.username" type="text" required
                        class="text-white w-full border rounded px-3 py-2" 
                        placeholder="Enter Username"
                    />
                    <label class="block text-sm font-medium mb-1 text-left text-white">
                        Password
                        <span class="text-gray-400 px-1">(e.g.: pass)</span>
                    </label>
                     <input v-model="credentials.password" type="password" required
                        class="text-white w-full border rounded px-3 py-2" 
                        placeholder="Enter Password"
                    />
                    <button type="submit" 
                    class="w-full bg-rose-600 text-white text-lg py-3 my-2 rounded-full hover:bg-rose-700 active:scale-96 transition duration-150">
                        Login
                    </button>
            </form>
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/sessionStore'
import { loader } from '@/stores/loaderStore'
import { alertmodal } from '@/stores/alertStore'
import md5 from 'md5'
import { login } from '@/api/api'

const { setUser } = useSessionStore()
const router = useRouter()


const credentials = reactive({
  username: '',
  password: ''
})

const handleLogin = async () => {
    loader.show('Please wait...')
    try {
        const response = await login(credentials.username, md5(credentials.password))
        if(response.data.status) {
            setUser(response.data.data)
            router.push('/home').then(() => loader.hide())
        }else{
            alertmodal.show('Login Failed', response.data.error)
            loader.hide()
        }
    } catch (err) {
        alertmodal.show('Login Failed', err.error)
        loader.hide()
    }
}

</script>

<style scoped>
.login{
    text-align: center;
}

h1 {
  font-size: 2rem;
  color: #42b983;
}
</style>
