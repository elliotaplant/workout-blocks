import './EditArea.css';
import { Redirect, Link, Route, useParams, } from 'react-router-dom';
import { useState } from 'react'
import { Block } from './Blocks'
import newBlock from './newBlock'

function EditArea({ workouts, updateWorkout }) {
  return (
    <Route path="/edit/:workoutIndex">
      <WorkoutEdit updateWorkout={updateWorkout} workouts={workouts} />
    </Route>
  );
}


function WorkoutEdit({ updateWorkout, workouts }) {
  const [dragIndex, setDragIndex] = useState(-1);
  const { workoutIndex } = useParams();
  const workout = workouts[workoutIndex];
  if (!workout) {
    return <Redirect to="/" />
  }
  const blocks = workout.blocks;
  const updateThisWorkout = (workout) => updateWorkout(workoutIndex, workout);

  const updateBlock = (i, block) => updateThisWorkout({
    ...workout,
    blocks: [...blocks.slice(0, i), block, ...blocks.slice(i + 1)]
  });

  const addBlock = () => updateThisWorkout({ ...workout, blocks: [...blocks, newBlock()] });
  const deleteBlock = (i) => updateThisWorkout({ ...workout, blocks: [...blocks.slice(0, i), ...blocks.slice(i + 1)] });

  const handleDrag = (e, i) => {
    setDragIndex(i);
  }

  const handleDrop = (e, dropIndex) => {
    const blocksWithoutDrag = [...blocks.slice(0, dragIndex), ...blocks.slice(dragIndex + 1)];
    const blocksWithNewDrag = [
      ...blocksWithoutDrag.slice(0, dropIndex),
      blocks[dragIndex],
      ...blocksWithoutDrag.slice(dropIndex),
    ];

    updateThisWorkout({ ...workout, blocks: blocksWithNewDrag })
  }

  return <div className="WorkoutEdit">
    <header className="edit-header">
      <Link className="workouts-link" to="/workouts">{'<'} Workouts</Link>
      <h3 className="workout-name">
        Workout Name: <input
          name="name"
          value={workout.name}
          onChange={({ target: { value }}) => updateThisWorkout({ ...workout, name: value })} />
      </h3>
    </header>
    <ul>
      {blocks.map((block, i) => <li key={i}>
        <Block
          block={block}
          updateBlock={(block) => updateBlock(i, block)}
          handleDrag={(e) => handleDrag(e, i)}
          handleDrop={(e) => handleDrop(e, i)}
          deleteBlock={() => deleteBlock(i)}
        />
      </li>)}
    </ul>
    <button onClick={addBlock} className="Add">+</button>
  </div>;
}

export default EditArea;
