const setupWebAudio = () => {
  //Create context
  const context = new (window.AudioContext || window.webkitAudioContext)();
  return context;
}

export default setupWebAudio;
