import { Component } from 'react';

export default class TimeCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSpent: 0,
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
      this.setState(({ timeSpent, lastTick }) => {
        const tick = Date.now();
        const newTimeSpent = timeSpent + (tick - lastTick);
        return { timeSpent: newTimeSpent, lastTick: tick }
      });
      await new Promise(r => setTimeout(r, 100));
    }
  }

  stopTimer() {
    this.setState({ timerRunning: false });
  }

  render() {
    return <div>
      <p>Time spent: {Math.round(this.state.timeSpent / 10) / 100}</p>
      {this.state.timerRunning
        ? <button onClick={() => this.stopTimer()}>Pause</button>
        : <button onClick={() => this.startTimer()}>Start</button>}
    </div>
  }
}
