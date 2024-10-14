import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/saga-green/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

createApp(App).mount("#app");
app.use(PrimeVue);

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
