const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        phone: {
            type: String,
            trim: true
        },

        project: {
            type: String,
            required: true,
            trim: true
        },

        message: {
            type: String,
            required: true,
            trim: true,
            minlength: 10
        },

        status: {
            type: String,
            enum: ["New", "Contacted", "Completed"],
            default: "New"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Enquiry", enquirySchema);