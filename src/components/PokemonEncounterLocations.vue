<script setup lang="ts">
import type { LocationArea } from 'pokenode-ts';
import type { PropType } from 'vue';

const props = defineProps({
    location: { required: true, type: Object as PropType<LocationArea> }
})

</script>
<template>
    <button>
        <div v-for="encounterLocation in location.names">
            {{ encounterLocation.name }}
        </div>
    </button>
</template>
