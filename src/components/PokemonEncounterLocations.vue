<script setup lang="ts">
import { LocationClient, type LocationArea } from 'pokenode-ts';
import { onMounted, ref } from 'vue';

const props = defineProps({ locationName: { required: true, type: String } })
const location = ref<LocationArea | undefined>(undefined)
const api = new LocationClient({ cacheOptions: { maxAge: 5000, exclude: { query: false } } })
async function getEncounterLocations() {
    await api
        .getLocationAreaByName(props.locationName)
        .then((data) => location.value = data)
        .catch((error) => console.error(error))
}
onMounted(() => {
    getEncounterLocations()
})
</script>
<template>
    <div v-if="location">
        <p v-for="encounterLocation in location.names">{{ encounterLocation.name }}</p>
    </div>
    <div v-else>Location not found</div>
</template>
