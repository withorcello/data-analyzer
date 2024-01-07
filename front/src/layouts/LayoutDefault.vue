<template>
  <v-app-bar v-if="appBar" flat>
    <v-app-bar-title>
      <v-row class="ma-0">
        <v-icon icon="mdi-chart-arc" />
        <h4 class="font-weight-semibold ml-2">Data Analyzer</h4>
      </v-row>
    </v-app-bar-title>
  </v-app-bar>

  <v-main>
    <router-view />
  </v-main>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const appBar = computed(() => {
  return route.path !== "/";
});
</script>
