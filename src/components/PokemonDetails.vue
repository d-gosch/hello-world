<script setup lang="ts">
import { pokemonStore } from '@/stores/counter';
import { PokemonClient, type LocationAreaEncounter } from 'pokenode-ts';
import { computed, onMounted, ref, watch } from 'vue';

const encounterLocations = ref<LocationAreaEncounter[] | undefined>()
const api = new PokemonClient({ cacheOptions: { maxAge: 5000, exclude: { query: false } } })

async function name() {
    pokemonStore.value ? await api.getPokemonLocationAreaById(pokemonStore.value.id)
        .then((data) => encounterLocations.value = data)
        .catch((error) => console.log(error)) : 'No Location yet!'
}

watch(pokemonStore, name)


</script>
<template>
    <div v-if="pokemonStore"
        class="grid grid-cols-5 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            :src="pokemonStore.sprites.front_default ?? undefined" alt="">
        <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> #{{ pokemonStore.id }} {{
                pokemonStore.name }}</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
            <span class="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                <span class="flex w-2.5 h-2.5 bg-blue-600 rounded-full mr-1.5 flex-shrink-0"></span>Type: &nbsp;<span
                    v-for="pokemonType in pokemonStore.types">{{
                        pokemonType.type.name }}&nbsp;</span></span>
            <span class="flex items-center text-sm font-medium text-gray-900 dark:text-white"><span
                    class="flex w-2.5 h-2.5 bg-purple-500 rounded-full mr-1.5 flex-shrink-0"></span>Encounter: &nbsp;
                <ul>
                    <li v-for="encounterLocation in encounterLocations" :key="encounterLocation.location_area.name">{{
                        encounterLocation.location_area.name }}</li>
                </ul>
            </span>
            <span class="flex items-center text-sm font-medium text-gray-900 dark:text-white"><span
                    class="flex w-2.5 h-2.5 bg-indigo-500 rounded-full mr-1.5 flex-shrink-0"></span>Base Stats: &nbsp;
                <ul>
                    <li v-for="baseStat in pokemonStore.stats">{{ baseStat.stat.name }} {{ baseStat.base_stat }}
                        &nbsp;</li>
                </ul>
            </span>
            <span class="flex items-center text-sm font-medium text-gray-900 dark:text-white"><span
                    class="flex w-2.5 h-2.5 bg-teal-500 rounded-full mr-1.5 flex-shrink-0"></span>Base experience: &nbsp;{{
                        pokemonStore.base_experience }}</span>
        </div>
    </div>
</template>

<style></style>