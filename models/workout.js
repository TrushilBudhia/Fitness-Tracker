const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Creating the workout schema
const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercise: [
        {
            type: {
                type: String,
                trim: true,
                required: 'Type is required'
            },
            name: {
                type: String,
                trim: true,
                required: 'Name is required'
            },
            duration: {
                type: Number,
                default: 0,
                required: 'Duration is required'
            },
            distance: {
                type: Number,
                default: 0
            },
            weight: {
                type: Number,
                default: 0
            },
            reps: {
                type: Number,
                default: 0
            },
            sets: {
                type: Number,
                default: 0
            }
        }
    ]
});

const Workout = mongoose.model("Workout", workoutSchema);

// Exporting the Workout
module.exports = Workout;
