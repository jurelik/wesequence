import global from 'utils/global';

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

export const changeSound = (trackId: string, file: File, send: boolean) => {
  return async (dispatch) => {
    // Taken from: https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
    const arraybufferToString = (buf: ArrayBuffer) => {
      return String.fromCharCode.apply(null, new Uint16Array(buf));
    }

    try {
      const arraybuffer = await file.arrayBuffer();
      const arraybufferString = arraybufferToString(arraybuffer);
      const audiobuffer = await global.context.decodeAudioData(arraybuffer);

      if (send) {
        global.socket.send(JSON.stringify({
          type:'CHANGE_SOUND',
          trackId,
          arraybuffer: arraybufferString
        }))
      }

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
