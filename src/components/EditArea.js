import './EditArea.css';
import { Route, useParams, } from "react-router-dom";

function EditArea({ workouts }) {
  return (
    <Route path="/edit/:workoutId">
      <WorkoutEdit />
    </Route>
  );
}

function WorkoutEdit() {
  let { workoutId } = useParams();
  return <div className="WorkoutEdit">
    <h3>Requested workout ID: {workoutId}</h3>
  </div>;
}

export default EditArea;
