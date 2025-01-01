<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// Defining props (if needed for future expansion)
defineProps({
  msg: String,
});

// Defining state
const count = ref(0);
const users = ref([]); // State to hold the users fetched from the API
const error = ref(""); // State to hold any error message if the request fails

// When the component is mounted, fetch the users
onMounted(() => {
  const token = localStorage.getItem("jwt_token"); // Get the JWT token from localStorage

  if (!token) {
    error.value = "No token provided"; // Handle the case if no token is available
    return;
  }

  // Making the GET request to the API with token in the Authorization header
  axios
    .get("http://localhost:5000/api/users", {
      headers: {
        Authorization: `Bearer ${token}`, // Adding token to the header
      },
    })
    .then((response) => {
      users.value = response.data; // Storing the response data (users)
    })
    .catch((err) => {
      console.error("There was an error fetching the users:", err);
      error.value =
        "Failed to fetch users. " +
        (err.response?.data?.message || err.message); // Store error message
    });
});
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>Edit <code>components/HelloWorld.vue</code> to test HMR</p>
  </div>

  <!-- Display error message if there is any -->
  <div v-if="error" class="error">
    <p>{{ error }}</p>
  </div>

  <!-- Display the list of users fetched from the backend -->
  <div v-if="users.length > 0">
    <h2>List of Users:</h2>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
  </div>

  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.error {
  color: red;
}
</style>
