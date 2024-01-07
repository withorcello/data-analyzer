<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <div class="text-h6 font-weight-light mb-n1">Welcome to</div>
      <h1 class="text-h3 font-weight-bold mb-6">Data Analyzer</h1>
      <v-btn
        append-icon="mdi-chevron-right"
        variant="tonal"
        @click="$router.push('/Home')"
      >
        Try now
      </v-btn>
    </v-responsive>
  </v-container>
</template>

<script setup>
//
</script>
