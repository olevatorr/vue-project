<script setup>
import { ref, computed } from 'vue'

const newTodo = ref('')
const todos = ref([])
let nextId = 0

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: nextId++,
      text: newTodo.value,
      completed: false
    })
    newTodo.value = ''
  }
}

const sortedTodos = computed(() => {
  return [...todos.value].sort((a, b) => {
    if (a.completed === b.completed) return 0
    return a.completed ? 1 : -1
  })
})

const toggleTodo = (todo) => {
  todo.completed = !todo.completed
}

const removeTodo = (todoToRemove) => {
  const index = todos.value.findIndex(todo => todo.id === todoToRemove.id)
  if (index !== -1) {
    todos.value.splice(index, 1)
  }
}
</script>
<template>
  <section class="mx-auto p-4 w-full">
    <h2 class="text-2xl font-bold mb-4">Todo List</h2>
    <input 
      v-model="newTodo" 
      @keyup.enter="addTodo" 
      placeholder="新增待辦事項"
      class="w-full h-10 px-3 mb-4 text-lg border-2 border-gray-300 rounded focus:outline-none focus:border-green-500 transition duration-300"
    >
    <ul class="space-y-3">
      <li 
        v-for="(todo) in sortedTodos" 
        :key="todo.id"
        class="flex items-center text-green-700 [counter-increment:todo]"
      >
        <span class="mr-2 text-lg [content:counter(todo)'.']"></span>
        <input 
          type="checkbox" 
          :checked="todo.completed" 
          @change="toggleTodo(todo)"
          class="w-5 h-5 mr-3"
        >
        <span 
          :class="{ 'line-through text-gray-500': todo.completed }"
          class="flex-grow text-lg"
        >{{ todo.text }}</span>
        <button 
          @click="removeTodo(todo)"
          class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
        >删除</button>
      </li>
    </ul>
  </section>
</template>