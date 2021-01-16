import store from 'redux/store';
import sequencer from 'utils/sequencer';
import { changeIsPlaying } from 'redux/actions';

export const handleSpaceBar = (e) => {
  if (e.key === ' ' && !store.getState().isPlaying) {
    handlePlayButton();
  }
  else if (e.key === ' ' && store.getState().isPlaying) {
    handleStopButton();
  }
}

export const handlePlayButton = () => {
  if (!store.getState().isPlaying) {
    sequencer('start');
  }

  store.dispatch(changeIsPlaying(true));
}

export const handleStopButton = () => {
  if (store.getState().isPlaying) {
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
