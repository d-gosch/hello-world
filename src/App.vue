<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import PokemonApi from './components/PokemonApi.vue'
</script>

<template>
  <p>Hello World!</p>
  <PokemonApi RouterView="pokemon" />
</template>

<style scoped></style>
