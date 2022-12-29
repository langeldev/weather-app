<script setup>
import Forecast from "./Forecast.vue";
import {rounded} from '../utils'

defineProps({forecast: Array});

</script>
<template>
  <div
    class="w-full p-4 bg-[rgba(251,252,251,.2)] font-medium text-sky-800 dark:text-sky-400 dark:bg-[rgba(55,68,74,.5)]  shadow-[0_10px_30px_-12px_rgba(7,89,133,0.45)] rounded-md"
  >
    <div
      class="flex flex-wrap rounded-md bg-[rgba(251,252,251,.6)] dark:bg-[rgba(55,68,74,.8)] overflow-hidden shadow-[0_10px_30px_-12px_rgba(7,89,133,0.45)] break-world"
    >
      <Forecast
        :dt_txt="item.dt_txt"
        :icon="item.weather[0].icon"
        :description="item.weather[0].description"
        :temp_max="rounded(item.main.temp_max)"
        :temp_min="rounded(item.main.temp_min)"
        v-for="(item, index ) in forecast"
        :key="index" />
    </div>
  </div>
</template>
