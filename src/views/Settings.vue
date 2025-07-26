<template>
  <div class="flex items-center justify-center bg-zinc-900 h-screen">
      <div class="bg-slate-900 rounded shadow-md w-full max-w-lg h-screen content-center p-8" >
        <h1 class="absolute top-8 text-xl font-bold w-md text-white">
          Settings
        </h1>
        <div>
            <div>
                <button @click="remove_user"
                  class="w-full bg-green-700 text-white text-lg py-3 my-2 rounded-full hover:bg-green-800 active:scale-96 transition duration-150">
                  Remove User Session
                </button>
                  <button @click="remove_attlogs"
                  class="w-full bg-blue-700 text-white text-lg py-3 my-2 rounded-full hover:bg-blue-800 active:scale-96 transition duration-150">
                  Reset Attlogs
                </button>
            </div>
            <div class="absolute bottom-20 w-md">
              <button @click="logout"
                class="w-full bg-rose-600 text-white text-lg py-3 my-2 rounded-full hover:bg-rose-700 active:scale-96 transition duration-150">
                Logout
              </button>
            </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/sessionStore';
import { loader } from '@/stores/loaderStore'
import { alertmodal } from '@/stores/alertStore'


const sessionStore = useSessionStore()
const router = useRouter()


const remove_user = () => {
  sessionStore.removeUserSession()
  alertmodal.show('Success', 'User Session Removed')
}

const remove_attlogs = () => {
  sessionStore.removeAttlogSession()
  alertmodal.show('Success', 'Attlogs Reset')
}

const logout = () => {
  loader.show('Please wait...')
  sessionStore.logout()
  router.push('/').then(() => { loader.hide() })
}



</script>

<style scoped>
.home {
  padding: 2rem;
  text-align: center;
}

h1 {
  font-size: 2rem;
}
</style>
