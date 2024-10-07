<template>
  <div id="app">
    <Navigation @toggle-settings="toggleSettings"></Navigation>

    <div v-if="!isPuzzleGameActive" class="figures-container">
      <FigureComponent
        bgColor="green"
        caption="Matematik"
        @figure-click="handleFigureClick"
      ></FigureComponent>
      <FigureComponent
        bgColor="pink"
        caption="Modersmål"
        @figure-click="handleFigureClick"
      ></FigureComponent>
      <FigureComponent
        bgColor="blue"
        caption="Pussel"
        @figure-click="handleFigureClick"
      ></FigureComponent>
    </div>

    <h1 v-if="!isPuzzleGameActive">{{ message }}</h1>

    <PuzzleGame v-if="isPuzzleGameActive" />

    <SettingsWidget :isVisible="showSettings"></SettingsWidget>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import FigureComponent from "./components/FigureComponent.vue";
import PuzzleGame from "./components/PuzzleGame.vue";
import SettingsWidget from "./components/Settingswidget.vue";
import axios from "axios";

export default {
  data() {
    return {
      message: "",
      showSettings: false,
      isPuzzleGameActive: false,
    };
  },
  components: {
    Navigation,
    FigureComponent,
    PuzzleGame,
    SettingsWidget,
  },
  methods: {
    toggleSettings() {
      this.showSettings = !this.showSettings;
    },
    handleFigureClick(caption) {
      if (caption === "Pussel") {
        this.isPuzzleGameActive = true;
      }
    },
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
:root {
  --brightness: 1;
}

body {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  filter: brightness(var(--brightness));
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
