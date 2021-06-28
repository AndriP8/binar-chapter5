const express = require("express");
const router = express(); // router level middleware

router.get("/homepage", (req, res) => {
  res.render("./index", {
    title: "Halaman Homepage",
  });
});

router.get("/game", (req, res) => {
  res.render("./game", {
    title: "Halaman Game",
  });
});

module.exports = router;
