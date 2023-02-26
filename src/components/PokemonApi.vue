<script setup lang="ts">
import { ref } from 'vue'
import { PokemonClient, type Pokemon } from 'pokenode-ts'


const name = ref('')
let pokemon = ref<
    Pokemon | undefined
>(undefined)
async function getPokemonName() {
    const api = new PokemonClient()
    await api
        .getPokemonByName(name.value.toLowerCase())
        .then((data) => pokemon.value = data) // will output "Luxray"
        .catch((error) => console.error(error))
}
</script>
<template>
    <div class="grid grid-cols-5 gap-4">
        <input
            class="col-span-4 block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50
                                                                            focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                                                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            @keypress.enter="getPokemonName" type="text" placeholder="Enter Pokémon name" v-model="name">
        <button
            class="p-2.5 ml-2 text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            @click="getPokemonName">Get Pokemon</button>
        <div v-if="!pokemon">loading</div>
        <div v-else>
            <p>{{ pokemon.name }}</p>
            <img :src="pokemon.sprites.front_shiny_female ?? pokemon.sprites.front_shiny ?? undefined" alt="">
        </div>
    </div>
</template>
<style></style>
