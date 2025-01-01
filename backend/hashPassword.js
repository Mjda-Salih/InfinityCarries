const bcrypt = require("bcrypt");
const password = "password123"; // The plain-text password you want to hash

bcrypt.hash(password, 10, (err, hashedPassword) => {
  if (err) console.error(err);
  else console.log("Hashed Password:", hashedPassword); // This will output the hashed password
});
