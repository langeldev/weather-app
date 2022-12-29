<script setup>
import { computed } from 'vue'

import BaseIcon from './BaseIcons.vue'
import {rounded} from '../utils'

defineProps({
  name: String,
  main: String,
  icon: String,
  description: String,
  temp: Number,
  temp_max: Number,
  temp_min: Number,
  feels_like: Number,
  sunrise: Number,
  sunset: Number,
  humidity: Number,
  wind_speed:Number,
  cloudiness: Number
})


 const date = computed(() => new Date().toDateString())



</script>
<template>
  <div class="px-2 w-full text-sky-800 dark:text-sky-400 font-semibold text-md flex-wrap">
    <div
      class="flex flex-col p-4 rounded-md sm:ml-4 relative bg-[rgba(251,252,251,.8)] dark:bg-[rgba(55,68,74,.8)] shadow-[0_10px_30px_-12px_rgba(7,89,133,0.45)]"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 14 20" class="fill-current  absolute top-6">
        <path d="M7 0C3.13 0 0 3.13 0 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5C5.62 9.5 4.5 8.38 4.5 7S5.62 4.5 7 4.5 9.5 5.62 9.5 7 8.38 9.5 7 9.5z"></path>
      </svg>
      <h1 class="font-black text-3xl  pl-8 text-ellipsis overflow-hidden break-world font-roboto">
        {{name}}
      </h1>
      <h2 class=" dark:text-lime-50 font-bold pl-8 mb-3">
        {{date}}
      </h2>
      <div class="text-center my-6 flex flex-wrap">
        <div
          class="text-center w-10/12 mx-auto text-xl font-normal  flex justify-between align-middle"
        >
          <div>
            <BaseIcon :name="icon" :size="88" />
          </div>
          <div class="my-auto text-left ml-2">
            <h3>{{main}}</h3>
            <h4>{{description}}</h4>
          </div>
        </div>
        <div class="text-7xl  mt-8 w-2/3 text-right font-roboto">{{rounded(temp)}}&deg;</div>
        <div class="w-1/3 flex flex-col justify-end items-start pt-9 font-roboto">
          <div class="flex text-yellow-400 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              class="bi bi-arrow-up"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
              />
            </svg>
            <span class="text-xl font-semibold">{{rounded(temp_max)}}&deg;</span>
          </div>
          <div class="flex my-2 text-sky-400 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              class="bi bi-arrow-down"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
              />
            </svg>
            <span class="text-xl font-semibold">{{rounded(temp_min)}}&deg;</span>
          </div>
        </div>
        <div class="text-center w-full text-xl font-normal ">
          Feel Like {{rounded(feels_like)}}º
        </div>
      </div>
          <div class="flex justify-around border-b-2 border-b-sky-200 p-4">
        <div
          class="flex flex-col items-center text-sm font-medium "
        >
          sunrise
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            class="bi bi-sunrise"
            viewBox="0 0 16 16"
          >
            <path
              class="text-yellow-400"
              d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708l1.5-1.5zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7zm3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"
            />
          </svg>

          {{sunrise}}AM
        </div>

        <div
          class="flex flex-col items-center text-sm font-medium "
        >
          sunset
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            class="bi bi-sunset"
            viewBox="0 0 16 16"
          >
            <path
            class="text-yellow-400"
              d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708l1.5 1.5zm-5.303-.51a.5.5 0 0 1 .707 0l1.414 1.413a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .706l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7zm3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"
            />
          </svg>
          {{sunset}}PM
        </div>
      </div>
      <div class="flex text-center justify-center gap-4 my-4">
        <div class="mx-auto flex flex-col items-center ">
          cloudiness
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            class="bi bi-cloud"
            viewBox="0 0 16 16"
          >
            <path
              d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"
            />
          </svg>
          {{rounded(cloudiness)}}%
        </div>
        <div class="mx-auto flex flex-col items-center ">
        humidity
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            class="bi bi-droplet-half"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10c0 0 2.5 1.5 5 .5s5-.5 5-.5c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"
            />
            <path
              fill-rule="evenodd"
              d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z"
            />
          </svg>
        {{humidity}}%
        </div>
        <div class="mx-auto flex flex-col items-center ">
        wind speed
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            class="bi bi-wind"
            viewBox="0 0 16 16"
          >
            <path
              d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z"
            />
          </svg>
          {{rounded(wind_speed)}}km/h
        </div>
      </div>
    </div>
  </div>
</template>
