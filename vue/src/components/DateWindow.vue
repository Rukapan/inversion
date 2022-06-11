<template>
  <p class="text-xl sm:text-3xl font-bold">{{ date }}</p>
</template>

<script setup>
const props = defineProps({
  date: String,
})

</script>
