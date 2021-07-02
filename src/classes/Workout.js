
export default class Workout {
  constructor() {
    this.steps = [];
  }

  serialize() {
    return JSON.stringify(this.steps);
  }
}
