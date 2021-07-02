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
  const blocks = workout.blocks;
  const updateThisWorkout = (workout) => updateWorkout(workoutIndex, workout);

  const updateBlock = (i, block) => updateThisWorkout({
    ...workout,
    blocks: [...blocks.slice(0, i), block, ...blocks.slice(i + 1)]
  });

  const addBlock = () => updateThisWorkout({ ...workout, blocks: [...blocks, {}] });

  return <div className="WorkoutEdit">
    <h3>Requested workout ID: {workoutIndex}</h3>
    <ul>
      {blocks.map((block, i) => <li key={i}><Block block={block} updateBlock={(block) => updateBlock(i, block)}/></li>)}
    </ul>
    <Add addBlock={addBlock} updateWorkout={updateThisWorkout} />
  </div>;
}

function Add({ addBlock }) {
  return <button onClick={addBlock} className="Add">+</button>
}

function Block({ block, updateBlock }) {
  const updateType = ({ target: { value }}) => updateBlock({ ...block, type: value });

  return <div className="Block">
    <h3>{block.name || "Name"}</h3>
    <label>Type</label>
    <select value={block.type} onChange={updateType}>
      <option>Reps</option>
      <option>Time</option>
      <option>AMRAP</option>
      <option>ALAP</option>
    </select>
  </div>
}

export default EditArea;
