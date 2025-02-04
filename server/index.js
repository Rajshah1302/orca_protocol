import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import {
    AgentKit,
    CdpWalletProvider,
    wethActionProvider,
    walletActionProvider,
    erc20ActionProvider,
    cdpApiActionProvider,
    cdpWalletActionProvider,
    pythActionProvider,
} from "@coinbase/agentkit";
import { getLangChainTools } from "@coinbase/agentkit-langchain";
import { HumanMessage } from "@langchain/core/messages";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

function validateEnvironment() {
    const missingVars = [];
    const requiredVars = ["OPENAI_API_KEY", "CDP_API_KEY_NAME", "CDP_API_KEY_PRIVATE_KEY"];
    requiredVars.forEach(varName => {
        if (!process.env[varName]) missingVars.push(varName);
    });
    if (missingVars.length > 0) {
        console.error("Error: Required environment variables are not set", missingVars);
        process.exit(1);
    }
    if (!process.env.NETWORK_ID) console.warn("Warning: NETWORK_ID not set, defaulting to base-sepolia testnet");
}

validateEnvironment();
const WALLET_DATA_FILE = "wallet_data.txt";

async function initializeAgent() {
    try {
        const llm = new ChatOpenAI({ model: "gpt-4o-mini" });
        let walletDataStr = fs.existsSync(WALLET_DATA_FILE) ? fs.readFileSync(WALLET_DATA_FILE, "utf8") : null;
        
        const config = {
            apiKeyName: process.env.CDP_API_KEY_NAME,
            apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            cdpWalletData: walletDataStr || undefined,
            networkId: process.env.NETWORK_ID || "base-sepolia",
        };
        
        const walletProvider = await CdpWalletProvider.configureWithWallet(config);
        const agentkit = await AgentKit.from({
            walletProvider,
            actionProviders: [
                wethActionProvider(),
                pythActionProvider(),
                walletActionProvider(),
                erc20ActionProvider(),
                cdpApiActionProvider(config),
                cdpWalletActionProvider(config),
            ],
        });
        
        const tools = await getLangChainTools(agentkit);
        const memory = new MemorySaver();
        const agentConfig = { configurable: { thread_id: "CDP AgentKit Chatbot Example!" } };
        
        const agent = createReactAgent({
            llm,
            tools,
            checkpointSaver: memory,
            messageModifier: "You are a helpful agent that can interact onchain using the Coinbase Developer Platform AgentKit. Be concise and helpful with your responses.",
        });
        
        fs.writeFileSync(WALLET_DATA_FILE, JSON.stringify(await walletProvider.exportWallet()));
        return { agent, config: agentConfig };
    } catch (error) {
        console.error("Failed to initialize agent:", error);
        throw error;
    }
}

app.get("/chat", async (req, res) => {
    try {
        const { agent, config } = await initializeAgent();
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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));