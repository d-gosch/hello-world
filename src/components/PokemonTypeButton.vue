<script setup lang="ts">
import type { PokemonType } from 'pokenode-ts';
import type { PropType } from 'vue';

const props = defineProps({
    pokemonType: { required: true, type: Object as PropType<PokemonType> }
})
</script>
<template>
    <router-link to="pokemonType"
        class="p-1 m-2 dark:hover:bg-green-700 dark:hover:text-white dark:hover:rounded-lg dark:rounded-lg">
        <span>{{ pokemonType.type.name }}</span>

    </router-link>
</template>
