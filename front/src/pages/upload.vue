<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <h1 class="text-h4 font-weight-bold">Drag and drop a file or select</h1>
      <div class="text-h6 font-weight-light">
        Get insights through our analysis
      </div>

      <v-row justify="center">
        <v-col cols="12" xl="5" lg="6" md="8" sm="10">
          <v-card
            class="my-8 bg-grey-lighten-3 rounded-lg py-16"
            elevation="0"
            @click="fileInput.click()"
            @drop.prevent="onDrop($event, 1)"
            @dragover.prevent
            @dragenter.prevent
          >
            <v-icon class="my-6" color="#696969" size="48">
              mdi-tray-arrow-up
            </v-icon>
          </v-card>
        </v-col>
      </v-row>

      <v-file-input ref="fileInput" accept=".xlsx,.csv" style="display: none" />
    </v-responsive>
  </v-container>
</template>
<script setup>
import { ref } from "vue";
import { useFileStore } from "@/store/file";
import { useRouter } from "vue-router";

const fileInput = ref(null);
const store = useFileStore();
const router = useRouter();

async function onDrop(event) {
  const file = event.dataTransfer.files[0];
  const xlsx = `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`;

  if ([xlsx, "text/csv"].includes(file.type)) {
    await store.upload(file);
    const fileName = Object.values(file.name).join("");
    console.log(fileName);
    router.push({ path: "statistics", query: { file: file.name } });
  }
}
</script>
