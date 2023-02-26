<script setup lang="ts">
import Tile from "../components/Tile.vue"
import { reactive } from 'vue'
const tiles = reactive([
    { title: 'Pokémon', description: 'Messing around with pokeapi', routerLink: '/pokemon' },
    { title: 'test', description: 'duno', routerLink: '/' },
    { title: 'foo', description: 'Todo', routerLink: '/' },
    { title: 'bar', description: 'i dont know', routerLink: '/' }])
</script>
<template>
    <div class="w-full">
        <div class="grid grid-cols-3 gap-4">
            <Tile
                class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                v-for="tile in tiles" :key="tile.title" :router-link="tile.routerLink" :title="tile.title"
                :description="tile.description" />
        </div>
    </div>
</template>