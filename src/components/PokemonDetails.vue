<script setup lang="ts">
import { pokemonStore } from '@/stores/counter';
import { LocationClient, PokemonClient, type LocationArea, type LocationAreaEncounter, type Type } from 'pokenode-ts';
import { computed, onMounted, ref, watch } from 'vue';

import PokemonEncounterLocations from './PokemonEncounterLocations.vue';
import LocationDetails from './LocationDetails.vue';

const location = ref('')
const api = new PokemonClient({ cacheOptions: { maxAge: 5000, exclude: { query: false } } })
const apiLocationClient = new LocationClient({ cacheOptions: { maxAge: 5000, exclude: { query: false } } })
const locations = ref<LocationArea[] | undefined>(undefined)
const showEncounterDetail = ref(false)
const toggleEncounterDetail = computed(() => {
    return showEncounterDetail.value
        ? true
        : false
})
async function getLocation() {
    pokemonStore.value ? await api.getPokemonLocationAreaById(pokemonStore.value.id)
        .then(async (data) => {
            locations.value = await Promise.all(data.map((location) => apiLocationClient.getLocationAreaByName(location.location_area.name)))
        })
        .catch((error) => console.log(error)) : 'No Location yet!'
}


watch(pokemonStore, getLocation)
onMounted(() => {
    getLocation()
})


</script>
<template>
    <div v-if="pokemonStore" class="grid grid-cols-12 gap-4">
        <div class="col-span-4">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> #{{ pokemonStore.id }} {{
                pokemonStore.name }}</h5>

            <img class=" object-contain w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                :src="pokemonStore.sprites.front_default ?? undefined" :alt="pokemonStore.name">

            <div class="flex flex-col justify-between p-4 leading-normal">

                <div class="grid grid-4 text-sm font-medium text-gray-900 dark:text-white">
                    <p class="text-lg underline font-bold">Type:</p>
                    <p v-for="pokemonType in pokemonStore.types">
                        {{ pokemonType?.type.name }}&nbsp;
                    </p>
                </div>
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                    <button class="text-lg underline font-bold"
                        @click="showEncounterDetail = !showEncounterDetail">Encounter
                        location:</button>
                    <div v-if="toggleEncounterDetail" class="flex flex-col items-start">
                        <PokemonEncounterLocations @click="location = encounterLocation.name" v-if="locations?.length"
                            v-for="encounterLocation in locations" :key="encounterLocation.id"
                            :location="encounterLocation" />
                        <div v-else>No locations</div>
                    </div>
                </div>
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                    <p class="text-lg underline font-bold">Base Stats:</p>
                    <div class="col-span-2">

                        <ul v-for="baseStat in pokemonStore.stats">
                            <li>
                                <div class="flex justify-between"><span>{{ baseStat.stat.name }}</span>
                                    <span>{{ baseStat.base_stat }}</span>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                    <p class="text-lg underline font-bold">Base experience:</p>
                    <div>{{ pokemonStore.base_experience }} </div>
                </div>
            </div>
        </div>
        <div class="col-span-8">
            <LocationDetails v-if="location" :location="location" @location="(msg) => location = msg"></LocationDetails>
        </div>
    </div>
</template>
<style></style>