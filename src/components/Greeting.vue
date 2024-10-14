<template>
  <transition name="fade">
    <div class="overlay" v-if="isVisible">
      <div class="greeting">
        <h1>Välkommen till kids learning!</h1>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isVisible: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isVisible = false;
    }, 5000);
  },
};
</script>

<style scoped>
/* Legendariska google fonts */
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}

.greeting {
  font-family: "Pacifico", cursive;
  font-size: 48px;
  color: #712ebd;
  text-align: center;
  margin-top: 100px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
