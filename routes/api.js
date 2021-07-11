// Importing modules
const router = require("express").Router();
const db = require("../models");

// API routes
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
    const updateWorkoutPlan = await db.Workout.findByIdAndUpdate(
      request.params.id,
      {
        $push: { exercises: request.body }
      },
      {
        new: true,
        runValidators: true
      }
    );
    response.json(updateWorkoutPlan);
  } catch (err) {
    console.log(err);
    response.status(500).send(err.message);
  }
});

// Finding the workouts
// Using aggregate function and $addField field to get totalDistance
router.get("/api/workouts", async (request, response) => {
  try {
    const findPastWorkout = await db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: '$exercises.duration'
          },
        },
      },
    ]);
    console.log('findPastWorkout', findPastWorkout);
    response.json(findPastWorkout);
  } catch (err) {
    console.log(err);
    response.status(500).send(err.message);
  }
});

// Finding the past workouts with a limit
// Using aggregate function and $addField field to get totalDistance and totalWeight
router.get("/api/workouts/range", async (request, response) => {
  try {
    const findSevenPastWorkout = await db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: '$exercises.duration' 
          },
          totalWeight: {
            $sum: '$exercises.weight'
          }
        },
      },
    ])
      .limit(7);
    console.log('findSevenPastWorkout', findSevenPastWorkout);
    response.json(findSevenPastWorkout);
  } catch (err) {
    console.log(err);
    response.status(500).send(err.message);
  }
});

// Exporting router
module.exports = router;
