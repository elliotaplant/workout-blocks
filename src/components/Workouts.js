import "./Workouts.css";
import { NavLink } from "react-router-dom";

function Workouts({ workouts, addWorkout }) {
  return (
    <div className="Workouts">
      <h1>Workouts</h1>
      <ul>
        {workouts.map(({ name }, i) => <li key={i} >
          <NavLink to={`/edit/${i}`} activeClassName="activeLink">{name}</NavLink>
        </li>)}
      </ul>
      <button className="AddWorkout" onClick={addWorkout}>+</button>
    </div>
  );
}

export default Workouts;
