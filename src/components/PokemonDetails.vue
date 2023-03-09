<script setup lang="ts">
import { pokemonStore } from '@/stores/counter';
import { PokemonClient, type LocationAreaEncounter, type Type } from 'pokenode-ts';
import { ref, watch } from 'vue';

const encounterLocations = ref<LocationAreaEncounter[] | undefined>()
const api = new PokemonClient({ cacheOptions: { maxAge: 5000, exclude: { query: false } } })

async function getLocation() {
    pokemonStore.value ? await api.getPokemonLocationAreaById(pokemonStore.value.id)
        .then((data) => encounterLocations.value = data)
        .catch((error) => console.log(error)) : 'No Location yet!'
}


watch(pokemonStore, getLocation)



</script>
<template>
    <div v-if="pokemonStore">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> #{{ pokemonStore.id }} {{
            pokemonStore.name }}</h5>

        <div class="flex grid grid-cols-5 flex-col justify-between p-4 leading-normal">
            <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                :src="pokemonStore.sprites.front_default ?? undefined" :alt="pokemonStore.name">
            <span class="flex text-sm font-medium text-gray-900 dark:text-white"><span class="text-lg">
                    Type: &nbsp;</span><span v-for="pokemonType in pokemonStore.types">
                    {{ pokemonType?.type.name }}&nbsp;
                </span></span>
            <span class=" flex text-sm font-medium text-gray-900 dark:text-white"><span class="text-lg">Encounter:
                    &nbsp;</span>
                <ul>
                    <li v-for="encounterLocation in encounterLocations" :key="encounterLocation.location_area.name">{{
                        encounterLocation.location_area.name }}</li>
                </ul>
            </span>
            <span class="flex text-sm font-medium text-gray-900 dark:text-white"><span class="text-lg">Base Stats:
                    &nbsp;</span>
                <ul>
                    <li v-for="baseStat in pokemonStore.stats">{{ baseStat.stat.name }} {{ baseStat.base_stat }}
                        &nbsp;</li>
                </ul>
            </span>
            <span class="flex text-sm font-medium text-gray-900 dark:text-white"><span class="text-lg">Base
                    experience: &nbsp;</span>{{
                        pokemonStore.base_experience }}</span>
        </div>
    </div>
</template>

<style></style>