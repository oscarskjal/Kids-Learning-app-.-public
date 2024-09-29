<template>
  <figure :style="{ backgroundColor: bgColor }">
    <figcaption>{{ caption }}</figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
figure {
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #333;
  border-radius: 10px;
  margin: 20px;
}

figcaption {
  font-size: 1.2rem;
  color: white;
  text-align: center;
}
</style>
