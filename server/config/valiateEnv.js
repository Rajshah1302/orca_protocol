import dotenv from "dotenv";

dotenv.config();

export function validateEnvironment() {
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
