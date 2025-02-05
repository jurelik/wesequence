import global from 'utils/global';
import { arraybufferToString } from 'utils/arraybuffer';

export const handleInitError = (err: string) => {
  return {
    type: 'INIT',
    err
  }
}

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

export const changeScene = (sceneId: string) => {
  return {
    type: 'CHANGE_SCENE',
    sceneId
  }
}

export const changeSoundSend = (trackId: number, file: File) => {
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
        trackId,
        fileType,
        arraybuffer: arraybufferString
      }))

      dispatch({
        type: 'CHANGE_SOUND',
        trackId,
        audiobuffer,
        url: 'temp'
      });
    }
    catch (err) {
      console.log(err);
    }
  }
}

export const changeSoundReceive = (trackId: number, arraybuffer: ArrayBuffer, url: string) => {
  return async (dispatch) => {
    try {
      const audiobuffer = await global.context.decodeAudioData(arraybuffer);

      dispatch({
        type: 'CHANGE_SOUND',
        trackId,
        audiobuffer,
        url
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

export const deleteTrack = (sceneId: string, trackId: number, send: boolean) => {
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

export const changeTrackName = (trackId: number, name: string, send: boolean) => {
  // Send action via ws
  if (send) {
    global.socket.send(JSON.stringify({
      type: 'CHANGE_TRACK_NAME',
      trackId,
      name
    }));
  }

  return {
    type: 'CHANGE_TRACK_NAME',
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

export const deleteScene = (send: boolean, sceneId: number) => {
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

export const duplicateScene = (send: boolean, sceneId: number, scene: object, tracks: any[] ) => {
  // Send action via ws
  if (send) {
    global.socket.send(JSON.stringify({
      type: 'DUPLICATE_SCENE',
      sceneId
    }));

    return { type: 'DEFAULT' }; // Ignore action
  }

  return {
    type: 'DUPLICATE_SCENE',
    scene,
    tracks
  }
}

export const changeSceneName = (sceneId: number, name: string,  send: boolean) => {
  // Send action via ws
  if (send) {
    global.socket.send(JSON.stringify({
      type: 'CHANGE_SCENE_NAME',
      sceneId,
      name
    }));
  }

  return {
    type: 'CHANGE_SCENE_NAME',
    sceneId,
    name
  }
}

export const muteTrack = (trackId: number) => {
  return {
    type: 'MUTE_TRACK',
    trackId
  }
}

export const soloTrack = (trackId: number) => {
  return (dispatch, getState) => {
    const currentScene = getState().scenes.currentScene;

    dispatch({
      type: 'SOLO_TRACK',
      trackId,
      currentScene
    })
  }}
