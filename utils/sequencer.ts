import global, { GlobalTrack } from 'utils/global';
import { StoreTrack } from 'redux/rootReducer';
import store from 'redux/store';

const sequencer = (command: string) => {
  const playSound = (time: number, track: GlobalTrack) => {
    track.source = global.context.createBufferSource();
    track.source.buffer = track.buffer;
    track.source.connect(track.gain);
    track.source.start(time);
  }

  const nextNote = () => {
    let tempo = store.getState().root.tempo > 50 ? store.getState().root.tempo : 50; //Make sure tempo is never lower than 50
    const secondsPerBeat = 60.0 / tempo / 4;

    global.nextNoteTime += secondsPerBeat; // Add beat length to last beat time

    //Advance the beat number, wrap to zero
    global.currentNote++;
    if (global.currentNote === 16) {
      global.currentNote = 0;
    }
  }

  const scheduler = () => {
    const _store = store.getState();
    const scene = _store.scenes.byId[_store.scenes.currentScene];
    const tracks = _store.tracks;

    let soloTrack: StoreTrack;

    console.log(_store)
    //Stop the scheduler if there are no active tracks
    if (scene.tracks.length === 0) {
      global.currentNote = 0;
      clearTimeout(global.timer);
      console.log('No active tracks.');
      return;
    }

    //Check if a track is solo-ed
    scene.tracks.some((track: StoreTrack) => {
      if (_store.tracks.byId[track].solo) {
        soloTrack = _store.tracks.byId[track];
        return true;
      }
    });

    //While there are notes that will need to play before the next interval, schedule them and advance the pointer.
    while (global.nextNoteTime < global.context.currentTime + global.scheduleAheadTime ) {
      if (soloTrack) {
        if (soloTrack.sequence[global.currentNote] === 1 && !soloTrack.mute) {
          //Find the track in the global object and play the sound from there
          const globalTrack = global.scenes[_store.scenes.allIds.indexOf(_store.scenes.currentScene)].tracks.find(_track => _track.id === soloTrack );
          playSound(global.nextNoteTime, globalTrack)
        }
      }
      else {
        for (let track of scene.tracks) {
          if (tracks.byId[track].sequence[global.currentNote] === 1 && !tracks.byId[track].mute) {
            //Find the track in the global object and play the sound from there
            const globalTrack = global.scenes[_store.scenes.allIds.indexOf(_store.scenes.currentScene)].tracks.find(_track => _track.id === track );
            playSound(global.nextNoteTime, globalTrack)
          }
        }
      }
      nextNote();
    }
    global.timer = setTimeout(scheduler, global.lookahead);
  }

  if (command === 'start') {
    //Check if there are any active tracks
    if (store.getState().scenes.allIds.length === 0) {
      console.log('No active tracks.');
      return;
    }

    //Resume if suspended (Chrome suspends the audio context by default on first load)
    if (global.context.state === 'suspended') {
      global.context.resume();
    }

    global.nextNoteTime = global.context.currentTime + 0.05;
    scheduler(); // kick off scheduling
  }
  else {
    global.currentNote = 0;
    clearTimeout(global.timer);
  }
}

export default sequencer;
