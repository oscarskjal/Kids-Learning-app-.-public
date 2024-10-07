<template>
  <div
    class="figure-component"
    :style="{ backgroundColor: bgColor }"
    @click="handleClick"
  >
    <p>{{ caption }}</p>
  </div>
</template>

<script>
export default {
  props: {
    bgColor: String,
    caption: String,
  },
  methods: {
    handleClick() {
      this.$emit("figure-click", this.caption);
    },
  },
};
</script>

<style scoped>
.figure-component {
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  font-size: 18px;
}
</style>
