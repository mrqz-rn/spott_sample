import { reactive } from 'vue'

export const loader = reactive({
  visible: false,
  message: 'Loading...',

  show(msg = 'Loading...') {
    loader.message = msg
    loader.visible = true
  },

  hide() {
    loader.visible = false
    loader.message = ''
  },
})
