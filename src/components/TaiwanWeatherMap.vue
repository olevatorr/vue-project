<template>
    <div class="flex">
      <!-- 左側地圖 -->
      <div class="w-1/2 relative">
        <svg viewBox="0 0 400 600" class="w-full">
          <!-- 這裡需要添加台灣地圖的 SVG 路徑 -->
          <path
            v-for="county in counties"
            :key="county.id"
            :d="county.path"
            :fill="selectedCounty === county.id ? '#4299e1' : '#a0aec0'"
            @click="selectCounty(county.id)"
            class="cursor-pointer hover:fill-blue-400 transition-colors duration-300"
          />
          
          <!-- 縣市天氣小視窗 -->
          <g v-for="county in counties" :key="`info-${county.id}`">
            <rect
              :x="county.infoX"
              :y="county.infoY"
              width="60"
              height="30"
              fill="white"
              stroke="#4a5568"
            />
            <text
              :x="county.infoX + 5"
              :y="county.infoY + 15"
              font-size="10"
            >{{ county.name }}</text>
            <text
              :x="county.infoX + 5"
              :y="county.infoY + 28"
              font-size="10"
            >{{ getCountyWeather(county.id) }}</text>
          </g>
        </svg>
      </div>
  
      <!-- 右側天氣詳情 -->
      <div class="w-1/2 p-4">
        <h2 class="text-2xl font-bold mb-4">{{ selectedCountyName }} 天氣詳情</h2>
        <LocationWeather
          v-if="selectedCounty"
          :locationData="getLocationData(selectedCounty)"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import LocationWeather from './LocationWeather.vue'
  
  const props = defineProps({
    weatherData: {
      type: Array,
      required: true
    }
  })
  
  const selectedCounty = ref(null)
  
  const counties = [
    { id: 'taipei', name: '台北市', path: 'M...', infoX: 200, infoY: 100 },
    { id: 'newTaipei', name: '新北市', path: 'M...', infoX: 220, infoY: 120 },
    // 添加其他縣市...
  ]
  
  const selectedCountyName = computed(() => {
    const county = counties.find(c => c.id === selectedCounty.value)
    return county ? county.name : ''
  })
  
  const selectCounty = (countyId) => {
    selectedCounty.value = countyId
  }
  
  const getCountyWeather = (countyId) => {
    const countyData = props.weatherData.find(data => data.locationName.includes(countyId))
    if (!countyData) return '無資料'
  
    const temp = countyData.weatherElement.find(e => e.elementName === 'T')
    const wx = countyData.weatherElement.find(e => e.elementName === 'Wx')
  
    if (!temp || !wx) return '無資料'
  
    const currentTemp = temp.time[0].elementValue[0].value
    const currentWx = wx.time[0].elementValue[0].value
  
    return `${currentTemp}°C ${currentWx}`
  }
  
  const getLocationData = (countyId) => {
    return props.weatherData.find(data => data.locationName.includes(countyId)) || null
  }
  </script>