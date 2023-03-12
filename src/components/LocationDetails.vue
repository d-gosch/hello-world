<script setup lang="ts">

const props = defineProps({ location: String })
const emit = defineEmits(['location'])
</script>
<template>
    <div>
        <h1 class="text-3xl dark:text-white">Location Details Page</h1>
        <div>{{ props.location }}</div>
        <button class="bg-gray-500 hover:bg-gray-700 text-black text-xl py-2 px-4 rounded-full"
            @click="emit('location', null)">close</button>
    </div>
</template>
