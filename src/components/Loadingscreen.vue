<template>
  <transition name="fade">
    <div v-if="isVisible" class="loading-screen">
      <div class="loading-box">
        <img :src="babysquare" alt="Loading Image" class="loading-image" />
        <div class="loading-text">
          <h2>Laddar...</h2>
          <p>Spelen börjar straks</p>
        </div>
      </div>

      <div class="tips-box">
        <p class="tip-text">Tips: {{ selectedTip }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
import babysquare from "@/assets/babysquare.jpg";

export default {
  name: "LoadingScreen",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      babysquare,
      tips: [
        "Kom ihåg att ta pauser efter längre sessioner!",
        "Du kan justera ljusstyrkan från inställningarna.",
        "Kom ihåg att dricka vatten!",
        "Du kan ändra teman från inställningarna.",
        "Varje spel har flera svårighetsgrader. Pröva en svårare svårighetsgrad om spelet är för lätt!",
      ],
      selectedTip: "",
    };
  },
  methods: {
    getRandomTip() {
      const randomIndex = Math.floor(Math.random() * this.tips.length);
      this.selectedTip = this.tips[randomIndex];
    },
  },
  watch: {
    isVisible(newValue) {
      if (newValue) {
        this.getRandomTip();
      }
    },
  },
};
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(158, 207, 202, 0.9);
  z-index: 999;
}

.loading-box {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  margin-bottom: 75px;
}

.loading-image {
  width: 100px;
  height: 100px;
  margin-right: 20px;
  border-radius: 10px;
}

.loading-text {
  text-align: left;
}

.tips-box {
  text-align: center;
  font-size: 16px;
  color: #333;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.tip-text {
  font-style: italic;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}
</style>
