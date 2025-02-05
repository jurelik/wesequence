import global, { GlobalTrack } from 'utils/global';

export type StoreTrack = {
  sceneId: number,
  name: string,
  url?: string,
  sequence: number[],
  gain: number,
  mute: boolean,
  solo: boolean
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
  let newGlobalTrack: GlobalTrack;
  let newState: TrackStore;

  switch (action.type) {
    case 'INIT':
      if (action.err) {
        return state;
      }

      newState = { ...state };
      action.tracks.forEach((track: any) => {
        const id = track.id;

        //Set correct structure
        track.mute = false;
        track.solo = false;
        track.sceneId = track.sceneId.toString();
        delete track.id;

        newState.byId[id] = track;
        newState.allIds = [ ...newState.allIds, id.toString() ];
      });
      return newState;
    case 'ADD_TRACK':
      newState = { ...state };

      newState.byId = { ...newState.byId };
      newState.byId[action.trackId] = {
        sceneId: action.sceneId.toString(),
        name: action.trackName,
        sequence: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        gain: 100,
        mute: false,
        solo: false
      }
      newState.allIds = [ ...newState.allIds, action.trackId.toString() ];

      newGlobalTrack = {
        gain: global.context.createGain()
      }
      newGlobalTrack.gain.connect(global.context.destination);
      newGlobalTrack.gain.gain.value = 1 / 127 * 100;

      global.tracks[action.trackId] = newGlobalTrack;

      return newState;
    case 'DELETE_TRACK':
      newState = { ...state };

      delete global.tracks[action.trackId];

      newState.byId = { ...newState.byId }
      delete newState.byId[action.trackId];
      newState.allIds = newState.allIds.filter((track: string) => track !== action.trackId);

      return newState;
    case 'CHANGE_TRACK_NAME':
      newState = { ...state };

      console.log(newState.byId[action.trackId])
      newState.byId[action.trackId].name = action.name;
      console.log(newState.byId[action.trackId])

      return newState;
    case 'CHANGE_SOUND':
      newState = { ...state };

      global.tracks[action.trackId].buffer = action.audiobuffer;

      newState.byId[action.trackId].url = action.url;

      return newState;
    case 'CHANGE_GAIN':
      newState = { ...state };

      global.tracks[action.trackId].gain.gain.value = 1 / 127 * action.gain;

      newState.byId[action.trackId].gain = action.gain;

      return newState;
    case 'SEQ_BUTTON_PRESS':
      newState = { ...state };

      let sequence = newState.byId[action.trackId].sequence;
      sequence[action.position] = sequence[action.position] === 0 ? 1 : 0;

      return newState;
    case 'MUTE_TRACK':
      newState = { ...state };

      newState.byId[action.trackId].mute = !newState.byId[action.trackId].mute;

      return newState;
    case 'SOLO_TRACK':
      newState = { ...state };

      for (let track in newState.byId) {
        if (newState.byId[track].sceneId !== action.currentScene) {
          continue;
        }
        if (track === action.trackId) {
          newState.byId[track].solo = !newState.byId[track].solo;
        }
        else {
          newState.byId[track].solo = false;
        }
      }

      return newState;
    case 'DUPLICATE_SCENE':
      newState = { ...state };
      action.tracks.forEach((track: any) => {
        const id = track.id;

        //Set correct structure
        track.mute = false;
        track.solo = false;
        track.sceneId = track.sceneId.toString();
        delete track.id;

        newState.byId[id] = track;
        newState.allIds = [ ...newState.allIds, id.toString() ];
      });

      return newState
    default:
      return state;
  }
};

export default trackReducer;
