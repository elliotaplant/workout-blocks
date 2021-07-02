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
  const nextStep = () => setStepNumber(step => step + 1);
  const workout = workouts[workoutIndex];

  return <div className="run-container">
    <Link to="/workouts">Workouts</Link>
    {stepNumber === -1 && <FirstStep workout={workout} nextStep={nextStep} />}
    {stepsWithin(stepNumber, workout) && <Step workout={workout} stepNumber={stepNumber} nextStep={nextStep} />}
    {stepsAfter(stepNumber, workout) && <Finish workout={workout} />}
  </div>;
}

function FirstStep({ workout, nextStep }) {
  return <>
    <h1>{workout.name}</h1>
    <button className="begin-button" onClick={nextStep}>Begin</button>
  </>
}

function Step({ workout, nextStep, stepNumber }) {
  const block = workout.blocks[stepNumber];
  return <>
    <h1>{block.exercise}</h1>
    {
      {
        Reps: <RunReps block={block} />,
        Timer: <RunTimer block={block} />,
        AMRAP: <RunAMRAP block={block} />,
        ALAP: <RunALAP block={block} />,
        Rest: <RunRest block={block} />,
      }[block.type]
    }
    <p>{block.note}</p>
    {stepNumber === workout.blocks.length - 1
      ? <button onClick={nextStep}>Finish!</button>
      : <button onClick={nextStep}>Next: {workout.blocks[stepNumber + 1].exercise} {'>'}</button>}
  </>
}

function Finish({ workout }) {
  return <>
    <h1>Finished {workout.name}!</h1>
    <Link to="/workouts">Back to workouts</Link>
  </>
}

function RepCounter() {
  const [reps, setRepCount] = useState(0);

  return <div>
    Num Reps: <input value={reps} onChange={e => setRepCount(e.target.value)} />
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

function RunAMRAP({ block }) {
  return <>
    {block.hasTimer && <Timer initialTime={block.timer} autoStart={block.autoStart} />}
    {block.hasRepCounter && <RepCounter />}
  </>
}

function RunALAP({ block }) {
  return <>
    {block.hasTimeCounter && <TimeCounter autoStart={block.autoStart} />}
  </>
}

function RunRest({ block }) {
  return <>
    <Timer initialTime={block.timer} autoStart={block.autoStart} />
  </>
}
