import express from "express";
import chatRouter from "./routes/chat.js";
import {validateEnvironment} from './config/valiateEnv.js'
import userAgentRouter from "./routes/userAgentRouter.js";
import autonomousModeRouter from "./routes/autonomousModeRouter.js";

validateEnvironment();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", chatRouter);
app.use("/api", userAgentRouter);
app.use("/api", autonomousModeRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
