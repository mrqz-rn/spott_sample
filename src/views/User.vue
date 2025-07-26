<template>
  <div class="flex items-center justify-center bg-zinc-900 h-screen">
      <div class="bg-slate-900 rounded shadow-md w-full max-w-lg h-screen p-8" >
          <h1 class="text-xl font-bold w-md text-white mb-2">
            Profile
          </h1>
          <div class="p-4 bg-white h-[40vh] rounded-lg">
              <p class="text-xl font-semibold mb-2">USER INFORMATION</p>
              <p class="text-xl font-semibold text-left">Name: <b>{{ user_session.username }}</b></p>
              <p class="text-xl font-semibold text-left">Username: <b>{{ user_session.name.toUpperCase() }}</b></p>
              <p class="text-xl font-semibold text-left">Last Login: <b>{{ user_session.last_login }}</b></p>
              <p class="text-xl font-semibold text-left">Created On: <b>{{ user_session.created_on }}</b></p>
          </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
import { useSessionStore } from '@/stores/sessionStore';

const sessionStore = useSessionStore()

const user_session = sessionStore.getUser()[0]



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
