const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const database = require('./config/database');
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 4000;

// Middleware
app.use(cookieParser());
app.use(express.json()); 

// CORS configuration
const corsOptions = {
    origin:[ "http://localhost:5173","https://superai-chi.vercel.app","http://localhost:5175"], 
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Connecting to database
database.connectDB();

// Routes
const contactRoutes = require("./routes/contact");

app.use("/api/contact", contactRoutes);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
