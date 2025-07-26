<template>
      <transition name="popup">
        <div
            v-if="alertmodal.visible"
            class="absolute inset-0 bg-black/35 backdrop-invert backdrop-opacity-10 flex items-center justify-center z-50"
        >
            <div class="bg-white w-80 p-6 rounded-lg shadow-lg text-center space-y-4">
            <h2 class="text-lg font-semibold">{{ alertmodal.title }}</h2>
            <p class="text-sm text-gray-600">{{ alertmodal.message }}</p>
            <button
                @click="alertmodal.hide"
                class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                OK
            </button>
            </div>
        </div>
    </transition>

</template>

<script setup lang="ts">
import { alertmodal } from '@/stores/alertStore';
</script>


<style scoped>
.popup-enter-active,
.popup-leave-active {
  transition: all 0.25s ease;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  /* transform: scale(0.95); */
}
</style>