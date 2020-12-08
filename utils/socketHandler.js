import global from 'utils/global';

const socketHandler = () => {
  global.socket.onmessage = async (e) => {
    const data = JSON.parse(e.data);

    switch (data.type) {
      case 'init':
        if (data.sounds.length > 0) {

          //Load sounds
          const sounds = {};
          for (const sound of data.sounds) {
            const sample = await fetch(sound[1]);
            const arraybuffer = await sample.arrayBuffer();
            const audiobuffer = await global.context.decodeAudioData(arraybuffer);
            sounds[sound[0]] = audiobuffer;
          }
          global.sounds = sounds;
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
