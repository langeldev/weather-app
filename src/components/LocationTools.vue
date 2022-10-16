<script setup>
  import { ref, defineEmits } from 'vue'
  const citySearch = ref('')

  const emit = defineEmits(['getCoords', 'search'])

  const handleSearch = () => {
    emit('search', citySearch.value.trim())
    citySearch.value = '';
  }

  const handleClick = () => {
    emit('getCoords')
  }
</script>
<template>
  <div class="w-full sm:w-6/12 md:w-12/12 h-[48px] px-4 relative">
    <button
      @click.prevent="handleClick"
      type="button"
      aria-label="focus"
      class="h-[48px] w-1/12 float-right absolute right-6"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="26"
        height="26"
        class="fill-current text-sky-800 dark:text-lime-50"
      >
        <path
          d="M12,8C14.21,8 16,9.79 16,12C16,14.21 14.21,16 12,16C9.79,16 8,14.21 8,12C8,9.79 9.79,8 12,8M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5C8.13,5 5,8.13 5,12C5,15.87 8.13,19 12,19C15.87,19 19,15.87 19,12C19,8.13 15.87,5 12,5Z"
        />
      </svg>
    </button>
    <input
      v-model="citySearch"
      @keydown.enter="handleSearch"
      type="text"
      placeholder="Search..."
      class="p-3
          w-full
          border-none
        bg-[rgba(251,252,251,.8)]
        dark:bg-[#37444A]
        rounded-full
        px-3
        text-[18px]
      text-sky-800
      dark:text-lime-50
      placeholder:text-sky-800
      dark:placeholder:text-lime-50
       border
      border-gray-300
      focus:ring-blue-300
        pl-6"
    />
  </div>

</template>
