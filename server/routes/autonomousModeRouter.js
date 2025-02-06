import express from "express";
import { initializeAgent } from "./agentInitializer.js";
import { HumanMessage } from "@langchain/core/messages";

const router = express.Router();
const runningProcesses = {}; 

async function runAutonomousMode(agent, config, userId, interval = 10) {
    console.log(`Starting autonomous mode for ${userId}...`);

    while (runningProcesses[userId]) {
        try {
            const thought =
                "Be creative and do something interesting on the blockchain. " +
                "Choose an action or set of actions and execute it that highlights your abilities.";

            const stream = await agent.stream({ messages: [new HumanMessage(thought)] }, config);

            for await (const chunk of stream) {
                if ("agent" in chunk) {
                    console.log(chunk.agent.messages[0].content);
                } else if ("tools" in chunk) {
                    console.log(chunk.tools.messages[0].content);
                }
                console.log("-------------------");
            }

            await new Promise(resolve => setTimeout(resolve, interval * 1000));
        } catch (error) {
            console.error("Error in autonomous mode:", error.message);
            delete runningProcesses[userId];
        }
    }

    console.log(`Autonomous mode for ${userId} stopped.`);
}

// Start Autonomous Mode
router.post("/autonomous-mode/:userId", async (req, res) => {
    const { userId } = req.params;
    const { interval = 10 } = req.body;

    if (runningProcesses[userId]) {
        return res.status(400).json({ error: `Autonomous mode for ${userId} is already running.` });
    }

    try {
        const { agent, config } = await initializeAgent(userId);
        runningProcesses[userId] = true;

        runAutonomousMode(agent, config, userId, interval);
        res.json({ message: `Autonomous mode started for ${userId} with interval ${interval} seconds.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Stop Autonomous Mode
router.post("/autonomous-mode/:userId/stop", (req, res) => {
    const { userId } = req.params;

    if (!runningProcesses[userId]) {
        return res.status(400).json({ error: `No autonomous mode running for ${userId}.` });
    }

    delete runningProcesses[userId];
    res.json({ message: `Autonomous mode for ${userId} stopped.` });
});

export default router;
