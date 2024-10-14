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

    <h3>Logga in eller gör användare</h3>
    <form @submit.prevent="handleRegister">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" required />

      <label for="username">Användarnamn</label>
      <input type="text" id="username" v-model="username" required />

      <label for="password">Lösenord</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Skapa konto</button>
    </form>

    <form @submit.prevent="handleLogin">
      <h3>Logga in</h3>
      <label for="login-email">Email</label>
      <input type="email" id="login-email" v-model="loginEmail" required />

      <label for="login-password">Lösenord</label>
      <input
        type="password"
        id="login-password"
        v-model="loginPassword"
        required
      />

      <button type="submit">Logga in</button>
    </form>

    <p v-if="message">{{ message }}</p>

    <div v-if="isLoggedIn">
      <h4 :style="{ color: timerColor }">Tid spelat: {{ elapsedTime }}</h4>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
      email: "",
      username: "",
      password: "",
      loginEmail: "",
      loginPassword: "",
      message: "",
      isLoggedIn: false,
      elapsedTime: 0,
      timer: null,
    };
  },
  // Färgbyten beroende på hur länge man spelat
  computed: {
    timerColor() {
      if (this.elapsedTime >= 900) {
        return "red";
      } else if (this.elapsedTime >= 600) {
        return "orange";
      } else if (this.elapsedTime >= 300) {
        return "#BDAA00";
      }
      return "blue";
    },
  },
  methods: {
    changeBrightness() {
      this.$emit("brightness-change", this.brightness);
    },
    handleRegister() {
      const payload = {
        email: this.email,
        username: this.username,
        password: this.password,
      };

      axios
        .post("http://localhost:5000/api/register", payload)
        .then((response) => {
          this.message = "Användare gjord!";
        })
        .catch((error) => {
          this.message = "Error med användaren.";
          console.error("Error:", error);
        });
    },
    handleLogin() {
      const payload = {
        email: this.loginEmail,
        password: this.loginPassword,
      };

      axios
        .post("http://localhost:5000/api/login", payload)
        .then((response) => {
          this.message = response.data.message;
          this.isLoggedIn = true;
          this.startTimer();
        })
        .catch((error) => {
          this.message =
            "Login failed: " +
            (error.response ? error.response.data.message : error.message);
          console.error("Error:", error);
        });
    },
    startTimer() {
      this.elapsedTime = 0;
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.elapsedTime++;
      }, 1000);
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.settings-widget {
  color: black;
  position: fixed;
  top: 60px;
  right: 20px;
  width: 250px;
  padding: 10px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1000;
}

form {
  margin-top: 10px;
}

form label {
  display: block;
  margin-bottom: 5px;
}

form input {
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
}

button {
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

p {
  margin-top: 10px;
  color: green;
}
</style>
