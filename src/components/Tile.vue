<script setup lang="ts">
const props = defineProps({
    title: String,
    description: String
})
</script>
<template>
    <RouterLink to="/pokemon">
    <div class="bg-green-400 text-red-900 font-bold">
        <h3>{{ title }}</h3>
        <h4>{{ description }}</h4>
    </div>
</RouterLink>
</template>
<style></style>