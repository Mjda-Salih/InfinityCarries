<script setup>
import { ref } from "vue";
import axios from "axios";

// Define the form fields and messages
const name = ref("");
const email = ref("");
const password = ref("");
const error = ref(""); // To display registration error
const successMessage = ref(""); // To display success message after registration

// Register function
const register = async () => {
  try {
    // Send POST request to the backend API to register the user
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        name: name.value,
        email: email.value,
        password: password.value,
      }
    );

    // Store the token in localStorage after successful registration
    localStorage.setItem("jwt_token", response.data.token);

    // Show success message
    successMessage.value =
      "Registration successful! Token saved to localStorage.";
    error.value = ""; // Clear any previous error messages

    // Optionally, redirect to another page (e.g., dashboard or login)
    // You can use Vue Router to redirect if needed
  } catch (err) {
    error.value =
      "Registration failed: " + (err.response?.data?.message || err.message); // Show error message
    successMessage.value = ""; // Clear previous success message
  }
};
</script>

<template>
  <div>
    <h2>Register</h2>

    <div>
      <input
        v-model="name"
        type="text"
        placeholder="Enter your name"
        required
      />
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
      <button @click="register">Register</button>
    </div>

    <!-- Display error message if there is any -->
    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <!-- Display success message after registration -->
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
