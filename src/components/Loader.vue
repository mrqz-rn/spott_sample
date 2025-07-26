<template>
    <transition name="popup">
        <div v-if="loader.visible"
            class="fixed inset-0 bg-black/35 backdrop-invert backdrop-opacity-10 flex items-center justify-center z-[900]">
            <div class="bg-white p-6 rounded-lg flex flex-col items-center shadow-lg">
                <div class="flex flex-col items-center">
                    <div class="loader mb-3"></div>
                    <p class="text-gray-600 text-sm text-center">{{ loader.message }}</p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { loader } from '@/stores/loaderStore'
</script>


<style scoped>
.loader {
  border: 4px solid #e5e7eb;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;
}
.popup-enter-active,
.popup-leave-active {
  transition: all 0.25s ease;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>