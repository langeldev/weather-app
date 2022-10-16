<script setup>
import Forecast from "./Forecast.vue";
defineProps({forecast: Array});
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const getDay = (d) => {
    return weekday[new Date(d).getDay()]
}
function rounded(value) {
  return Math.round(value)
}
</script>
<template>
  <div
    class="w-full p-4 bg-[rgba(251,252,251,.2)] font-medium text-sky-800 dark:text-sky-400 dark:bg-[rgba(55,68,74,.5)]  shadow-[0_10px_30px_-12px_rgba(7,89,133,0.45)] rounded-md"
  >
    <div
      class="flex flex-wrap rounded-md bg-[rgba(251,252,251,.6)] dark:bg-[rgba(55,68,74,.8)] overflow-hidden shadow-[0_10px_30px_-12px_rgba(7,89,133,0.45)]"
    >
      <Forecast
        :dt_txt="getDay(item.dt_txt)"
        :icon="item.weather[0].icon"
        :description="item.weather[0].description"
        :temp_max="rounded(item.main.temp_max)"
        :temp_min="rounded(item.main.temp_min)"
        v-for="(item, index ) in forecast"
        :key="index" />
    </div>
  </div>
</template>
