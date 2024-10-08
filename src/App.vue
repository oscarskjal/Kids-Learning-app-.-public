<template>
  <div id="app"
    >
    <Navigation @toggle-settings="toggleSettings"></Navigation>

    <LoadingScreen :isVisible="isLoading" />

    <div class="figures-container" v-if="!showPuzzle && !isLoading && !showModersmal">
      <FigureComponent bgColor="green" caption="Matematik"></FigureComponent>
      <FigureComponent
        bgColor="pink"
        caption="Modersmål"
        @click="showModersmal = true"
      ></FigureComponent>
      <FigureComponent
        bgColor="blue"
        caption="Pussel"
        @click="startLoading"
      ></FigureComponent>
    </div>

    <Modersmål v-if="showModersmal" :toggleFigures="() => { showModersmal = false; toggleFigures(); }" />
    <PuzzleGame v-if="showPuzzle" :toggleFigures="toggleFigures" />

    <h1>{{ message }}</h1>

    <SettingsWidget :isVisible="showSettings"></SettingsWidget>
  </div>
</template>

<script>
import Modersmål from "./components/Modersmål.vue";
import Navigation from "./components/Navigation.vue";
import FigureComponent from "./components/FigureComponent.vue";
import SettingsWidget from "./components/Settingswidget.vue";
import PuzzleGame from "./components/PuzzleGame.vue";
import LoadingScreen from "./components/Loadingscreen.vue";
import axios from "axios";
import backgroundImage from "@/assets/skogbakgrund.jpg";
import spaceBg from "@/assets/Space1.jpg";




export default {
  data() {
    return {
      message: "",
      showSettings: false,
      showPuzzle: false,
      isLoading: false,
      showModersmal: false,
      backgroundImage,
    };
  },
  components: {
    Navigation,
    FigureComponent,
    SettingsWidget,
    PuzzleGame,
    LoadingScreen,
    Modersmål,
  },

  watch: {
    showModersmal(newValue) {
      if (newValue) {
        document.body.style.backgroundImage = 'url(/Space1.jpg)';
      } else {
        document.body.style.backgroundImage = 'url(/Skogbakgrund.jpg)';
      }
    }
  },
  methods: {
    toggleSettings() {
      this.showSettings = !this.showSettings;
    },
    startLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.showPuzzle = true;
      }, 6000);
    },
    toggleFigures() {
      this.showModersmal = false;
      this.showPuzzle = false;
    },
  },
  mounted() {

    document.body.style.backgroundImage = 'url(/Skogbakgrund.jpg)';


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
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 5s ease-in-out;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 20px;
  position: relative;
  z-index: 1;
}

.figures-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 50px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 20px;
  z-index: 2;
}
</style>
