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

export const changeSound = (trackName: string, file: File) => {
  return async (dispatch) => {
    try {
      const arraybuffer = await file.arrayBuffer();
      const audiobuffer = await global.context.decodeAudioData(arraybuffer);

      dispatch({
        type: 'CHANGE_SOUND',
        trackName,
        audiobuffer
      });
    }
    catch (err) {
      console.log(err);
    }
  }
}

export const seqButtonPress = (trackName: string, position: number, send: boolean) => {
  // Send action via ws
  if (send) {
    global.socket.send(JSON.stringify({
      type: 'SEQ_BUTTON_PRESS',
      trackName,
      position
    }));
  }

  return {
    type: 'SEQ_BUTTON_PRESS',
    trackName,
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

export const deleteTrack = (trackName: string, send: boolean) => {
  // Send action via ws
  if (send) {
    global.socket.send(JSON.stringify({
      type: 'DELETE_TRACK',
      trackName
    }));
  }

  return {
    type: 'DELETE_TRACK',
    trackName
  }
}
