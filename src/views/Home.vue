<template>
    <div class="flex items-center justify-center bg-zinc-900 h-screen">
        <div class="bg-slate-900 rounded shadow-md w-full max-w-lg h-screen px-8 pt-5" >

            <div class="p-3 bg-white my-4 rounded-lg">
              <p class="font-semibold mb-2">TIME TRACKER</p>
              <p class="text-7xl font-semibold">{{ dateObject.time }}</p>
              <p class="text-2xl">{{ dateObject.day }}, {{ dateObject.date }}</p>
            </div>
            <button @click="dtr_log" class="w-full bg-rose-600 text-white text-lg py-3 my-2 rounded-full hover:bg-rose-700 active:scale-96 transition duration-150">
                {{ log_type == 1 ? 'TIME OUT' : 'TIME IN' }}
            </button>
             <button @click="transfer_attlogs" 
             class="w-full bg-blue-600 text-white text-sm py-2 my-2 rounded-full hover:bg-blue-700 active:scale-96 transition duration-150">
                Transfer Attlogs ({{ for_transfer.length }})
            </button>

            <p class="font-semibold mt-2 text-white">ATTENDANCE LOGS</p>
            <div v-if="attlogs.length > 0" 
              class="p-1 bg-white my-1 rounded max-h-[54vh] overflow-y-scroll">
                <div v-for="(log, index) in [...attlogs].reverse()" 
                :key="index" 
                class="flex justify-between border-b p-1"
                :class="log.upload_status == 0 ? 'text-red-600' : 'text-black'">
                    <div class="w-1/6 bg-green-700 content-center text-white font-semibold text-sm" 
                    :class="log.type == 1 ? 'bg-zinc-700' : 'bg-green-700'">
                      {{ log.type == 1 ? 'OUT' : 'IN' }}
                    </div>
                    <div class="w-5/6 content-center flex justify-between px-6">
                      <span class="font-semibold text-normal content-center"> 
                        {{ date_format(log.date) }} {{ log.time }}
                      </span>
                      <div class="text-sm">
                        <p>Lat: {{ log.latitude }}</p>
                        <p>Long: {{ log.longitude }}</p>
                      </div>
                    </div>
                </div>
            </div>  
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed  } from 'vue'
import { useSessionStore } from '@/stores/sessionStore'
import { loader } from '@/stores/loaderStore'
import { alertmodal } from '@/stores/alertStore'
import { saveLogs } from '@/api/api'


const dateObject = reactive({
  date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
  day: new Date().toLocaleString('default', { weekday: 'short' }),
})
setInterval(() => {
  dateObject.time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
}, 1000)

const sessionStore = useSessionStore()
const user_session = sessionStore.getUser()[0]

interface Logs {
  user_id: number,
  type: number,
  date: string,
  time: string,
  latitude: number,
  longitude: number,
  upload_status: number
}
const attlogs = ref<Logs[]>([])


let session_logs = sessionStore.getLogs()
if(session_logs){
  attlogs.value = session_logs
}


const log_type = computed(() => {
  let type = 0
  if(attlogs.value){
    if(attlogs.value.length != 0){
      type = attlogs.value[attlogs.value.length - 1]?.type
      type = type == 1 ? 0 : 1
    }
    return type
  }
})
const for_transfer = computed(() => {
  return attlogs.value.filter((log) => log.upload_status == 0)
})


const date_format = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
}

const dtr_log = async () => {
  loader.show('Please wait...')
  let coordinates;
  try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      coordinates = { latitude: position.coords.latitude, longitude: position.coords.longitude };
  } catch (error) {
    console.log(error)
  }
  setTimeout(() => {
     attlogs.value.push({ 
      user_id: user_session.ID,
      date: new Date().toLocaleDateString('en-CA'),
      time: dateObject.time,
      type: log_type.value, 
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      upload_status: 0,
    })
    sessionStore.updateLogs(attlogs.value)
    loader.hide()
  }, 500);
}


const transfer_attlogs = async () => {
  if(for_transfer.value.length == 0){
      return alertmodal.show('Notice', 'No logs to transfer')
  }

  loader.show('Please wait...')
    await Promise.all(
      for_transfer.value.map(async (log) => {
        const index = attlogs.value.findIndex(att => att.date === log.date && att.time === log.time && att.type === log.type)
        if(index != -1){
          const response = await saveLogs(log)
          if(response.data.status){
            log.upload_status = 1
            sessionStore.saveLog(log)
            attlogs.value[index] = log
          }
        }
      })
    )
    loader.hide()
}


</script>

<style scoped>
.home {
  padding: 2rem;
  text-align: center;
}

h1 {
  font-size: 2rem;
  color: #42b983;
}
</style>
