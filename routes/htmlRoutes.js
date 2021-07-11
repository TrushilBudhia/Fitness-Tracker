// Importing modules
const router = require("express").Router();
const path = require("path");

// HTML routes
router.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/exercise", (request, response) => {
  response.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", (request, response) => {
  response.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = router;