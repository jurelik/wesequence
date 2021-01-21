export type StoreScene = {
  id: number,
  name?: string
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
    case 'ADD_SCENE':
      newState = { ...state };

      newState.byId = { ...newState.byId, [action.sceneId.toString()]: { tracks: [] }};
      newState.allIds = [ ...newState.allIds, action.sceneId.toString() ]

      return newState
    case 'DELETE_SCENE':
      newState = { ...state };

      newState.byId = { ...newState.byId }
      delete newState.byId[action.sceneId];
      newState.allIds = newState.allIds.filter((item: string) => item !== action.sceneId);

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
