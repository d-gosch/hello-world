<script setup lang="ts">
import { reactive } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import PokemonApi from './components/PokemonApi.vue'
import Tile from './components/Tile.vue';
const tiles = reactive([
  { title: 'Pokémon', description: 'Messing around with pokeapi' },
  { title: 'test', description: 'duno' },
  { title: 'foo', description: 'Todo' },
  { title: 'bar', description: 'i dont know' }])
</script>

<template>
  <p>Hello World!</p>
  <PokemonApi RouterView="pokemon" />
  <Tile v-for="tile in tiles" :key="tile.title" :title="tile.title" :description="tile.description" />
</template>

<style scoped></style>
