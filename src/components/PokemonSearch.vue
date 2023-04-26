<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PokemonClient, type NamedAPIResource, type NamedAPIResourceList, type Pokemon } from 'pokenode-ts'
import { pokemonStore } from '@/stores/counter';
import router from '@/router';

const name = ref('')
let pokemonNameList = ref([''])

const api = new PokemonClient({ cacheOptions: { maxAge: 5000, exclude: { query: false } } })


async function fetchPokemonList() {
    await api
        .listPokemons(0, 1279)
        .then((data) => pokemonNameList.value = data.results.flatMap((pokemon) => pokemon.name))
        .catch((error) => console.log(error))
}
onMounted(() => {
    fetchPokemonList() // Load all pokemon names with reference
})
function submit() {
    router.push(`pokemon/${name.value}`)
}
</script>

<template>
    <div class="grid grid-cols-12 gap-4">
        <input
            class=" text-zinc-50 col-span-10 block w-full p-4 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            list="pokemonNameData" @keypress.enter="submit" v-model="name">
        <datalist id="pokemonNameData">
            <option v-for="pokemonName in pokemonNameList" :key="pokemonName" :value="pokemonName" />
        </datalist>

        <router-link :to="name"
            class="col-span-2 text-center p-4 text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Get
            Pokemon</router-link>


    </div>
</template>
<style></style>