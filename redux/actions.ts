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

export const changeSoundSend = (sceneId: number, trackId: number, file: File) => {
  return async (dispatch) => {
    try {
      //Get file type
      let fileType: string;

      if (file.type === 'audio/wav' || file.type === 'audio/x-wav') {
        fileType = 'audio/wav';
      }
      else if (file.type === 'audio/mpeg') {
        fileType = 'audio/mpeg';
      }
      else {
        throw 'Wrong file type.';
      }

      const arraybuffer = await file.arrayBuffer();
      const arraybufferString = arraybufferToString(arraybuffer);
      const audiobuffer = await global.context.decodeAudioData(arraybuffer);

      global.socket.send(JSON.stringify({
        type:'CHANGE_SOUND',
        sceneId,
        trackId,
        fileType,
        arraybuffer: arraybufferString
      }))

      dispatch({
        type: 'CHANGE_SOUND',
        sceneId,
        trackId,
        audiobuffer
      });
    }
    catch (err) {
      console.log(err);
    }
  }
}

export const changeSoundReceive = (sceneId: number, trackId: number, arraybuffer: ArrayBuffer) => {
  return async (dispatch) => {
    try {
      const audiobuffer = await global.context.decodeAudioData(arraybuffer);

      dispatch({
        type: 'CHANGE_SOUND',
        sceneId,
        trackId,
        audiobuffer
      });
    }
    catch (err) {
      console.log(err);
    }
  }
}

export const changeGain = (sceneId: number, trackId: number, gain: number, send?: boolean) => {
  // Send action via ws
  if (send) {
    global.socket.send(JSON.stringify({
      type: 'CHANGE_GAIN',
      sceneId,
      trackId,
      gain
    }));
  }

  return {
    type: 'CHANGE_GAIN',
    sceneId,
    trackId,
    gain
  }

}

export const seqButtonPress = (sceneId: number, trackId: number, position: number, send: boolean) => {
  // Send action via ws
  if (send) {
    global.socket.send(JSON.stringify({
      type: 'SEQ_BUTTON_PRESS',
      sceneId,
      trackId,
      position
    }));
  }

  return {
    type: 'SEQ_BUTTON_PRESS',
    sceneId,
    trackId,
    position
  }
};

export const addTrack = (sceneId: number, send: boolean, trackId?: number, trackName?: string) => {
  // Send action via ws
  if (send) {
    global.socket.send(JSON.stringify({
      type: 'ADD_TRACK',
      sceneId
    }));

    return { type: 'DEFAULT' }; // Ignore action
  }

  return {
    type: 'ADD_TRACK',
    sceneId,
    trackId,
    trackName
  }
}

export const deleteTrack = (sceneId: number,trackId: number, send: boolean) => {
  // Send action via ws
  if (send) {
    global.socket.send(JSON.stringify({
      type: 'DELETE_TRACK',
      sceneId,
      trackId
    }));
  }

  return {
    type: 'DELETE_TRACK',
    sceneId,
    trackId
  }
}

export const changeTrackName = (sceneId: number, trackId: number, name: string, send: boolean) => {
  // Send action via ws
  if (send) {
    global.socket.send(JSON.stringify({
      type: 'CHANGE_TRACK_NAME',
      sceneId,
      trackId,
      name
    }));
  }

  return {
    type: 'CHANGE_TRACK_NAME',
    sceneId,
    trackId,
    name
  }
}

export const addScene = (send: boolean, sceneId?: number) => {
  // Send action via ws
  if (send) {
    global.socket.send(JSON.stringify({
      type: 'ADD_SCENE',
    }));

    return { type: 'DEFAULT' }; // Ignore action
  }

  return {
    type: 'ADD_SCENE',
    sceneId,
  }
}

export const deleteScene = (send: boolean, sceneId?: number) => {
  // Send action via ws
  if (send) {
    global.socket.send(JSON.stringify({
      type: 'DELETE_SCENE',
      sceneId
    }));
  }

  return {
    type: 'DELETE_SCENE',
    sceneId
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
