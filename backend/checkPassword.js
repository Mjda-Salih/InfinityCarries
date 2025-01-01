const bcrypt = require("bcrypt");

// The raw password you are trying to check
const plainTextPassword = "starwars123"; // This is the password you're testing

// The hash stored in the database (example from the image you uploaded)
const hashedPassword =
  "$2b$10$SttQPlDP3areAPDt/Sp1MeKTOer0P/RIZWcZsDx9f9dgWKOw8CP6K"; // Replace with the actual stored hash

// Use bcrypt to compare
bcrypt.compare(plainTextPassword, hashedPassword, (err, isMatch) => {
  if (err) {
    console.error("Error comparing passwords:", err);
  } else {
    console.log("Password match:", isMatch); // This will log true if the passwords match
  }
});
