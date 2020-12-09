const global = {
  context: null,
  socket: null,
  scenes: [],
  isPlaying: false,
  tempo: 120,
  currentNote: 0,
  lookahead: 25.0,
  scheduleAheadTime: 0.1,
  nextNoteTime: 0.0,
  sequence: [1, 1, 1, 1],
  timer: null,
  source: null
}

export default global;
