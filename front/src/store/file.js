import { defineStore } from "pinia";
import { Axios } from "@/plugins/axios";
import { ref } from "vue";

export const useFileStore = defineStore("upload", () => {
  const recordsMRR = ref([]);

  async function analyzeFile(fileName) {
    try {
      const { data } = await Axios.get(`file/${fileName}`);

      recordsMRR.value = data;
    } catch (error) {
      return error.message;
    }
  }
  async function upload(file) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await Axios.post("file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  return { analyzeFile, upload, recordsMRR };
});
