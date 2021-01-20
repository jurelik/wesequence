import global, { GlobalTrack, GlobalScene } from 'utils/global';
import { findGlobalTrack, findStoreTrack } from 'utils/findTrack';
import { findGlobalScene, findStoreScene } from 'utils/findScene';

export type StoreScene = {
  id: number,
  name?: string,
  tracks: string[]
};

export type SceneStore = {
  byId: {[name: string]: StoreScene},
  allIds: string[],
  currentScene: string | null
}

type ReduxAction = {
  type: string,
  [key: string]: any
}

const initialState: SceneStore = {
  byId: {},
  allIds: [],
  currentScene: null
}

const sceneReducer = (state = initialState, action: ReduxAction) => {
  let newState;
  let newGlobalScene;

  switch (action.type) {
    case 'INIT':
      newState = { ...state };
      action.scenes.forEach(scene => {
        newState.byId[scene.id] = scene;
        newState.allIds.push(scene.id.toString());
        delete newState.byId[scene.id].id;
      });
      newState.currentScene = newState.allIds[0].toString();
      return newState;
    case 'CHANGE_SCENE':
      return { ...state, currentScene: action.index };
    case 'ADD_TRACK':
      newState = { ...state };
      
      newState.byId[action.sceneId.toString()].tracks.push(action.trackId.toString());

      return newState;
    case 'DELETE_TRACK':
      newState = { ...state };

      const tracks = newState.byId[action.sceneId.toString()].tracks;
      tracks.splice(tracks.indexOf(action.trackId.toString()), 1);

      return newState;
    case 'DELETE_SCENE':
      newState = { ...state };
      //newCurrentScene = state.currentScene;

      //If the deleted scene index is lower than the currentScene index, decrement the currentScene value
      //if (newStoreScenes.indexOf(newStoreScene) <= newCurrentScene && !newStoreScenes[newCurrentScene + 1]) {
      //  newCurrentScene--;
      //}

      newGlobalScene = findGlobalScene(global.scenes, action.sceneId);
      global.scenes.splice(global.scenes.indexOf(newGlobalScene), 1);

      delete newState.byId[action.sceneId];
      newState.allIds.splice(newState.allIds.indexOf(action.sceneId), 1);

      return newState;
    case 'CHANGE_SCENE_NAME':
      newState = { ...state };

      newState.byId[action.sceneId].name = action.name;

      return newState;
    default:
      return state;
  }
};

export default sceneReducer;
