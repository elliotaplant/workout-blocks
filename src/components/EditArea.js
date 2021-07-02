import './EditArea.css';
import { Route, useParams, } from "react-router-dom";
import { Block } from './Blocks'

function EditArea({ workouts, updateWorkout }) {
  return (
    <Route path="/edit/:workoutIndex">
      <WorkoutEdit updateWorkout={updateWorkout} workouts={workouts} />
    </Route>
  );
}

function newBlock() {
  return {
    autoStart: false,
    count: 0,
    exercise: '',
    hasRepCounter: false,
    hasTimeCounter: false,
    hasTimer: false,
    note: '',
    timer: 0,
    type: 'Reps',
  };
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

  const addBlock = () => updateThisWorkout({ ...workout, blocks: [...blocks, newBlock()] });

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

export default EditArea;
