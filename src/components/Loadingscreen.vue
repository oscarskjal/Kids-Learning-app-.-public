<template>
  <transition name="fade">
    <div v-if="isVisible" class="loading-screen">
      <div class="loading-box">
        <h2>Laddar...</h2>
        <p>Spelen börjar straks</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "LoadingScreen",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
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
  justify-content: center;
  align-items: center;
  background-color: rgba(158, 207, 202, 0.9);
  z-index: 999;
}

.loading-box {
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
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
