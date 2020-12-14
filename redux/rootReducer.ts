type StoreScenes = StoreScene[];
type StoreScene = StoreTrack[];
export type StoreTrack = {
  name: string,
  url: string,
  sequence: number[]
}
export type SequencerStore = {
  isPlaying: boolean,
  tempo: number,
  scenes: StoreScenes
}
type ReduxAction = {
  type: string,
  [key: string]: any
}

const initialState: SequencerStore = {
  isPlaying: false,
  tempo: 125,
  scenes: []
}

const rootReducer = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case 'TEST': {
      return state;
    }
    case 'INIT': {
      return { ...state, scenes: action.scenes };
    }
    case 'CHANGE_TEMPO':
      return { ...state, tempo: action.tempo };
    case 'CHANGE_IS_PLAYING':
      return { ...state, isPlaying: action.value };
    default: {
      return state;
    }
  }
};

export default rootReducer;
