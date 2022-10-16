<script setup>
import Forecast from "./Forecast.vue";
defineProps({forecast: Array});
</script>
<template>
  <div
    class="w-full p-4 bg-[rgba(251,252,251,.2)] text-sky-600 dark:text-lime-50 dark:bg-[rgba(55,68,74,.5)]  shadow-[0_10px_30px_-12px_rgba(7,89,133,0.45)] rounded-md"
  >
    <div
      class="flex flex-wrap rounded-md bg-[rgba(251,252,251,.6)] dark:bg-[rgba(55,68,74,.8)] overflow-hidden shadow-[0_10px_30px_-12px_rgba(7,89,133,0.45)]"
    >
      <Forecast
        :dt_txt="item.dt_txt"
        :description="item.weather[0].description"
        :temp_max="item.main.temp_max"
        :temp_min="item.main.temp_min"
        v-for="(item, index ) in forecast"
        :key="index" />
    </div>
  </div>
</template>
