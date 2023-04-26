<script setup lang="ts">
import PokemonSearch from "../components/PokemonSearch.vue"
import PokemonDetailsView from "@/views/PokemonDetailsView.vue";

</script>
<template>
    <div class="grid gap-4">
        <PokemonSearch class="col-span-10" />
        <!-- <router-view name="pokemonId"></router-view> -->
        <PokemonDetailsView />
    </div>
</template>