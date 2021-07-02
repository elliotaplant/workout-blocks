import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Inspector from './components/Inspector';
import EditArea from './components/EditArea';
import { BrowserRouter as Router, } from "react-router-dom";

function App() {
  const [workouts] = useState([
    { id: 1, name: "First Workout" }
  ])
  return (
    <Router>
      <div className="App">
        <NavBar workouts={workouts} />
        <EditArea />
        <Inspector />
      </div>
    </Router>
  );
}

export default App;
