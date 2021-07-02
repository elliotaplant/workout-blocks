import "./NavBar.css";
import { NavLink } from "react-router-dom";

function NavBar({ workouts }) {
  return (
    <div className="NavBar">
      <h1>Workouts</h1>
      <ul>
        {workouts.map(({ id, name }) => <li key={id} >
          <NavLink to={`edit/${id}`} activeClassName="activeLink">{name}</NavLink>
        </li>)}
      </ul>
    </div>
  );
}

export default NavBar;
