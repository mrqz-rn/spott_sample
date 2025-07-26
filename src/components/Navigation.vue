<template>
    <div class="flex items-center justify-center ">
         <nav class="bg-zinc-800 text-white p-2 w-full max-w-lg px-4 items-center ">
            <ul class="flex justify-evenly">
                <li>
                    <router-link :class="{'text-blue-500 font-semibold': $route.path === '/home'}" to="/home">Dashboard</router-link>
                </li>
                <li>
                    <router-link :class="{'text-blue-500 font-semibold': $route.path === '/profile'}" to="/profile">Profile</router-link>
                </li>
                <li>
                    <router-link :class="{'text-blue-500 font-semibold': $route.path === '/settings'}" to="/settings">Settings</router-link>
                </li>
            </ul>
        </nav>
    </div>
   
</template>

<script lang="ts" setup>


</script>