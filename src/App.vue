<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <div class="flex w-full">
    <header class="w-1/5 box-border">
      <nav class="flex flex-col mt-3 me-5">
        <RouterLink to="/" class="nav-link mb-2" active-class="bg-green-500 text-white mb-2">Home</RouterLink>
        <RouterLink to="/todoList" class="nav-link mb-2" active-class="bg-green-500 text-white">Todo list</RouterLink>
        <RouterLink to="/WeatherApi" class="nav-link mb-2" active-class="bg-green-500 text-white">WeatherApi
        </RouterLink>
        <RouterLink to="/TaskControl" class="nav-link mb-2" active-class="bg-green-500 text-white">TaskControl
        </RouterLink>
        <RouterLink to="/Exam" class="nav-link mb-2" active-class="bg-green-500 text-white">Exam</RouterLink>
        <RouterLink to="/Shop" class="nav-link mb-2" active-class="bg-green-500 text-white">Shop / Cart
        </RouterLink>
      </nav>
    </header>
    <RouterView class="w-4/5 box-border flex-grow-2"/>
  </div>
</template>
<style scoped>
.nav-link {
  @apply p-2 rounded transition-colors duration-200 ease-in-out;
}

.nav-link:hover {
  @apply bg-green-500 text-white;
}
</style>