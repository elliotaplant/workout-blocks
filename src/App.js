import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Inspector from './components/Inspector';
import EditArea from './components/EditArea';
import { BrowserRouter as Router, } from "react-router-dom";

function App({ initialWorkouts }) {
  const [workouts, updateWorkouts] = useState(initialWorkouts || [])

  const syncWorkouts = (newState) => {
    localStorage.setItem("workouts", JSON.stringify(newState));
    return updateWorkouts(newState)
  }

  const updateWorkout = (i, workout) => syncWorkouts([...workouts.slice(0, i), workout, ...workouts.slice(i + 1)]);
  const addWorkout = () => syncWorkouts([...workouts, {
    name: "New Workout",
    parts: []
  }]);

  return (
    <Router>
      <div className="App">
        <NavBar workouts={workouts} addWorkout={addWorkout} />
        <EditArea updateWorkout={updateWorkout} workouts={workouts} />
        <Inspector />
      </div>
    </Router>
  );
}

export default App;
