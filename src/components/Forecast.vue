<script setup>
import BaseIcons from './BaseIcons.vue'
defineProps({
  dt_txt: String,
  icon: String,
  description: String,
  temp_max: Number,
  temp_min: Number
});


</script>

<template>
<div class="min-w-[5rem] grow flex flex-col justify-center items-center p-2">
        {{dt_txt}}
        <BaseIcons :name="icon" :size="64" />
        <span>{{description}}</span>
       <span class="font-roboto">
        {{temp_max}}&deg;/{{temp_min}}&deg;
       </span>
</div>
</template>
