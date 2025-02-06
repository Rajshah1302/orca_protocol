import express from "express";
import fs from "fs";
import dotenv from "dotenv";
import { initializeAgent } from "./agentInitializer.js";
import { getGroqChatCompletion } from "../utils/groqAI.js";
dotenv.config();

const router = express.Router();
const USER_DATA_FILE = "./data/userAgents.json";

router.post("/user-agent", async (req, res) => {
  try {
    const { userId, personality } = req.body;

    if (!userId || !personality) {
      return res.status(400).json({ error: "userId and personality are required" });
    }
    const prompt = `Create a custom agent for user ${userId} with the following personality: ${personality}`;
    const agentResponse = await getGroqChatCompletion(prompt);
    if (!agentResponse) {
      return res.status(500).json({ error: "Failed to generate AI response." });
    }

    let userAgents = {};
    if (fs.existsSync(USER_DATA_FILE)) {
      try {
        userAgents = JSON.parse(fs.readFileSync(USER_DATA_FILE, "utf8"));
      } catch (e) {
        return res.status(500).json({ error: "Error reading user data file." + e });
      }
    }

    userAgents[userId] = { personality, agentResponse };
    fs.writeFileSync(USER_DATA_FILE, JSON.stringify(userAgents, null, 2));

    res.json({
      message: `User agent created for user ${userId}`,
      agentResponse,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
