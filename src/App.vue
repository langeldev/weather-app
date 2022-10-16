<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, computed, onMounted } from "vue";
import LocationTools from "./components/LocationTools.vue";
import DarkMode from "./components/DarkMode.vue";
import CurrentWeather from "./components/CurrentWeather.vue";
import Forecast from "./components/ForecastList.vue";

const weather = ref({})
const forecast = ref([])
const stateNavigator = ref(0)

const year = computed(() => new Date().getFullYear())

const name = computed(() => `${weather.value.name}, ${weather.value.sys.country}`)
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
  <div class="min-h-screen flex flex-col max-w-5xl mx-auto p-4">
    <header class="flex justify-between pb-8">
      <LocationTools
      @get-coords="getLocation"
      @search="locationBySearch"
      />
      <DarkMode />
    </header>
    <main class="flex flex-grow md:justify-center">
      <div class="flex flex-col sm:flex-row w-full gap-4" v-if="weather && forecast.length > 0">
       <div class="w-full sm:w-7/12 md:w-6/12"  >
          <CurrentWeather
              :name="name"
              :country="weather.sys.country"
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
        <div class="w-full sm:w-5/12 md:w-6/12 mt-8 sm:mt-0">
          <Forecast :forecast="forecast"/>
        </div>
      </div>
      <div v-else class="sm:w-5/12 flex items-center justify-center rounded-md sm:ml-8 mr-auto text-center text-xl text-sky-400 bg-[rgba(251,252,251,.8)] dark:bg-[rgba(55,68,74,.8)] shadow-[0_10px_30px_-12px_rgba(7,89,133,0.45)]">
          <span v-if="stateNavigator">Geolocation not allowed</span>
          <span v-else>Loading....</span>
      </div>
    </main>
    <footer class="flex justify-between p-4 mt-2 dark:text-sky-400">
      &copy; by langeldev {{year}}
      <a href="#">
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
