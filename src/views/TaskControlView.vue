<script setup>
import { ref } from 'vue'

const tasks = ref({
    todo: [],
    processing: [],
    done: []
})

const newTask = ref('')

const addTask = () => {
    if (newTask.value.trim()) {
        tasks.value.todo.push(newTask.value.trim())
        newTask.value = ''
    }
}

const deleteTask = (task, list) => {
    const index = tasks.value[list].indexOf(task)
    if (index !== -1) {
        tasks.value[list].splice(index, 1)
    }
}

const onDragStart = (event, task, fromList) => {
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('task', task)
    event.dataTransfer.setData('fromList', fromList)
}

const onDrop = (event, toList) => {
    const task = event.dataTransfer.getData('task')
    const fromList = event.dataTransfer.getData('fromList')

    if (fromList !== toList) {
        deleteTask(task, fromList)
        tasks.value[toList].push(task)
    }
}
</script>
<template>
    <div class="container mx-auto p-4 boder-box">
        <div class="px-5 py-2 border border-green-500 border-solid rounded-lg inline-block mb-3">
            <p class="text-sm font-bold">Usage</p>
            <ul class="list-image-[url('@/assets/img/check.png')] list-inside ms-2 mt-2">
                <li>Vue 3</li>
            </ul>
        </div>
        <h1 class="text-2xl font-bold mb-4">Task Management System</h1>
        <div class="mb-4">
            <input v-model="newTask" @keyup.enter="addTask" class="border border-gray-300 rounded px-2 py-1 mr-2"
                placeholder="New task" />
            <button @click="addTask" class="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
                Add Task
            </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="(taskList, status) in tasks" :key="status"
                class="border-2 border-solid border-green-400 rounded p-4 overflow-y-auto h-96" @dragover.prevent
                @drop="onDrop($event, status)">
                <h3 class="font-bold tracking-wider mb-2 capitalize">{{ status }}</h3>
                <ul>
                    <li v-for="(task, index) in taskList" :key="index" class="mb-2 p-2 bg-gray-100 rounded cursor-move"
                        draggable="true" @dragstart="onDragStart($event, task, status)">
                        <div class="flex items-center">
                            <span class="mr-2 flex-grow task-text">{{ task }}</span>
                            <button @click="deleteTask(task, status)"
                                class="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600 flex-shrink-0">
                                ×
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.task-text {
    overflow-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
    min-width: 0;
}
</style>