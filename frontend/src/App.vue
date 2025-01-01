<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import LoginForm from "./components/LoginForm.vue"; // Import LoginForm component
import RegisterForm from "./components/RegisterForm.vue"; // Import RegisterForm component

import { ref } from "vue";

// Check if the user is logged in by checking for the JWT token in localStorage
const token = localStorage.getItem("jwt_token");
const isLoggedIn = ref(token ? true : false); // Check if token is present

// Function to handle user logout
const logout = () => {
  localStorage.removeItem("jwt_token"); // Remove the token from localStorage
  isLoggedIn.value = false; // Update the logged-in status
};

// Function to handle user login (this will be triggered from LoginForm)
const handleLogin = () => {
  isLoggedIn.value = true; // Update the logged-in status
};

// Function to handle user registration (this will be triggered from RegisterForm)
const handleRegister = () => {
  isLoggedIn.value = true; // Set logged-in status to true after successful registration
};
</script>

<template>
  <div>
    <!-- Logo Links -->
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>

    <!-- Show HelloWorld component if user is logged in -->
    <div v-if="isLoggedIn">
      <HelloWorld msg="Vite + Vue" />
      <!-- Add a logout button -->
      <button @click="logout">Logout</button>
    </div>

    <!-- Show LoginForm if not logged in -->
    <div v-else>
      <LoginForm @login="handleLogin" />
      <!-- Trigger handleLogin when login form is submitted -->
      <RegisterForm @register="handleRegister" />
      <!-- Trigger handleRegister when registration form is submitted -->
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
