import global from 'utils/global';

export const changeTempo = (tempo: number) => ({
  type: 'CHANGE_TEMPO',
  tempo
});

export const changeIsPlaying = (value: boolean) => ({
  type: 'CHANGE_IS_PLAYING',
  value
})

export const handleSeqButtonPress = (trackName: string, position: number) => {
  console.log(global.socket);
  global.socket.send(JSON.stringify({
    type: 'SEQ_BUTTON_PRESS',
    trackName,
    position
  }));

  return {
    type: 'SEQ_BUTTON_PRESS',
    trackName,
    position
  }
}
