<template>
    <div class="spaceship-container">
      <div class="spaceship" :style="{ transform: `translateX(${position}%)` }"></div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      score: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
    computed: {
      position() {
        return (this.score / this.total) * 345; 
      },
    },
  };
  </script>
  
  <style scoped>
  .spaceship-container {
    position: relative;
    width: 100%;
    height: 50px;
    background-color: #9c000000; 
    overflow: hidden;
  }
  
  .spaceship {
    position: absolute;
    width: 80px; 
    height: 60px; 
    background-image: url('@/assets/spaceShip.png'); 
    background-size: contain;
    background-repeat: no-repeat;
    transition: transform 0.5s ease; 
  }
  </style>
  