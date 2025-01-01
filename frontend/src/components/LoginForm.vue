<script setup>
import { ref } from "vue";
import axios from "axios";

// Define the event names with defineEmits()
const emit = defineEmits(["login"]); // Declare the 'login' event to be emitted

// Define email, password, and error message states
const email = ref("");
const password = ref("");
const error = ref(""); // To display login error
const successMessage = ref(""); // To display success message after login

// Login function
const login = async () => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email: email.value,
      password: password.value,
    });

    // Store the token in localStorage after successful login
    localStorage.setItem("jwt_token", response.data.token);
    successMessage.value =
      "Logged in successfully! Token saved to localStorage.";
    error.value = ""; // Clear any previous error messages

    // Emit the 'login' event to parent (App.vue) to trigger UI change
    emit("login"); // This triggers the login event in the parent component
  } catch (err) {
    error.value =
      "Login failed: " + (err.response?.data?.message || err.message); // Show error message
    successMessage.value = ""; // Clear previous success message
  }
};
</script>

<template>
  <div>
    <h2>Login</h2>

    <div>
      <input
        v-model="email"
        type="email"
        placeholder="Enter your email"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Enter your password"
        required
      />
      <button @click="login">Login</button>
    </div>

    <!-- Display error message if there is any -->
    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <!-- Display success message after login -->
    <div v-if="successMessage" class="success">
      <p>{{ successMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
}

.success {
  color: green;
}
</style>
