<template>
  <nav>
    <ul>
      <li><button @click="toggleSettings">Inställningar</button></li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    toggleSettings() {
      this.$emit("toggle-settings");
    },
  },
};
</script>

<style scoped>
nav {
  background-color: #333;
  color: white;
  padding: 10px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 20px;
}

a,
button {
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
}

button:focus,
a:focus {
  outline: none;
}
</style>
