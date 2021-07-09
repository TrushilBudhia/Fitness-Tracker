const router = require("express").Router();
const db = require("../models");

// Create new workout plan
router.post("/api/workouts", async ({ body }, response) => {
    try {
        const addWorkout = await db.Workout.create(body);
        response.json(addWorkout);
      } catch (err) {
        console.log(err);
        response.status(500).send(err.message);
      }  
});

// Update workout plan
router.put("/api/workouts/:id", async (request, response) => {
    try {
        const updateWorkoutPlan = await db.Workout.findByIdAndUpdate(request.params.id, { $push: { exercises: request.body } }, { new: true, runValidators: true });
        response.json(updateWorkoutPlan);
      } catch (err) {
        console.log(err);
        response.status(500).send(err.message);
      }  
});

// Finding the past workouts with a limit
router.get("/api/workouts/past-workouts", async (request, response) => {
    try {
        const findSevenPastWorkout = await db.Workout.find({}).limit(7);
        response.json(findSevenPastWorkout);
      } catch (err) {
        console.log(err);
        response.status(500).send(err.message);
      }  
});

// Finding the workouts
router.get("/api/workouts", async (request, response) => {
    try {
        const findPastWorkout = await db.Workout.find({});
        response.json(findPastWorkout);
      } catch (err) {
        console.log(err);
        response.status(500).send(err.message);
      }  
});

module.exports = router;
