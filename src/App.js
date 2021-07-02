import { useState } from 'react';
import './App.css';
import Workouts from './components/Workouts';
import EditArea from './components/EditArea';
import { Switch, Route, Redirect, BrowserRouter as Router, } from "react-router-dom";

function App({ initialWorkouts }) {
  const [workouts, updateWorkouts] = useState(initialWorkouts || [])

  const syncWorkouts = (newState) => {
    localStorage.setItem("workouts", JSON.stringify(newState));
    return updateWorkouts(newState)
  }

  const updateWorkout = (i, workout) => syncWorkouts([...workouts.slice(0, i), workout, ...workouts.slice(i + 1)]);
  const addWorkout = () => syncWorkouts([...workouts, {
    name: "New Workout",
    blocks: []
  }]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/workouts">
            <Workouts workouts={workouts} addWorkout={addWorkout} />
          </Route>
          <Route path="/edit/:workoutIndex">
            <EditArea updateWorkout={updateWorkout} workouts={workouts} />
          </Route>
          <Route path="/run/:workoutIndex">
            <h1>Run</h1>
          </Route>
          <Redirect from="/" to="/workouts" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
