const mongoose = require("mongoose");

function ConnectDB(URL) {
  mongoose
    .connect(URL) // no options needed
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => {
      console.error("❌ MongoDB Connection Failed:");
      console.error("Reason:", err.message || err);
      console.error("Check your internet or MongoDB URI.");
    });
}

module.exports = ConnectDB;
