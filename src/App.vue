<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, computed, onMounted } from "vue";
import LocationTools from "./components/LocationTools.vue";
import DarkMode from "./components/DarkMode.vue";
import CurrentWeather from "./components/CurrentWeather.vue";
import Forecast from "./components/ForecastList.vue";
import Chars from "./components/Chars.vue";

const weather = ref({})
const forecast = ref([])
const stateNavigator = ref(0)

const year = computed(() => new Date().getFullYear())

const name = computed(() => `${weather.value.name}, ${weather.value.sys.country ?? ''}`)
const sunrise =  computed(() => new Date(weather.value.sys.sunrise * 1000).getHours())
const sunset = computed(() => new Date(weather.value.sys.sunset * 1000).getHours())

const weatherLocation = async (location) => {

    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?${location}&appid=${import.meta.env.VITE_API_KEY}&units=metric`;
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?${location}&appid=${import.meta.env.VITE_API_KEY}&units=metric`

    try {
    /**
     * Promise [currentWeather, Forecast]
     */
      const resolve = await Promise.all([
        fetch(urlWeather),
        fetch(urlForecast)
      ])
      if (resolve[0].status == 404 || resolve[1].status == 404) {
        throw 'City no found'
      }
      const data = resolve.map(response => response.json());
      weather.value = await data[0];
      //filter the list index 40/8
      const forecastOrigin = await data[1]
      const forecastDays = filterByIncrement(forecastOrigin.list,  8, 40)

      forecast.value = forecastDays
    } catch(err) {
      console.error(err);
    }
}

const filterByIncrement = (iterable, increment, end) => {
  const iterableLength = iterable.length
  const result = [];
  let index = increment;
  while(index < iterableLength && index < end) {
    result.push(iterable[index])
    index += increment;
  }
  return result;
}

function locationBySearch(query) {
  if (query != ''){
    weatherLocation(`q=${query}`)
  }
}

async function getLocation() {
   if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(pos => {
      const {latitude, longitude} = pos.coords
      weatherLocation(`lat=${latitude}&lon=${longitude}`)
    },
    err => {
      stateNavigator.value = err.code // code 1 User denied Geolocation
    })
   } else  {
    window.alert("Could not get location")
   }
}

onMounted(() => {
  getLocation()
})

</script>

<template>
  <div class="min-h-screen flex flex-col md:max-w-5xl mx-auto p-4 font-albert">
    <header class="flex justify-between pb-8">
      <LocationTools
      @get-coords="getLocation"
      @search="locationBySearch"
      />
      <DarkMode />
    </header>
    <main class="flex flex-grow md:justify-center">
      <div class="flex flex-col sm:flex-row w-full gap-4" v-if="weather && forecast.length > 0">
       <div class="w-full sm:w-6/12 md:w-6/12 grow"  >
          <CurrentWeather
              :name="name"
              :icon="weather.weather[0].icon"
              :temp="weather.main.temp"
              :temp_max="weather.main.temp_max"
              :temp_min="weather.main.temp_min"
              :feels_like="weather.main.feels_like"
              :main="weather.weather[0].main"
              :description="weather.weather[0].description"
              :sunrise="sunrise"
              :sunset="sunset"
              :humidity="weather.main.humidity"
              :wind_speed="weather.wind.speed"
              :cloudiness="weather.clouds.all"
              />
        </div>
        <div class="w-full sm:w-6/12 md:w-6/12 mt-8 sm:mt-0">
          <Forecast :forecast="forecast"/>
          <Chars :forecast="forecast" class="w-full"/>
        </div>
      </div>
          <h2 v-else-if="stateNavigator" class="m-auto text-2xl font-bold text-sky-800 dark:text-sky-400">Geolocation not allowed</h2>
          <div class="text-center m-auto" v-else>
            <div role="status" >
            <svg class="inline mr-2 w-20 h-20 text-[rgba(251,252,251,.8)] animate-spin dark:text-gray-600 fill-sky-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
      </div>
    </main>
    <footer class="flex justify-between p-4 mt-2 dark:text-sky-400">
      &copy; by langeldev {{year}}
      <a href="https://github.com/langeldev/weather-app" target="_blank">
      <span class="dark:text-sky-400">
         GitHub
      </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-github inline dark:text-sky-400"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
          />
        </svg>
      </a>
    </footer>
  </div>
</template>

<style>


</style>
