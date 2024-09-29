<template>
  <div id="app">
    <Navigation></Navigation>

    <div class="figures-container">
      <FigureComponent bgColor="green" caption="Matematik"></FigureComponent>
      <FigureComponent bgColor="pink" caption="Modersmål"></FigureComponent>
    </div>

    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import FigureComponent from "./components/FigureComponent.vue";
import axios from "axios";

export default {
  data() {
    return {
      message: "",
    };
  },
  components: {
    Navigation,
    FigureComponent,
  },
  mounted() {
    axios
      .get("http://localhost:5000/api/hello")
      .then((response) => {
        this.message = response.data.message;
      })
      .catch((error) => {
        console.error("Error fetching message:", error);
      });
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 20px;
}

.figures-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}
</style>
