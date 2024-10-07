<template>
    <div class="modersmal-container">
      <h2>Modersmål Content</h2>

      Hello there from Modersmål.vue!
      <!-- Add your modersmål content here -->
      <button @click="backToFigures">Back to Figures</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      backToFigures: {
        type: Function,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  body {
    background-color: #525252;
    color: white;
  }
  </style>