// const express = require("express");
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";

dotenv.config();
// console.log("MONGO_URI: ", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
app.use(express.json());    // this middleware will parse JSON bodies: req.body

if (process.env.NODE_ENV !== "production") {
    // app.use(cors());
    app.use(
        cors({
            origin: "http://localhost:5173",
        })
    );
}

app.use(rateLimiter);

// our simple custom middleware
// app.use((req, res, next) => {
//     console.log(`Request method is ${req.method} and requested URL is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT);
    });
});

// mongodb+srv://mynameissatyaprakashsahoo:w0On5NL1Wtma4jUb@cluster0.90mprm0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0