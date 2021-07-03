import { useState } from 'react';
import './Run.css';
import { useParams, } from 'react-router-dom';
import { Link } from "react-router-dom";
import Timer from "./Timer";
import TimeCounter from "./TimeCounter";

function numSteps(workout) {
  return workout.blocks.length;
}

function stepsWithin(stepNumber, workout) {
  return stepNumber > -1 && stepNumber < numSteps(workout);
}

function stepsAfter(stepNumber, workout) {
  return stepNumber >= numSteps(workout);
}

export default function Run({ workouts }) {
  const { workoutIndex } = useParams();
  const [stepNumber, setStepNumber] = useState(-1);
  const [runHistory, setRunHistory] = useState({});
  const nextStep = () => setStepNumber(step => step + 1);
  const workout = workouts[workoutIndex];

  return <div className="run-container">
    <Link to="/workouts">Workouts</Link>
    {stepNumber === -1 && <FirstStep workout={workout} nextStep={nextStep} />}
    {stepsWithin(stepNumber, workout) && <Step workout={workout} stepNumber={stepNumber} nextStep={nextStep} runHistory={runHistory} setRunHistory={setRunHistory} />}
    {stepsAfter(stepNumber, workout) && <Finish workout={workout} runHistory={runHistory} />}
  </div>;
}

function FirstStep({ workout, nextStep }) {
  return <>
    <h1>{workout.name}</h1>
    <button className="begin-button" onClick={nextStep}>Begin</button>
  </>
}

function Step({ workout, nextStep, stepNumber, runHistory, setRunHistory }) {
  const block = workout.blocks[stepNumber];
  return <>
    <h1>{block.exercise}</h1>
    {
      {
        Reps: <RunReps block={block} stepNumber={stepNumber} />,
        Timer: <RunTimer block={block} stepNumber={stepNumber} />,
        AMRAP: <RunAMRAP block={block} stepNumber={stepNumber} runHistory={runHistory} setRunHistory={setRunHistory} />,
        ALAP: <RunALAP block={block} stepNumber={stepNumber} runHistory={runHistory} setRunHistory={setRunHistory} />,
        Rest: <RunRest block={block} stepNumber={stepNumber} />,
      }[block.type]
    }
    <p>{block.note}</p>
    {stepNumber === workout.blocks.length - 1
      ? <button onClick={nextStep}>Finish!</button>
      : <button onClick={nextStep}>Next: {workout.blocks[stepNumber + 1].exercise} {'>'}</button>}
  </>
}

function Finish({ workout, runHistory }) {
  return <>
    <h1>Finished {workout.name}!</h1>
    {JSON.stringify(runHistory)}
    <Link to="/workouts">Back to workouts</Link>
  </>
}

function RepCounter({ blockIndex, onChange }) {
  const [reps, setRepCount] = useState(0);

  return <div>
    Num Reps: <input name={blockIndex} value={reps} onChange={({ target: { value } }) => { onChange(value); setRepCount(value); }} />
  </div>
}

function RunReps({ block }) {
  return <p>{block.number} Reps</p>
}

function RunTimer({ block }) {
  return <>
    <Timer initialTime={block.timer} autoStart={block.autoStart} />
  </>
}

function RunAMRAP({ block, stepNumber, runHistory, setRunHistory }) {
  const updateRun = (count) => setRunHistory(runHistory => ({ ...runHistory, [stepNumber]: { exercise: block.exercise, count } }));
  return <>
    {block.hasTimer && <Timer initialTime={block.timer} autoStart={block.autoStart} />}
    {block.hasRepCounter && <RepCounter blockIndex={stepNumber} onChange={updateRun} />}
  </>
}

function RunALAP({ block, stepNumber, runHistory, setRunHistory }) {
  const updateRun = (time) => setRunHistory(runHistory => ({ ...runHistory, stepNumber: { exercise: block.exercise, time } }));
  return <>
    {block.hasTimeCounter && <TimeCounter autoStart={block.autoStart} stepNumber={stepNumber} onStop={updateRun} />}
  </>
}

function RunRest({ block, stepNumber }) {
  return <>
    <Timer initialTime={block.timer} autoStart={block.autoStart} stepNumber={stepNumber} />
  </>
}
