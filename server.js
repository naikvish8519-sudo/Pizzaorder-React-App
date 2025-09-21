const express = require("express");
const path = require("path");

const app = express();

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, "build")));

// Fallback for React Router (all routes -> index.html)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`React app running on port ${port}`);
});
