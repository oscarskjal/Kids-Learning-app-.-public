<template>
  <div v-if="isVisible" class="settings-widget">
    <h3>Settings</h3>
    <label for="brightness-range">Brightness</label>
    <input
      type="range"
      id="brightness-range"
      min="0.5"
      max="1.5"
      step="0.1"
      v-model="brightness"
      @input="changeBrightness"
    />
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      brightness: 1,
    };
  },
  methods: {
    changeBrightness() {
      this.$emit("brightness-change", this.brightness);
    },
  },
};
</script>

<style scoped>
.settings-widget {
  color: black;
  position: fixed;
  top: 60px;
  right: 20px;
  width: 200px;
  padding: 10px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1000;
}
</style>
