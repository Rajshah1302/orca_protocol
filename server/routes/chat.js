import express from "express";
import { initializeAgent } from "./agentInitializer.js";
import { HumanMessage } from "@langchain/core/messages";

const router = express.Router();

router.get("/chat", async (req, res) => {
    try {
        const {userId} = req.body;
        const { agent, config } = await initializeAgent(userId);
        const userInput = req.query.prompt;
        if (!userInput) return res.status(400).json({ error: "Missing prompt" });

        const stream = await agent.stream({ messages: [new HumanMessage(userInput)] }, config);
        let responseText = "";

        for await (const chunk of stream) {
            responseText += "agent" in chunk ? chunk.agent.messages[0].content : chunk.tools.messages[0].content;
        }

        res.json({ response: responseText });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
