import './EditArea.css';
import { Route, useParams, } from "react-router-dom";

function EditArea({ workouts, updateWorkout }) {
  return (
    <Route path="/edit/:workoutIndex">
      <WorkoutEdit updateWorkout={updateWorkout} workouts={workouts} />
    </Route>
  );
}

function WorkoutEdit({ updateWorkout, workouts }) {
  const { workoutIndex } = useParams();
  const workout = workouts[workoutIndex];
  const parts = workout.parts;

  const addBlock = () => updateWorkout(workoutIndex, {
    ...workout,
    parts: [...parts, {}]
  });

  return <div className="WorkoutEdit">
    <h3>Requested workout ID: {workoutIndex}</h3>
    <ul>
      {parts.map((part, i) => <li key={i}>
          <h3>{part.name || "Name"}</h3>
      </li>)}
    </ul>
    <Add addBlock={addBlock} />
  </div>;
}

function Add({ addBlock }) {
  return <button onClick={addBlock} className="Add">+</button>
}

export default EditArea;
