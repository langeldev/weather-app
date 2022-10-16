<template>
  <component
    :is="iconComponent"
    :size="size"
    role="img"
  />
</template>

<script>
import SunIcon from './icons/SunIcon.vue'
import MoonIcon from './icons/MoonIcon.vue'
import CloudIcon from './icons/CloudIcon.vue'
import FewCloudsIcon from './icons/FewCloudsIcon.vue'
import FewCloudsNightIcon from './icons/FewCloudsNightIcon.vue'
import OvercastCloudsIcon from './icons/OvercastCloudsIcon.vue'
import ShowerRainIcon from './icons/ShowerRainIcon.vue'
import RainIcon from './icons/RainIcon.vue'
import ThunderIcon from './icons/ThunderIcon.vue'
import SnowIcon from './icons/SnowIcon.vue'
import FogIcon from './icons/FogIcon.vue'

// icon list by https://openweathermap.org/weather-conditions
const icons = {
    icon_01d: SunIcon,
    icon_01n: MoonIcon,
    icon_02d: FewCloudsIcon,
    icon_02n: FewCloudsNightIcon,
    icon_03d: CloudIcon,
    icon_03n: CloudIcon,
    icon_04d: OvercastCloudsIcon,
    icon_04n: OvercastCloudsIcon,
    icon_09d: ShowerRainIcon,
    icon_09n: ShowerRainIcon,
    icon_10d: RainIcon,
    icon_10n: RainIcon,
    icon_11d: ThunderIcon,
    icon_11n: ThunderIcon,
    icon_13d: SnowIcon,
    icon_13n: SnowIcon,
    icon_50d: FogIcon,
    icon_50n: FogIcon
  // ...
}

export default {
  props: {
    size: Number,
    name: {
      type: String,
      validator(value) {
        return Object.prototype.hasOwnProperty.call(icons,'icon_' + value)
      }
    }
  },

  computed: {
    iconComponent() {
      return icons['icon_' + this.name]
    }
  }
}
</script>
