export default function newBlock() {
  return {
    autoStart: false,
    count: 0,
    exercise: '',
    hasRepCounter: false,
    hasTimeCounter: false,
    hasTimer: false,
    note: '',
    sets: 0,
    subBlocks: [],
    timer: 0,
    type: 'Reps',
  };
}
