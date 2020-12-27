import global from 'utils/global';
import { arraybufferToString } from 'utils/arraybuffer';

export const changeTempo = (tempo: number, send: boolean) => {
  // Send action via ws
  if (send) {
    global.socket.send(JSON.stringify({
      type: 'CHANGE_TEMPO',
      tempo
    }));
  }

  return {
    type: 'CHANGE_TEMPO',
    tempo
  };
};

export const changeIsPlaying = (value: boolean) => ({
  type: 'CHANGE_IS_PLAYING',
  value
});

export const changeScene = (index: number) => {
  return {
    type: 'CHANGE_SCENE',
    index
  }
}

export const changeSoundSend = (trackId: string, file: File) => {
  return async (dispatch) => {
    try {
      const arraybuffer = await file.arrayBuffer();
      const arraybufferString = arraybufferToString(arraybuffer);
      const audiobuffer = await global.context.decodeAudioData(arraybuffer);

      global.socket.send(JSON.stringify({
        type:'CHANGE_SOUND',
        trackId,
        arraybuffer: arraybufferString
      }))

      dispatch({
        type: 'CHANGE_SOUND',
        trackId,
        audiobuffer
      });
    }
    catch (err) {
      console.log(err);
    }
  }
}

export const changeSoundReceive = (trackId: number, arraybuffer: ArrayBuffer) => {
  return async (dispatch) => {
    try {
      const audiobuffer = await global.context.decodeAudioData(arraybuffer);

      dispatch({
        type: 'CHANGE_SOUND',
        trackId,
        audiobuffer
      });
    }
    catch (err) {
      console.log(err);
    }
  }
}

export const changeGain = (trackId: number, gain: number, send?: boolean) => {
  // Send action via ws
  if (send) {
    global.socket.send(JSON.stringify({
      type: 'CHANGE_GAIN',
      trackId,
      gain
    }));
  }

  return {
    type: 'CHANGE_GAIN',
    trackId,
    gain
  }

}

export const seqButtonPress = (trackId: number, position: number, send: boolean) => {
  // Send action via ws
  if (send) {
    global.socket.send(JSON.stringify({
      type: 'SEQ_BUTTON_PRESS',
      trackId,
      position
    }));
  }

  return {
    type: 'SEQ_BUTTON_PRESS',
    trackId,
    position
  }
};

export const addTrack = (send: boolean, trackId?: number, trackName?: string) => {
  // Send action via ws
  if (send) {
    global.socket.send(JSON.stringify({
      type: 'ADD_TRACK',
    }));

    return { type: 'DEFAULT' }; // Ignore action
  }

  return {
    type: 'ADD_TRACK',
    trackId,
    trackName
  }
}

export const deleteTrack = (trackId: number, send: boolean) => {
  // Send action via ws
  if (send) {
    global.socket.send(JSON.stringify({
      type: 'DELETE_TRACK',
      trackId
    }));
  }

  return {
    type: 'DELETE_TRACK',
    trackId
  }
}

export const muteTrack = (trackId: number) => {
  return {
    type: 'MUTE_TRACK',
    trackId
  }
}

export const soloTrack = (trackId: number) => {
  return {
    type: 'SOLO_TRACK',
    trackId
  }
}
