import { Router } from "express";

const router = Router();

// Define your routes here
router.get("/api/example", (req, res) => {
  res.json({ message: "Example route" });
});

export default router; 