import "./NavBar.css";
import { NavLink } from "react-router-dom";

function NavBar({ workouts, addWorkout }) {
  return (
    <div className="NavBar">
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

export default NavBar;
