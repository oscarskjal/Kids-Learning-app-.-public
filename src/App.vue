<template>
  <div id="app">
    <div class="background-overlay"></div>
    <Navigation @toggle-settings="toggleSettings"></Navigation>

    <LoadingScreen :isVisible="isLoading" />

    <div
      class="figures-container"
      v-if="!showPuzzle && !isLoading && !showModersmal && !showMathGame"
    >
      <FigureComponent
        bgColor="green"
        caption="Matematik"
        @click="startLoading('math')"
      ></FigureComponent>
      <FigureComponent
        bgColor="pink"
        caption="Modersmål"
        @click="startLoading('modersmal')"
      ></FigureComponent>
      <FigureComponent
        bgColor="blue"
        caption="Pussel"
        @click="startLoading('puzzle')"
      ></FigureComponent>
    </div>

    <MathGame v-if="showMathGame" :toggleFigures="toggleFigures" />
    <Modersmål
      v-if="showModersmal"
      :toggleFigures="
        () => {
          showModersmal = false;
          toggleFigures();
        }
      "
    />
    <PuzzleGame v-if="showPuzzle" :toggleFigures="toggleFigures" />

    <h1>{{ message }}</h1>

    <SettingsWidget
      :isVisible="showSettings"
      @brightness-change="handleBrightnessChange"
    ></SettingsWidget>
  </div>
</template>

<script>
import Modersmål from "./components/Modersmål.vue";
import Navigation from "./components/Navigation.vue";
import FigureComponent from "./components/FigureComponent.vue";
import SettingsWidget from "./components/Settingswidget.vue";
import PuzzleGame from "./components/PuzzleGame.vue";
import LoadingScreen from "./components/Loadingscreen.vue";
import MathGame from "./components/MathGame.vue";
import axios from "axios";
import backgroundImage from "@/assets/skogbakgrund.jpg";

export default {
  data() {
    return {
      message: "",
      showSettings: false,
      showPuzzle: false,
      isLoading: false,
      showModersmal: false,
      showMathGame: false,
      backgroundImage,
      brightness: 1,
    };
  },
  components: {
    Navigation,
    FigureComponent,
    SettingsWidget,
    PuzzleGame,
    LoadingScreen,
    Modersmål,
    MathGame,
  },
  methods: {
    toggleSettings() {
      this.showSettings = !this.showSettings;
    },
    startLoading(gameType) {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;

        if (gameType === "math") {
          this.showMathGame = true;
        } else if (gameType === "modersmal") {
          this.showModersmal = true;
        } else if (gameType === "puzzle") {
          this.showPuzzle = true;
        }
      }, 6000);
    },
    toggleFigures() {
      this.showModersmal = false;
      this.showPuzzle = false;
      this.showMathGame = false;
    },
    handleBrightnessChange(newBrightness) {
      this.brightness = newBrightness;
      document.querySelector(
        ".background-overlay"
      ).style.filter = `brightness(${newBrightness})`;
    },
  },
  mounted() {
    document.body.style.backgroundImage = `url(${this.backgroundImage})`;

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
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  padding-top: 20px;
  position: relative;
  z-index: 1;
  height: 100vh;
  justify-content: flex-start;
}

.background-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-image: url("@/assets/skogbakgrund.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: brightness(1);
  transition: filter 0.3s ease;
}

.figures-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 20px;
  z-index: 2;
}
</style>
