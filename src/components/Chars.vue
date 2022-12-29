<template>
  <div
    class="mt-8 w-full p-4 bg-[rgba(251,252,251,.2)] font-medium text-sky-800 dark:text-sky-400 dark:bg-[rgba(55,68,74,.5)] shadow-[0_10px_30px_-12px_rgba(7,89,133,0.45)] rounded-md"
  >
    <div
      class="flex justify-center rounded-md bg-[rgba(251,252,251,.6)] dark:bg-[rgba(55,68,74,.8)] shadow-[0_10px_30px_-12px_rgba(7,89,133,0.45)] p-4"
    >
      <LineChart
        :chartData="tempData"
        :options="options"
        style="height: 25vh; width: 80vw"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { computed, defineComponent } from "vue";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { getWeekDay } from  '../utils'

Chart.register(...registerables);
Chart.defaults.font = {
  size: 12,
  family: "'Albert Sans', sans-serif",
  weight: 500,
};

export default defineComponent({
  components: { LineChart },
  props: {
    forecast: {
      type: Array,
    },
  },
  setup(props) {

    const listDay = computed(() => [
      ...props.forecast.map((item) => getWeekDay(item.dt_txt)),
    ]);

    const options = ref({
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          ticks: {
            color: "#51BDF8",
            beginAtZero: true,
          },
        },
        x: {
          ticks: {
            color: "#51BDF8",
            beginAtZero: true,
          },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: '#51BDF8'
          },
        },
        title: {
          display: true,
          text: "Forecast",
          color: "#51BDF8",
        },
      },
    });

    const tempData = computed(() => {
      return {
        labels: listDay.value,
        datasets: [
          {
            type: "line",
            label: "Temperature",
            data: props.forecast.map((item) => Math.round(item.main.temp)),
            radius: 5,
            borderWidth: 4,
            borderColor: ["#E9B02D"],
            backgroundColor: ["white"],
            lineTension: 0.3,
          },
          {
            type: "line",
            label: "Feels like",
            labelFontColor: "red",

            data: props.forecast.map((item) =>
              Math.round(item.main.feels_like)
            ),
            radius: 5,
            borderWidth: 4,
            borderColor: ["#51BDF8"],
            backgroundColor: ["white"],
            lineTension: 0.3,
          },
          {
            type: "bar",
            label: "Precipitation",
            data: props.forecast.map((item) => Math.round(item?.pop * 100)),
            backgroundColor: ["#51BDF852"],
            borderRadius: 8,
          },
        ],
      };
    });
    return { tempData, options };
  },
});
</script>
