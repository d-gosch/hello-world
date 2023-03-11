<script setup lang="ts">
import { pokemonStore } from '@/stores/counter';
import { PokemonClient, type LocationAreaEncounter, type Type } from 'pokenode-ts';
import { computed, ref, watch } from 'vue';

import PokemonEncounterLocations from './PokemonEncounterLocations.vue';

const encounterLocations = ref<LocationAreaEncounter[] | undefined>()
const api = new PokemonClient({ cacheOptions: { maxAge: 5000, exclude: { query: false } } })
const showEncounterDetail = ref(false)
const toggleEncounterDetail = computed(() => {
    return showEncounterDetail.value
        ? true
        : false
})
async function getLocation() {
    pokemonStore.value ? await api.getPokemonLocationAreaById(pokemonStore.value.id)
        .then((data) => encounterLocations.value = data)
        .catch((error) => console.log(error)) : 'No Location yet!'
}


watch(pokemonStore, getLocation)



</script>
<template>
    <div v-if="pokemonStore" class="w-6/12">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> #{{ pokemonStore.id }} {{
            pokemonStore.name }}</h5>

        <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            :src="pokemonStore.sprites.front_default ?? undefined" :alt="pokemonStore.name">

        <div class="flex flex-col justify-between p-4 leading-normal">

            <div class="grid grid-4 text-sm font-medium text-gray-900 dark:text-white">
                <p class="text-lg underline font-bold">Type:</p>
                <p v-for="pokemonType in pokemonStore.types">
                    {{ pokemonType?.type.name }}&nbsp;
                </p>
            </div>
            <div class="text-sm font-medium text-gray-900 dark:text-white">
                <button class="text-lg underline font-bold" @click="showEncounterDetail = !showEncounterDetail">Encounter
                    location:</button>
                <div v-if="toggleEncounterDetail" class="grid grid-cols-3 gap-4">
                    <div v-for="encounterLocation in encounterLocations" :key="encounterLocation.location_area.name">
                        <PokemonEncounterLocations :location-name="encounterLocation.location_area.name" />
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-4 text-sm font-medium text-gray-900 dark:text-white">
                <p class="text-lg underline font-bold">Base Stats:</p>
                <div class="col-span-2 grid grid-cols-3 gap-4">
                    <div v-for="baseStat in pokemonStore.stats">
                        <span>{{ baseStat.stat.name }}</span>
                        <span>{{ baseStat.base_stat }}</span>
                    </div>
                </div>
            </div>
            <div class="text-sm font-medium text-gray-900 dark:text-white">
                <p class="text-lg underline font-bold">Base experience:</p>
                <div>{{ pokemonStore.base_experience }} </div>
            </div>
        </div>
    </div>
</template>
<style></style>