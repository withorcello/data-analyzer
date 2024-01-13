<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-row justify="center">
        <v-col cols="12" md="5">
          <Bar
            style="width: auto; height: auto"
            :data="data"
            :options="{
              responsive: true,
            }"
          />
        </v-col>
      </v-row>

      <v-file-input ref="fileInput" accept=".xlsx,.csv" style="display: none" />
    </v-responsive>
  </v-container>
</template>
<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { ref } from "vue";
import { Bar } from "vue-chartjs";
import { useFileStore } from "@/store/file";
import { computed } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const fileInput = ref(null);
const store = useFileStore();
const route = useRoute();

const data = computed(() => ({
  labels: store.recordsMRR?.map((record) => record.month),
  datasets: [
    {
      label: "Receita Recorrente Mensal",
      backgroundColor: "#388E3C",
      data: store.recordsMRR?.map((record) => record.value),
    },
  ],
}));

onMounted(() => {
  store.analyzeFile(route.query.file);
});
</script>
