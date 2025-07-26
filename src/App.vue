<template>
  <div id="app">
    <div  v-if="route.path !== '/'" class="absolute bottom-0 w-full">
      <Navigation/>
    </div>
    <Loader />
    <AlertModal />
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import Loader from '@/components/Loader.vue'
import AlertModal from '@/components/AlertModal.vue'
import Navigation from './components/Navigation.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position) {
        console.log('Location is Enabled: ', position.coords)
      } else {
        console.log('Cannot get Location')
      }
    })
  }

} 

getLocation()


</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}

router-link {
  margin: 0 1rem;
  text-decoration: none;
  color: #42b983;
  font-weight: bold;
}

</style>
