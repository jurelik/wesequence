import global from 'utils/global';
import { stringToArraybuffer } from 'utils/arraybuffer';
import store from 'redux/store';
import { handleInitError, seqButtonPress, changeSoundReceive, changeTempo, addTrack, deleteTrack, changeTrackName, addScene, deleteScene, duplicateScene, changeSceneName, changeGain } from 'redux/actions';

const socketHandler = () => {
  global.socket.onmessage = async (e) => {
    const data = JSON.parse(e.data);

    switch (data.type) {
      case 'ping': //Keep the connection alive by sending pong messages (required by Heroku)
        global.socket.send(JSON.stringify({
          type:'pong',
        }));
        break;
      case 'INIT':
        //Handle error
        if (data.err) {
          console.log(data.err)
          store.dispatch(handleInitError(typeof data.err === 'object' ? JSON.stringify(data.err) : data.err));
          break;
        }

        if (data.scenes.length > 0) {
          const scenesClone = JSON.parse(JSON.stringify(data.scenes));
          const tracksClone = JSON.parse(JSON.stringify(data.tracks));
          let globalTracks = {};

          const users = data.users;
          delete data['users'];

          //Set up scenes
          for (const scene of data.scenes) {
            delete scene['name'];
            scene.tracks = [];
          }

          for (const scene of scenesClone) {
            scene.tracks = [];
          }

          //Set up tracks
          for (const track of data.tracks) {
            const id = track.id;
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
            delete track['id'];

            //Add track id's to scenesClone
            scenesClone.some(scene => {
              if (scene.id === track.sceneId) {
                scene.tracks.push(id.toString());
                return true;
              }
            });

            globalTracks[id] = track;
          }

          global.tracks = globalTracks;
          store.dispatch({ type: 'INIT', tempo: data.tempo, scenes: scenesClone, tracks: tracksClone, users });
        }
        break;
      case 'USER_JOINED':
        store.dispatch({ type: 'USER_JOINED' });
        break;
      case 'USER_LEFT':
        store.dispatch({ type: 'USER_LEFT' });
        break;
      case 'SEQ_BUTTON_PRESS':
        store.dispatch(seqButtonPress(data.trackId, data.position, false));
        break;
      case 'CHANGE_SOUND':
        //Create buffer
        const arraybuffer = stringToArraybuffer(data.arraybuffer);
        store.dispatch(changeSoundReceive(data.trackId, arraybuffer, data.url));
        break;
      case 'CHANGE_TEMPO':
        store.dispatch(changeTempo(data.tempo, false));
        break;
      case 'CHANGE_GAIN':
        store.dispatch(changeGain(data.trackId, data.gain));
        break;
      case 'ADD_TRACK':
        store.dispatch(addTrack(data.sceneId, false, data.trackId, data.trackName))
        break;
      case 'DELETE_TRACK':
        store.dispatch(deleteTrack(data.sceneId, data.trackId, false))
        break;
      case 'CHANGE_TRACK_NAME':
        store.dispatch(changeTrackName(data.trackId, data.name, false));
        break;
      case 'ADD_SCENE':
        store.dispatch(addScene(false, data.sceneId));
        break;
      case 'DELETE_SCENE':
        store.dispatch(deleteScene(false, data.sceneId));
        break;
      case 'DUPLICATE_SCENE':
        const sceneClone = JSON.parse(JSON.stringify(data.scene));
        const tracksClone = JSON.parse(JSON.stringify(data.tracks));

        //Set up scenes
        delete data.scene['name'];
        data.scene.tracks = [];
        sceneClone.tracks = [];

        //Set up tracks
        for (const track of data.tracks) {
          const id = track.id;
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
          delete track['id'];

          //Add track id to scenesClone
          sceneClone.tracks.push(id.toString());
          global.tracks[id] = track;
        }

        store.dispatch(duplicateScene(false, null, sceneClone, tracksClone));
        break;
      case 'CHANGE_SCENE_NAME':
        store.dispatch(changeSceneName(data.sceneId, data.name, false));
        break;
      default:
        console.log('default');
        break;
    }
  }

  global.socket.onclose = () => {
    console.log('Connection to server closed.');
    global.socket = undefined;
  }
}

export default socketHandler;
