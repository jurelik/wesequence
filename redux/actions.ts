export const changeTempo = (tempo: number) => ({
  type: 'CHANGE_TEMPO',
  tempo
});

export const changeIsPlaying = (value: boolean) => ({
  type: 'CHANGE_IS_PLAYING',
  value
})
