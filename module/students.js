const mongoose = require("mongoose");
const studentschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    form: {
        type: String,
        required: true,
        min: 1,
        max: 4,
        enum: ["One", "Two", "Three", "Four"]
    },
    age: {
        type: Number,
        required: true,
        min: 13,
        enum: [13, 14, 15, 16, 17, 18, 19]
    },
    stream: {
        type: String,
        required: true,
        enum: ["East", "West", "South", "North"]
    },
    grade: {
        type: String,
        required: true,
        enum: ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "E"]
    },
    image: {
        type: String
    }
}, {timestamps: true})

const Students = mongoose.model("Students", studentschema);
module.exports = Students;