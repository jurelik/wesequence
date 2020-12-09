import global from 'utils/global';

const socketHandler = () => {
  global.socket.onmessage = async (e) => {
    const data = JSON.parse(e.data);

    switch (data.type) {
      case 'init':
        if (data.scenes.length > 0) {

          //Load first scene
          //const sounds = {};
          for (const track of data.scenes[0]) {
            const sample = await fetch(track.url);
            const arraybuffer = await sample.arrayBuffer();
            const audiobuffer = await global.context.decodeAudioData(arraybuffer);
            track.buffer = audiobuffer;
            //sounds[sound[0]] = audiobuffer;
          }
          global.scenes[0] = data.scenes[0];
          //global.sounds = sounds;
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
