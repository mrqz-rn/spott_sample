import { reactive } from 'vue'

export const alertmodal = reactive({
  visible: false,
  title: '',
  message: '',

  show(title: string, message: string) {
    alertmodal.title = title
    alertmodal.message = message
    alertmodal.visible = true
  },

  hide() {
    alertmodal.visible = false
    alertmodal.title = ''
    alertmodal.message = ''
  },
})
