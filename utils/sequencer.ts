import global, { GlobalTrack } from 'utils/global';
import store from 'redux/store';

const sequencer = (command: string) => {
  const playSound = (time: number, track: GlobalTrack) => {
    track.source = global.context.createBufferSource();
    track.source.buffer = track.buffer;
    track.source.connect(global.context.destination);
    track.source.start(time);
  }

  const nextNote = () => {
    const secondsPerBeat = 60.0 / store.getState().tempo / 4;

    global.nextNoteTime += secondsPerBeat; // Add beat length to last beat time

      // Advance the beat number, wrap to zero
    global.currentNote++;
    if (global.currentNote === 16) {
      global.currentNote = 0;
    }
  }

  const scheduler = () => {
    // While there are notes that will need to play before the next interval, schedule them and advance the pointer.
    while (global.nextNoteTime < global.context.currentTime + global.scheduleAheadTime ) {
      for (let track of store.getState().scenes[0]) {
        if (track.sequence[global.currentNote] === 1) {
          //Find the track in the global object and play the sound from there
          const globalTrack = global.scenes[0].find(_track => _track.name === track.name );
          playSound(global.nextNoteTime, globalTrack)
        }
      }
      nextNote();
    }
    global.timer = setTimeout(scheduler, global.lookahead);
  }

  if (command === 'start') {
    //Check if there are any active tracks
    if (store.getState().scenes[0].length === 0) {
      console.log('No active tracks.');
      return;
    }

    global.nextNoteTime = global.context.currentTime;
    scheduler(); // kick off scheduling
  }
  else {
    global.currentNote = 0;
    clearTimeout(global.timer);
  }
}

export default sequencer;
