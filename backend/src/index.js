import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {connectDB} from "./lib/db.js";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import cors from "cors"
import { app, server } from "./lib/socket.js";

import path from "path";

dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(cors({
    origin: "http://localhost:5174",
    credentials: true,
    })
);

//Allow u to extract data from the body (auth)
// Increase Payload Size Limit (Fix for 413 Error)
app.use(express.json({ limit: "10mb" })); // Adjust as needed
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser()); // Enable cookie parsing// allow you to parse the cookie 



app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
      });
}

server.listen(5001,() =>{
    console.log("Server is running on PORT: " + PORT);
    connectDB();
});