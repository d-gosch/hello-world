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
    <button @click="getPokemonName">Get Pokemon</button>
    <input type="text" placeholder="enter Pokemon name" v-model="name">
    <div v-if="!pokemon">loading</div>
    <div v-else>
        <p>{{ pokemon.name }}</p>
        <img :src="pokemon.sprites.front_shiny_female ?? pokemon.sprites.front_shiny ?? undefined" alt="">
    </div>
</template>
<style>
p {
    color: aliceblue;
}
</style>
