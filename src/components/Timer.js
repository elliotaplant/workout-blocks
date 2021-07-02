import { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: props.initialTime * 1000,
      timerRunning: !!props.autoStart,
    }
  }

  componentDidMount() {
    if (this.state.timerRunning) {
      this.startTimer();
    }
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  startTimer() {
    this.setState(
      { timerRunning: true, lastTick: Date.now() },
      () => setImmediate(() => this.runTimer().catch(console.error)));
  }

  async runTimer() {
    while (this.state.timerRunning && this._isMounted) {
      this.setState(({ timeLeft, lastTick }) => {
        const tick = Date.now();
        const newTimeLeft = Math.max(timeLeft - (tick - lastTick), 0);
        return { timeLeft: newTimeLeft, lastTick: tick, timerRunning: this.state.timerRunning && newTimeLeft > 0 }
      });
      await new Promise(r => setTimeout(r, 100));
    }
  }

  stopTimer() {
    this.setState({ timerRunning: false });
  }

  render() {
    return <div>
      <p>Time left: {Math.round(this.state.timeLeft / 10) / 100}</p>
      {this.state.timeLeft > 0 && (this.state.timerRunning
        ? <button onClick={() => this.stopTimer()}>Pause</button>
        : <button onClick={() => this.startTimer()}>Start</button>
      )}
    </div>
  }
}
