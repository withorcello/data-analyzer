<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <h1 class="text-h4 font-weight-bold">Drag and drop a file or select</h1>
      <div class="text-h6 font-weight-light">
        Get insights through our analysis
      </div>

      <v-row justify="center">
        <v-col cols="12" lg="8">
          <v-container
            class="my-8 bg-grey-lighten-3 rounded-lg py-16"
            @click="fileInput.click()"
            @drop.prevent="onDrop($event, 1)"
            @dragover.prevent
            @dragenter.prevent
          >
            <v-icon class="my-10" color="#696969" size="58">
              mdi-tray-arrow-up
            </v-icon>
          </v-container>
        </v-col>
      </v-row>

      <v-file-input ref="fileInput" accept=".xlsx,.csv" style="display: none" />
    </v-responsive>
  </v-container>
</template>
<script setup>
import { ref } from "vue";

const fileInput = ref(null);
function onDrop(event) {
  const arquivo = event.dataTransfer.files[0];
  const xlsx = `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`;

  if ([xlsx, "text/csv"].includes(arquivo.type)) {
    console.log(arquivo);
  }
}
</script>
