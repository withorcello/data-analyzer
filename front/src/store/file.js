import { defineStore } from "pinia";
import { Axios } from "@/plugins/axios";

export const useFileStore = defineStore("upload", () => {
  async function analyzeFile(file) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      Axios.post("file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  return { analyzeFile };
});
