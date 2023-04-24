<script setup lang="ts">
import type { LocationArea } from 'pokenode-ts';
import type { PropType } from 'vue';

const props = defineProps({
    location: { required: true, type: Object as PropType<LocationArea> }
})

</script>
<template>
    <button
        class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-green-700 dark:hover:text-white dark:hover:bg-green-700">
        <div v-for="encounterLocation in location.names">
            <span>{{ encounterLocation.name }}</span>
        </div>

    </button>
</template>
