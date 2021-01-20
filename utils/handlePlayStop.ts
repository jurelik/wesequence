import store from 'redux/store';
import sequencer from 'utils/sequencer';
import { changeIsPlaying } from 'redux/actions';

export const handleSpaceBar = (e) => {
  if (e.key === ' ' && !store.getState().root.isPlaying) {
    handlePlayButton();
  }
  else if (e.key === ' ' && store.getState().root.isPlaying) {
    handleStopButton();
  }
}

export const handlePlayButton = () => {
  if (!store.getState().root.isPlaying) {
    sequencer('start');
  }

  store.dispatch(changeIsPlaying(true));
}

export const handleStopButton = () => {
  if (store.getState().root.isPlaying) {
    sequencer('stop');
  }

  store.dispatch(changeIsPlaying(false));
}

export const removeListener = () => {
  window.removeEventListener('keydown', handleSpaceBar);
}

export const addListener = () => {
  window.addEventListener('keydown', handleSpaceBar);
}
