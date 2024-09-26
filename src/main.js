import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";

createApp(App).mount("#app");

export default {
  data() {
    return {
      message: "",
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/api/hello")
      .then((response) => {
        this.message = response.data.message;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
