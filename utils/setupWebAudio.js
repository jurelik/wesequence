const setupWebAudio = async (setContext, setSounds) => {
  //Create context
  const context = new (window.AudioContext || window.webkitAudioContext)();
  setContext(context);

  //Load sounds
  const sample = await fetch('kick.wav')
  const arraybuffer = await sample.arrayBuffer();
  const audiobuffer = await context.decodeAudioData(arraybuffer);

  setSounds({
    kick: audiobuffer
  });
}

export default setupWebAudio;
