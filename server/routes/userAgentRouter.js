import express from "express";
import fs from "fs";
import { initializeAgent } from "./agentInitializer.js";

const router = express.Router();
const USER_DATA_FILE = "./data/userAgents.json";

// Save user preferences
router.post("/user-agent", (req, res) => {
  try {
    const { userId, model, personality, custom_message } = req.body;
    if (!userId) return res.status(400).json({ error: "userId is required" });

    let userAgents = {};
    if (fs.existsSync(USER_DATA_FILE)) {
      userAgents = JSON.parse(fs.readFileSync(USER_DATA_FILE, "utf8"));
    }

    userAgents[userId] = { model, personality, custom_message };
    fs.writeFileSync(USER_DATA_FILE, JSON.stringify(userAgents, null, 2));

    res.json({
      message: "User agent preferences saved",
      data: userAgents[userId],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user-specific agent
router.get("/user-agent/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { config } = await initializeAgent(userId);
    res.json({ message: `Agent initialized for ${userId}`, config });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
