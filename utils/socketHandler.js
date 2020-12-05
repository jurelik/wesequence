const socketHandler = (socket, context, state, setState) => {
  socket.onmessage = async (e) => {
    const data = JSON.parse(e.data);

    switch (data.type) {
      case 'init':
        if (data.sounds.length > 0) {
          setState({ ...state, resources: data.sounds });

          //Load sounds
          const sounds = {};
          for (const sound of data.sounds) {
            const sample = await fetch(sound[1]);
            const arraybuffer = await sample.arrayBuffer();
            const audiobuffer = await context.decodeAudioData(arraybuffer);
            sounds[sound[0]] = audiobuffer;
          }
          setState({ ...state, sounds });
        }
        break;
      case 'test':
        console.log('test')
        break;
      default:
        console.log('default');
        break;
    }
  }
}

export default socketHandler;
