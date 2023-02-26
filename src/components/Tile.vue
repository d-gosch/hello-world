<script setup lang="ts">
const props = defineProps({
    title: String,
    description: String,
    routerLink: { required: true, type: String }
})
</script>
<template>
    <RouterLink :to="routerLink">

        <h3 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ title }}</h3>
        <p class="font-normal text-gray-700 dark:text-gray-400">{{ description }}</p>

    </RouterLink>
</template>
<style></style>