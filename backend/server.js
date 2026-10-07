const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const Enquiry = require("./models/enquiry");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });

// Home Route
app.get("/", (req, res) => {
    res.json({
        message: "LuxeNest Backend is running!"
    });
});

// Get All Enquiries
app.get("/api/enquiries", async (req, res) => {
    try {
        const enquiries = await Enquiry.find()
            .sort({ createdAt: -1 });

        res.json(enquiries);

    } catch (error) {
        console.log("Error fetching enquiries:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch enquiries."
        });
    }
});

// Create Enquiry
app.post("/api/enquiries", async (req, res) => {
    console.log("ENQUIRY RECEIVED:", req.body);

    try {
        const { name, email, phone, project, message } = req.body;

        const enquiry = new Enquiry({
            name,
            email,
            phone,
            project,
            message
        });

        const savedEnquiry = await enquiry.save();

        res.status(201).json({
            success: true,
            message: "Enquiry submitted successfully!",
            enquiry: savedEnquiry
        });

    } catch (error) {
        console.log("Error saving enquiry:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to submit enquiry."
        });
    }
});

// Server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`LuxeNest server running on http://localhost:${PORT}`);
});