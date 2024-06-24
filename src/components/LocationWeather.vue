<script setup>
import { ref, computed, defineExpose } from 'vue'

const props = defineProps({
    locationData: {
        type: Object,
        required: true
    }
})

const expandedDay = ref(null)

const weatherElements = computed(() => props.locationData.weatherElement || [])

const forecastDays = computed(() => {
    const wxElement = weatherElements.value.find(e => e.elementName === 'Wx')
    if (!wxElement || !wxElement.time) return []

    const groupedDays = wxElement.time.reduce((acc, curr) => {
        if (!curr.startTime) return acc

        const date = curr.startTime.split(' ')[0]
        if (!acc[date]) {
            acc[date] = { date, day: null, night: null }
        }
        if (curr.startTime.includes('06:00')) {
            acc[date].day = curr
        } else if (curr.startTime.includes('18:00')) {
            acc[date].night = curr
        }
        return acc
    }, {})

    return Object.values(groupedDays)
})

const toggleExpand = (index) => {
    expandedDay.value = expandedDay.value === index ? null : index
}

const getWeatherIcon = (weather) => {
    if (weather.includes('晴')) return '☀️'
    if (weather.includes('雨')) return '🌧️'
    if (weather.includes('多雲') || weather.includes('陰')) return '☁️'
    return '🌤️'
}

const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-TW', { weekday: 'short', month: 'short', day: 'numeric' })
}

const getElementDescription = (elementName) => {
    const descriptions = {
        Wx: '天氣狀況',
        PoP12h: '降雨機率',
        T: '平均溫度',
        RH: '相對濕度',
        MinCI: '最小舒適度指數',
        MaxCI: '最大舒適度指數',
        MinT: '最低溫度',
        MaxT: '最高體感溫度',
        UVI: '紫外線指數',
        WS: '最大風速',
        WD: '風向',
        MaxAT: '最高溫',
        WeatherDescription: '天氣概述',
        MinAT: '最低體感溫度'
    }
    return descriptions[elementName] || elementName
}

const getElementValue = (timeData, elementName) => {
    if (!timeData || !timeData.startTime) return '無資料'

    const element = weatherElements.value.find(e => e.elementName === elementName)
    if (!element || !element.time) return '無資料'

    const matchingTimeData = element.time.find(t =>
        t.startTime && t.startTime.split(' ')[0] === timeData.startTime.split(' ')[0] &&
        t.startTime.includes(timeData.startTime.split(' ')[1].substr(0, 5))
    )

    if (!matchingTimeData || !matchingTimeData.elementValue || matchingTimeData.elementValue.length === 0) return '無資料'

    const value = matchingTimeData.elementValue[0].value
    const measure = matchingTimeData.elementValue[0].measures

    if (elementName === 'PoP12h') {
        return value && value.trim() ? `${value}%` : '無資料'
    }
    if (['MinT', 'MaxT', 'T'].includes(elementName)) {
        return value ? `${value}°C` : '無資料'
    }
    if (elementName === 'RH') {
        return value ? `${value}%` : '無資料'
    }
    if (elementName === 'UVI') {
        return value ? `${value} (${matchingTimeData.elementValue[1]?.value || ''})` : '無資料'
    }

    return value && measure ? `${value} ${measure}` : '無資料'
}

const getWeatherDescription = (timeData) => {
    return getElementValue(timeData, 'Wx')
}

const getAverageTemperature = (timeData) => {
    const minT = parseFloat(getElementValue(timeData, 'MinT').replace('°C', ''))
    const maxT = parseFloat(getElementValue(timeData, 'MaxT').replace('°C', ''))
    if (isNaN(minT) || isNaN(maxT)) return '無資料'
    return Math.round((minT + maxT) / 2)
}

// 明確地暴露需要在模板中使用的函數
defineExpose({
    expandedDay,
    forecastDays,
    toggleExpand,
    getWeatherIcon,
    formatDate,
    getElementDescription,
    getElementValue,
    getWeatherDescription,
    getAverageTemperature
})
</script>

<template>
    <div class="w-1/2 border-box p-2">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <h2 class="text-2xl font-semibold p-4 bg-green-500 text-white">
                {{ locationData.locationName }}
            </h2>
            <div v-for="(day, dayIndex) in forecastDays" :key="dayIndex" class="border-t">
                <div class="p-4 cursor-pointer hover:bg-gray-100" @click="toggleExpand(dayIndex)">
                    <div class="flex justify-between items-center">
                        <span class="text-lg font-medium">{{ formatDate(day.date) }}</span>
                        <div class="flex space-x-4">
                            <div v-if="day.day" class="flex items-center">
                                <span class="weather-icon">{{ getWeatherIcon(getWeatherDescription(day.day)) }}</span>
                                <span>白天: {{ getAverageTemperature(day.day) }}</span>
                            </div>
                            <div v-if="day.night" class="flex items-center">
                                <span class="weather-icon">{{ getWeatherIcon(getWeatherDescription(day.night)) }}</span>
                                <span>晚上: {{ getAverageTemperature(day.night) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="expandedDay === dayIndex" class="p-4 bg-gray-50 grid grid-cols-2 gap-4">
                    <div v-if="day.day">
                        <h3 class="font-semibold mb-2">白天</h3>
                        <div v-for="element in weatherElements" :key="element.elementName" class="mb-2">
                            <strong>{{ getElementDescription(element.elementName) }}:</strong>
                            {{ getElementValue(day.day, element.elementName) }}
                        </div>
                    </div>
                    <div v-if="day.night">
                        <h3 class="font-semibold mb-2">晚上</h3>
                        <div v-for="element in weatherElements" :key="element.elementName" class="mb-2">
                            <strong>{{ getElementDescription(element.elementName) }}:</strong>
                            {{ getElementValue(day.night, element.elementName) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.weather-icon {
    font-size: 1.5em;
    margin-right: 0.5em;
}
</style>