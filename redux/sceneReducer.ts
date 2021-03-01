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
  let newState: SceneStore;

  switch (action.type) {
    case 'INIT':
      if (action.err) {
        return state;
      }

      newState = { ...state };
      action.scenes.forEach((scene: StoreScene) => {
        newState.byId[scene.id] = scene;
        newState.allIds = [ ...newState.allIds, scene.id.toString() ]
        delete newState.byId[scene.id].id;
      });
      newState.currentScene = newState.allIds[0].toString();
      return newState;
    case 'CHANGE_SCENE':
      return { ...state, currentScene: action.sceneId };
    case 'ADD_TRACK':
      newState = { ...state };

      newState.byId[action.sceneId].tracks = [ ...newState.byId[action.sceneId].tracks, action.trackId.toString() ];

      return newState;
    case 'DELETE_TRACK':
      newState = { ...state };

      newState.byId[action.sceneId].tracks = newState.byId[action.sceneId].tracks.filter(track => track !== action.trackId);

      return newState;
    case 'ADD_SCENE':
      newState = { ...state };

      newState.byId = { ...newState.byId, [action.sceneId.toString()]: { tracks: [] }};
      newState.allIds = [ ...newState.allIds, action.sceneId.toString() ]

      return newState
    case 'DELETE_SCENE':
      newState = { ...state };

      newState.byId = { ...newState.byId }
      delete newState.byId[action.sceneId];

      let index = newState.allIds.indexOf(newState.currentScene);
      newState.allIds = newState.allIds.filter((item: string) => item !== action.sceneId);

      //Reasign currentScene to the next scene. If deleted scene was last in the array, reassign it to the one before.
      newState.allIds[index] ? newState.currentScene = newState.allIds[index] : newState.currentScene = newState.allIds[index - 1];

      return newState;
    case 'DUPLICATE_SCENE':
      newState = { ...state };

      newState.byId = { ...newState.byId, [action.scene.id.toString()]: action.scene};
      newState.allIds = [ ...newState.allIds, action.scene.id.toString() ]

      return newState
    case 'CHANGE_SCENE_NAME':
      newState = { ...state };

      newState.byId[action.sceneId].name = action.name;

      return newState;
    default:
      return state;
  }
};

export default sceneReducer;
