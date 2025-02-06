import express from "express";
import chatRouter from "./routes/chat.js";
import {validateEnvironment} from './config/valiateEnv.js'
validateEnvironment();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", chatRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
