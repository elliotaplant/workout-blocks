import "./Workouts.css";
import { Link } from "react-router-dom";

function Workouts({ workouts, addWorkout }) {
  return (
    <div className="Workouts">
      <h1>Workouts</h1>
      <ul>
        {workouts.map(({ name }, i) => <li key={i} className="workout-item">
          <span className="workout-txt workout-name">{name}</span>
          <Link className="workout-txt workout-link" to={`/edit/${i}`}>Edit</Link>
          <Link className="workout-txt workout-link" to={`/run/${i}`}>Run</Link>
        </li>)}
      </ul>
      <button className="AddWorkout" onClick={addWorkout}>+</button>
    </div>
  );
}

export default Workouts;
