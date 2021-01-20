import global, { GlobalTrack, GlobalScene } from 'utils/global';
import { findGlobalTrack, findStoreTrack } from 'utils/findTrack';
import { findGlobalScene, findStoreScene } from 'utils/findScene';

export type StoreTrack = {
  sceneId: number,
  name: string,
  url?: string,
  sequence: number[],
  gain: number,
  mute?: boolean,
  solo?: boolean
}
export type TrackStore = {
  byId: {[name: string]: StoreTrack},
  allIds: string[],
  currentScene?: string
}
type ReduxAction = {
  type: string,
  [key: string]: any
}

const initialState: TrackStore = {
  byId: {},
  allIds: [],
}

const trackReducer = (state = initialState, action: ReduxAction) => {
  let newGlobalTrack;
  let newGlobalScene;
  let newState;

  switch (action.type) {
    case 'INIT':
      newState = { ...state };
      action.tracks.forEach(track => {
        newState.byId[track.id] = track;
        delete newState.byId[track.id].id;
      });
      return newState;
    case 'ADD_TRACK':
      newState = { ...state };
      
      newState.byId[action.trackId.toString()] = {
        sceneId: action.sceneId,
        name: action.trackName,
        sequence: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        gain: 100
      }
      newState.allIds.push(action.trackId.toString());

      newGlobalTrack = {
        id: action.trackId,
        name: action.trackName,
        gain: global.context.createGain()
      }
      newGlobalTrack.gain.connect(global.context.destination);
      newGlobalTrack.gain.gain.value = 1 / 127 * 100;

      newGlobalScene = findGlobalScene(global.scenes, action.sceneId);
      newGlobalScene.tracks.push(newGlobalTrack);

      return newState;
    case 'DELETE_TRACK':
      newState = { ...state };

      newGlobalScene = findGlobalScene(global.scenes, action.sceneId);
      newGlobalTrack = findGlobalTrack(newGlobalScene, action.trackId);
      newGlobalScene.tracks.splice(newGlobalScene.tracks.indexOf(newGlobalTrack), 1);

      delete newState[action.trackId.toString()];
      newState.allIds.splice(newState.allIds.indexOf(action.trackId.toString()), 1);

      return newState;
    case 'CHANGE_TRACK_NAME':
      newState = { ...state };

      newState[action.trackId].name = action.name;

      return newState;
    case 'CHANGE_SOUND':
      newState = { ...state };

      newGlobalScene = findGlobalScene(global.scenes, action.sceneId);
      newGlobalTrack = findGlobalTrack(newGlobalScene, action.trackId);
      newGlobalTrack.buffer = action.audiobuffer;

      newState.byId[action.trackId.toString()].url = action.url;

      return newState;
    case 'CHANGE_GAIN':
      newState = { ...state };

      newGlobalScene = findGlobalScene(global.scenes, action.sceneId);
      newGlobalTrack = findGlobalTrack(newGlobalScene, action.trackId);
      newGlobalTrack.gain.gain.value = 1 / 127 * action.gain;

      newState.byId[action.trackId.toString()].gain = action.gain;

      return newState;
    case 'SEQ_BUTTON_PRESS':
      newState = { ...state };
      let track = newState.byId[action.trackId.toString()];

      track.sequence[action.position] = track.sequence[action.position] === 0 ? 1 : 0;

      return newState;
    case 'MUTE_TRACK':
      newState = { ...state };

      newState.byId[action.trackId.toString()].mute = !newState.byId[action.trackId.toString()].mute;

      return newState;
    case 'SOLO_TRACK':
      newState = { ...state };

      for (let track in newState.byId) {
        if (newState.byId[track].sceneId !== newState.currentScene) {
          continue;
        }
        if (track === action.trackId.toString()) {
          newState.byId[track].solo = !newState.byId[track].solo;
        }
        else {
          newState.byId[track].solo = false;
        }
      }

      return newState;
    default:
      return state;
  }
};

export default trackReducer;
