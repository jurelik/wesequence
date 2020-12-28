import global, { GlobalTrack } from 'utils/global';

type StoreScenes = StoreScene[];
export type StoreScene = StoreTrack[];
export type StoreTrack = {
  id: number,
  name: string,
  url?: string,
  sequence: number[],
  gain: number,
  mute?: boolean,
  solo?: boolean
}
export type SequencerStore = {
  isPlaying: boolean,
  tempo: number,
  scenes: StoreScenes,
  currentScene: number
}
type ReduxAction = {
  type: string,
  [key: string]: any
}

const initialState: SequencerStore = {
  isPlaying: false,
  tempo: 120,
  scenes: [[]],
  currentScene: 0
}

const rootReducer = (state = initialState, action: ReduxAction) => {
  let newStoreScenes: StoreScene[];
  let newGlobalTrack: GlobalTrack;
  let newStoreTrack: StoreTrack;

  switch (action.type) {
    case 'INIT':
      return { ...state, tempo: action.tempo, scenes: action.scenes };
    case 'CHANGE_TEMPO':
      return { ...state, tempo: action.tempo };
    case 'CHANGE_IS_PLAYING':
      return { ...state, isPlaying: action.value };
    case 'CHANGE_SCENE':
      return { ...state, currentScene: action.index };
    case 'CHANGE_SOUND':
      global.scenes[state.currentScene].some(track => {
        if (track.id === action.trackId) {
          track.buffer = action.audiobuffer;
          return true;
        }
      });
      return state;
    case 'CHANGE_GAIN':
      newStoreScenes = [ ...state.scenes ];

      //Calculate gain amount for the global object
      global.scenes[state.currentScene].some(track => {
        if (track.id === action.trackId) {
          track.gain.gain.value = 1 / 127 * action.gain;
          return true;
        }
      });

      //Update gain in the store
      newStoreScenes[state.currentScene].some(track => {
        if (track.id === action.trackId) {
          track.gain = action.gain;
          return true;
        }
      });

      return { ...state, scenes: newStoreScenes }
    case 'SEQ_BUTTON_PRESS':
      newStoreScenes = [ ...state.scenes ];
      newStoreScenes[state.currentScene].some(track => {
        if (track.id === action.trackId) {
          track.sequence[action.position] = track.sequence[action.position] === 0 ? 1 : 0;
          return true;
        }
      });
      return { ...state, scenes: newStoreScenes }
    case 'ADD_TRACK':
      newStoreScenes = [ ...state.scenes ];
      newGlobalTrack = {
        id: action.trackId,
        name: action.trackName,
        gain: global.context.createGain()
      }
      newStoreTrack = {
        id: action.trackId,
        name: action.trackName,
        sequence: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        gain: 100
      }

      global.scenes[state.currentScene].push(newGlobalTrack);
      newStoreScenes[state.currentScene].push(newStoreTrack);

      return { ...state, scenes: newStoreScenes }
    case 'DELETE_TRACK':
      newStoreScenes = [ ...state.scenes ];

      global.scenes[state.currentScene].some((track, index) => {
        if (track.id === action.trackId) {
          global.scenes[state.currentScene].splice(index, 1);
          return true;
        }
      });

      newStoreScenes[state.currentScene].some((track, index) => {
        if (track.id === action.trackId) {
          newStoreScenes[state.currentScene].splice(index, 1);
          return true;
        }
      });

      return { ...state, scenes: newStoreScenes }
    case 'MUTE_TRACK':
      newStoreScenes = [ ...state.scenes ];

      newStoreScenes[state.currentScene].some(track => {
        if (track.id === action.trackId) {
          track.mute = !track.mute;
          return true;
        }
      });

      return { ...state, scenes: newStoreScenes }
    case 'SOLO_TRACK':
      newStoreScenes = [ ...state.scenes ];

      for (let track of newStoreScenes[state.currentScene]) {
        if (track.id === action.trackId) {
          track.solo = !track.solo;
        }
        else {
          track.solo = false;
        }
      }

      return { ...state, scenes: newStoreScenes }
    default:
      return state;
  }
};

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
