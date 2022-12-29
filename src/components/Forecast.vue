<script setup>
import BaseIcons from './BaseIcons.vue'
import {getWeekDay} from '../utils'
defineProps({
  dt_txt: String,
  icon: String,
  description: String,
  temp_max: Number,
  temp_min: Number
});
</script>

<template>
<div class="min-w-[50%] md:min-w-[25%] lg:min-w-[25%] flex grow flex-col items-center p-2 ">
        {{getWeekDay(dt_txt)}}
        <BaseIcons :name="icon" :size="64" />
        <span class="text-center w-full sm:w-[5rem] lg:w-[4.2rem] grow">{{description}}</span>
       <span class="font-roboto">
        {{temp_max}}&deg;/{{temp_min}}&deg;
       </span>
</div>
</template>
