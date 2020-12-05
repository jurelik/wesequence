const setupWebAudio = async (context) => {
  //Create context
  context = new (window.AudioContext || window.webkitAudioContext)();
  return context;

  ////Load sounds
  //const sample = await fetch('kick.wav')
  //const arraybuffer = await sample.arrayBuffer();
  //const audiobuffer = await context.decodeAudioData(arraybuffer);

  //setSounds({
  //  kick: audiobuffer
  //});
}

export default setupWebAudio;
