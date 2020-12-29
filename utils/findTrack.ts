import { GlobalTrack, GlobalScene } from 'utils/global';
import { StoreTrack, StoreScene } from 'redux/rootReducer';

export const findGlobalTrack = (scene: GlobalScene, trackId: number) => {
  let track: GlobalTrack;

  scene.tracks.some((_track: GlobalTrack) => {
    if (_track.id === trackId) {
      track = _track;
      return true;
    }
  });

  return track;
}

export const findStoreTrack = (scene: StoreScene, trackId: number) => {
  let track: StoreTrack;

  scene.tracks.some((_track: StoreTrack) => {
    if (_track.id === trackId) {
      track = _track;
      return true;
    }
  });

  return track;
}
