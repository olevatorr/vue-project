<template>
  <div>
    <div class="px-5 py-2 border border-green-500 border-solid rounded-lg inline-block mb-3">
      <p class="text-sm font-bold">Usage</p>
      <ul class="list-image-[url('@/assets/img/check.png')] list-inside ms-2 mt-2">
        <li>Vue 3</li>
        <li>codemirror</li>
      </ul>
    </div>
    <CodeQuiz
      question="請使用map()，將陣列 member = ['eric', 'mandy', 'jack'] 加上年齡[24,32,54]變成陣列物件回傳"
      insert="// member = ['eric', 'mandy', 'jack']
// age=[24,32,54]"
    />
  </div>
</template>

<script setup>
import CodeQuiz from '@/components/CodeQuiz.vue'
</script>
