import global, { GlobalTrack, GlobalScene } from 'utils/global';
import { findGlobalTrack, findStoreTrack } from 'utils/findTrack';
import { findGlobalScene, findStoreScene } from 'utils/findScene';

export type StoreScenes = StoreScene[];
export type StoreScene = {
  id: number,
  name?: string,
  tracks: StoreTrack[]
};
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
  currentScene: number,
  err?: string,
  loading: boolean
}
type ReduxAction = {
  type: string,
  [key: string]: any
}

const initialState: SequencerStore = {
  isPlaying: false,
  tempo: 120,
  scenes: [],
  currentScene: 0,
  loading: true
}

const rootReducer = (state = initialState, action: ReduxAction) => {
  let newStoreScenes: StoreScene[];
  let newStoreScene: StoreScene;
  let newGlobalScene: GlobalScene;
  let newGlobalTrack: GlobalTrack;
  let newStoreTrack: StoreTrack;
  let newCurrentScene: number;

  switch (action.type) {
    case 'INIT':
      if (action.err) {
        return { ...state, err: action.err, loading: false }
      }
      return { ...state, tempo: action.tempo, scenes: action.scenes, loading: false, err: undefined };
    case 'RESET_ERR_LOADING':
      return { ...state, loading: true, err: undefined };
    case 'CHANGE_TEMPO':
      return { ...state, tempo: action.tempo };
    case 'CHANGE_IS_PLAYING':
      return { ...state, isPlaying: action.value };
    case 'CHANGE_SCENE':
      return { ...state, currentScene: action.index };
    case 'CHANGE_SOUND':
      newGlobalScene = findGlobalScene(global.scenes, action.sceneId);
      newGlobalTrack = findGlobalTrack(newGlobalScene, action.trackId);
      newGlobalTrack.buffer = action.audiobuffer;

      return state;
    case 'CHANGE_GAIN':
      newStoreScenes = [ ...state.scenes ];

      newGlobalScene = findGlobalScene(global.scenes, action.sceneId);
      newGlobalTrack = findGlobalTrack(newGlobalScene, action.trackId);
      newGlobalTrack.gain.gain.value = 1 / 127 * action.gain;

      newStoreScene = findStoreScene(newStoreScenes, action.sceneId);
      newStoreTrack = findStoreTrack(newStoreScene, action.trackId);
      newStoreTrack.gain = action.gain;

      return { ...state, scenes: newStoreScenes }
    case 'SEQ_BUTTON_PRESS':
      newStoreScenes = [ ...state.scenes ];
      newStoreScene = findStoreScene(newStoreScenes, action.sceneId);
      newStoreTrack = findStoreTrack(newStoreScene, action.trackId);
      newStoreTrack.sequence[action.position] = newStoreTrack.sequence[action.position] === 0 ? 1 : 0;

      return { ...state, scenes: newStoreScenes }
    case 'ADD_TRACK':
      newStoreScenes = [ ...state.scenes ];
      newGlobalTrack = {
        id: action.trackId,
        name: action.trackName,
        gain: global.context.createGain()
      }
      newGlobalTrack.gain.connect(global.context.destination);
      newGlobalTrack.gain.gain.value = 1 / 127 * 100;

      newStoreTrack = {
        id: action.trackId,
        name: action.trackName,
        sequence: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        gain: 100
      }

      newGlobalScene = findGlobalScene(global.scenes, action.sceneId);
      newGlobalScene.tracks.push(newGlobalTrack);

      newStoreScene = findStoreScene(newStoreScenes, action.sceneId);
      newStoreScene.tracks.push(newStoreTrack);

      return { ...state, scenes: newStoreScenes }
    case 'DELETE_TRACK':
      newStoreScenes = [ ...state.scenes ];

      newGlobalScene = findGlobalScene(global.scenes, action.sceneId);
      newGlobalTrack = findGlobalTrack(newGlobalScene, action.trackId);
      newGlobalScene.tracks.splice(newGlobalScene.tracks.indexOf(newGlobalTrack), 1);

      newStoreScene = findStoreScene(newStoreScenes, action.sceneId);
      newStoreTrack = findStoreTrack(newStoreScene, action.trackId);
      newStoreScene.tracks.splice(newStoreScene.tracks.indexOf(newStoreTrack), 1);

      return { ...state, scenes: newStoreScenes }
    case 'ADD_SCENE':
      newStoreScenes = [ ...state.scenes ];
      newStoreScenes.push({ id: action.sceneId, tracks: [] });

      global.scenes.push({ id: action.sceneId, tracks: [] });

      return { ...state, scenes: newStoreScenes }
    case 'DELETE_SCENE':
      newStoreScenes = [ ...state.scenes ];
      newCurrentScene = state.currentScene;

      //If the deleted scene index is lower than the currentScene index, decrement the currentScene value
      if (newStoreScenes.indexOf(newStoreScene) <= newCurrentScene && !newStoreScenes[newCurrentScene + 1]) {
        newCurrentScene--;
      }

      newGlobalScene = findGlobalScene(global.scenes, action.sceneId);
      global.scenes.splice(global.scenes.indexOf(newGlobalScene), 1);

      newStoreScene = findStoreScene(newStoreScenes, action.sceneId);
      newStoreScenes.splice(newStoreScenes.indexOf(newStoreScene), 1);

      return { ...state, scenes: newStoreScenes, currentScene: newCurrentScene }
    case 'MUTE_TRACK':
      newStoreScenes = [ ...state.scenes ];

      newStoreTrack = findStoreTrack(newStoreScenes[state.currentScene], action.trackId);
      newStoreTrack.mute = !newStoreTrack.mute;

      return { ...state, scenes: newStoreScenes }
    case 'SOLO_TRACK':
      newStoreScenes = [ ...state.scenes ];

      for (let track of newStoreScenes[state.currentScene].tracks) {
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
