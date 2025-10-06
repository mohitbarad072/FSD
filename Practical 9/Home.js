import express from "express";

const router = express.Router();

// Home route
router.get("/", (req, res) => {
  res.send("Welcome to our site");
});

export default router;
