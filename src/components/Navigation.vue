<template>
  <nav>
    <ul>
      <li>
        <Button
          label="Inställningar"
          @click="toggleSettings"
          class="gray-button"
        />
      </li>
    </ul>
  </nav>
</template>

<script>
import Button from "primevue/button";

export default {
  components: {
    Button,
  },
  methods: {
    toggleSettings() {
      this.$emit("toggle-settings");
    },
  },
};
</script>

<style scoped>
nav {
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

.gray-button {
  background-color: gray;
  border: 1px solid #ccc;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.gray-button:hover {
  background-color: darkgray;
}
</style>
