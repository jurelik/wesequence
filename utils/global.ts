type GlobalObject = {
  context?: AudioContext,
  socket?: WebSocket,
  //scenes: GlobalScenes,
  tracks: GlobalTracks,
  currentNote: number,
  lookahead: number,
  scheduleAheadTime: number,
  nextNoteTime: number,
  timer?: ReturnType<typeof setTimeout>
}

export type GlobalScenes = { [key: string]: GlobalScene };
export type GlobalScene = {
  tracks: string
}

export type GlobalTracks = { [key: string]: GlobalTrack }
export type GlobalTrack = {
  buffer?: AudioBuffer,
  source?: AudioBufferSourceNode,
  gain: GainNode
}

const global: GlobalObject = {
  //scenes: {},
  tracks: {},
  currentNote: 0,
  lookahead: 10.0,
  scheduleAheadTime: 0.2,
  nextNoteTime: 0.0,
  timer: null,
}

export default global;
