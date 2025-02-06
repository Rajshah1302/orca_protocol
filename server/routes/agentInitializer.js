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
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";

const WALLET_DATA_FILE = "wallet_data.txt";
const USER_DATA_FILE = "./data/userAgents.json";

export async function initializeAgent(userId) {
    try {
        let userPreferences = {};
        if (fs.existsSync(USER_DATA_FILE)) {
            const usersData = JSON.parse(fs.readFileSync(USER_DATA_FILE, "utf8"));
            userPreferences = usersData[userId] || {};
        }

        const model = userPreferences.model || "gpt-4o-mini";
        const customMessage = userPreferences.custom_message || 
            "You are a helpful agent interacting onchain using Coinbase Developer Platform.";

        const llm = new ChatOpenAI({ model });
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
        const agentConfig = { configurable: { thread_id: `User-${userId}` } };

        const agent = createReactAgent({
            llm,
            tools,
            checkpointSaver: memory,
            messageModifier: customMessage,
        });

        fs.writeFileSync(WALLET_DATA_FILE, JSON.stringify(await walletProvider.exportWallet()));
        return { agent, config: agentConfig };
    } catch (error) {
        console.error("Failed to initialize agent:", error);
        throw error;
    }
}
