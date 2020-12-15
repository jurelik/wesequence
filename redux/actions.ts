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
}

export const changeIsPlaying = (value: boolean) => ({
  type: 'CHANGE_IS_PLAYING',
  value
})

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
}
