import global from 'utils/global';
import { stringToArraybuffer } from 'utils/arraybuffer';
import store from 'redux/store';
import { seqButtonPress, changeSoundReceive, changeTempo, addTrack, deleteTrack, changeGain } from 'redux/actions';

const socketHandler = () => {
  global.socket.onmessage = async (e) => {
    const data = JSON.parse(e.data);

    switch (data.type) {
      case 'init':
        if (data.scenes.length > 0) {
          const deepClone = JSON.parse(JSON.stringify(data.scenes));
          store.dispatch({ type: 'INIT', tempo: data.tempo, scenes: deepClone });

          for (const scene of data.scenes) {
            //Load buffer into the global object
            for (const track of scene) {
              const gainValue = track.gain; //Store the 0-127 value before reassigning it

              if (track.url) {
                const sample = await fetch(track.url);
                const arraybuffer = await sample.arrayBuffer();
                const audiobuffer = await global.context.decodeAudioData(arraybuffer);
                track.buffer = audiobuffer;
              }

              //Create a gain node
              track.gain = global.context.createGain();
              track.gain.connect(global.context.destination);
              track.gain.gain.value = 1 / 127 * gainValue;

              //Prevent storing the same information twice
              delete track['url'];
              delete track['sequence'];
            }
          }

          global.scenes = data.scenes;
        }
        break;
      case 'SEQ_BUTTON_PRESS':
        store.dispatch(seqButtonPress(data.trackId, data.position, false));
        break;
      case 'CHANGE_SOUND':
        //Create buffer
        const arraybuffer = stringToArraybuffer(data.arraybuffer);
        store.dispatch(changeSoundReceive(data.trackId, arraybuffer));
        break;
      case 'CHANGE_TEMPO':
        store.dispatch(changeTempo(data.tempo, false));
        break;
      case 'CHANGE_GAIN':
        store.dispatch(changeGain(data.trackId, data.gain));
        break;
      case 'ADD_TRACK':
        store.dispatch(addTrack(false, data.trackId, data.trackName))
        break;
      case 'DELETE_TRACK':
        store.dispatch(deleteTrack(data.trackId, false))
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
