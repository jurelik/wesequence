export const changeTempo = (tempo: number) => ({
  type: 'CHANGE_TEMPO',
  tempo
});

export const changeIsPlaying = (value: boolean) => ({
  type: 'CHANGE_IS_PLAYING',
  value
})

export const handleSeqButtonPress = (trackName: string, position: number) => ({
  type: 'SEQ_BUTTON_PRESS',
  trackName,
  position
})
