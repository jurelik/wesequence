type GlobalObject = {
  context?: AudioContext,
  socket?: WebSocket,
  scenes: GlobalScenes,
  currentNote: number,
  lookahead: number,
  scheduleAheadTime: number,
  nextNoteTime: number,
  timer?: ReturnType<typeof setTimeout>
}

export type GlobalScenes = GlobalScene[];
export type GlobalScene = {
  id: number,
  tracks: GlobalTrack[]
}
export type GlobalTrack = {
  id: number,
  name: string,
  buffer?: AudioBuffer,
  source?: AudioBufferSourceNode,
  gain: GainNode
}

const global: GlobalObject = {
  scenes: [],
  currentNote: 0,
  lookahead: 10.0,
  scheduleAheadTime: 0.2,
  nextNoteTime: 0.0,
  timer: null,
}

export default global;
