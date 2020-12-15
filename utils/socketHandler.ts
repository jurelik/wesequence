import global from 'utils/global';
import store from 'redux/store';
import { seqButtonPress, changeTempo } from 'redux/actions';

const socketHandler = () => {
  global.socket.onmessage = async (e) => {
    const data = JSON.parse(e.data);

    switch (data.type) {
      case 'init':
        if (data.scenes.length > 0) {
          const deepClone = JSON.parse(JSON.stringify(data.scenes));
          store.dispatch({ type: 'INIT', scenes: deepClone });

          //Load buffer into the global object
          for (const track of data.scenes[0]) {
            const sample = await fetch(track.url);
            const arraybuffer = await sample.arrayBuffer();
            const audiobuffer = await global.context.decodeAudioData(arraybuffer);
            track.buffer = audiobuffer;

            //Prevent storing the same information twice
            delete track['url'];
            delete track['sequence'];
          }

          global.scenes[0] = data.scenes[0];
        }
        break;
      case 'SEQ_BUTTON_PRESS':
        store.dispatch(seqButtonPress(data.trackName, data.position, false));
        break;
      case 'CHANGE_TEMPO':
        store.dispatch(changeTempo(data.tempo, false));
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
