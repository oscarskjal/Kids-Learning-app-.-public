<template>
  <header>
    <nav class="navbar">
      <div class="navbar-logo">
        <a href="#" class="navbar-brand">MyApp</a>
      </div>
      <ul class="navbar-links">
        <li><a href="#" class="nav-item">Licenser</a></li>
        <li><a href="#" class="nav-item">Årskurser</a></li>
        <li><a href="#" class="nav-item">Inställningar</a></li>
      </ul>
      <button class="navbar-toggle" @click="toggleMenu">☰</button>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  padding: 1rem;
  color: #fff;
  position: relative;
}

.navbar-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

.nav-item {
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s;
}

.nav-item:hover {
  color: #f1c40f;
}

.navbar-toggle {
  display: none;
}
</style>
