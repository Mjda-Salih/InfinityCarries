const bcrypt = require("bcrypt");

const password = "starwars"; // The password you want to hash
bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error("Error hashing password:", err);
  } else {
    console.log("Hashed Password:", hash); // Copy this hash
  }
});
