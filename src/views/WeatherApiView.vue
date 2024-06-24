<template>
    <div class="container mx-auto p-4 boder-box">
        <div class="px-5 py-2 border border-green-500 border-solid rounded-lg inline-block mb-3">
            <p class="text-sm font-bold">Usage</p>
            <ul class="list-image-[url('@/assets/img/check.png')] list-inside ms-2 mt-2">
                <li>Vue 3</li>
                <li>Goverment Open API for weather data</li>
                <li>D3.js for Taiwan map</li>
                <li>topojson for topogeojson to geojson</li>
            </ul>
        </div>
        <h1 class="text-3xl font-bold mb-6 text-center">Weather API</h1>
        <div v-if="isLoading" class="text-center py-10">
            載入中...
        </div>
        <div v-else-if="error" class="text-center py-10 text-red-500">
            {{ error }}
        </div>
        <div v-else class="flex flex-wrap">
            <LocationWeather v-for="location in weatherData" :key="location.locationName" :locationData="location" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LocationWeather from '@/components/LocationWeather.vue'

const weatherData = ref([])
const isLoading = ref(true)
const error = ref(null)

onMounted(() => {
    fetch('https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWA-90786739-5827-4B49-BBF7-CAC0CBD251DF&format=JSON')
        .then(res => res.json())
        .then(data => {
            weatherData.value = data.records.locations[0].location
            isLoading.value = false
        })
        .catch(err => {
            console.error('Failed to fetch weather data:', err)
            error.value = '無法載入天氣數據'
            isLoading.value = false
        })
})
</script>

<style scoped>
.weather-icon {
  display: inline-block;
  transition: transform 0.3s ease;
}

.weather-icon:hover {
  transform: scale(1.2);
}
</style>