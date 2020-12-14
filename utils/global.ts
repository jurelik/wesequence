type GlobalObject = {
  context?: BaseAudioContext,
  socket?: WebSocket,
  scenes: GlobalScenes,
  currentNote: number,
  lookahead: number,
  scheduleAheadTime: number,
  nextNoteTime: number,
  timer?: ReturnType<typeof setTimeout>
}

type GlobalScenes = GlobalScene[];
type GlobalScene = GlobalTrack[];
export type GlobalTrack = {
  name: string,
  buffer: AudioBuffer,
  source?: AudioBufferSourceNode
}

const global: GlobalObject = {
  scenes: [],
  currentNote: 0,
  lookahead: 25.0,
  scheduleAheadTime: 0.1,
  nextNoteTime: 0.0,
  timer: null,
}

export default global;
