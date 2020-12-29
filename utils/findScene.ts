import { GlobalScene, GlobalScenes } from 'utils/global';
import { StoreScene, StoreScenes } from 'redux/rootReducer';

export const findGlobalScene = (scenes: GlobalScenes, sceneId: number) => {
  let scene: GlobalScene;

  scenes.some((_scene: GlobalScene) => {
    if (_scene.id === sceneId) {
      scene = _scene;
      return true;
    }
  });

  return scene;
}

export const findStoreScene = (scenes: StoreScenes, sceneId: number) => {
  let scene: StoreScene;

  scenes.some((_scene: StoreScene) => {
    if (_scene.id === sceneId) {
      scene = _scene;
      return true;
    }
  });

  return scene;
}
