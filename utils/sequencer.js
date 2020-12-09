import global from 'utils/global';

const sequencer = (command) => {
  const playSound = (time, track) => {
    track.source = global.context.createBufferSource();
    track.source.buffer = track.buffer;
    track.source.connect(global.context.destination);
    track.source.start(time);
  }

  const nextNote = () => {
    const secondsPerBeat = 60.0 / global.tempo / 4;

    global.nextNoteTime += secondsPerBeat; // Add beat length to last beat time

      // Advance the beat number, wrap to zero
    global.currentNote++;
    if (global.currentNote === 16) {
      global.currentNote = 0;
    }
  }

  const scheduler = () => {
    // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
    while (global.nextNoteTime < global.context.currentTime + global.scheduleAheadTime ) {
      for (let track of global.scenes[0]) {
        if (track.sequence[global.currentNote] === 1) {
          playSound(global.nextNoteTime, track)
        }
      }
      nextNote();
    }
    global.timer = setTimeout(scheduler, global.lookahead);
  }

  if (command === 'start') {
    global.nextNoteTime = global.context.currentTime;
    scheduler(); // kick off scheduling
  }
  else {
    global.currentNote = 0;
    clearTimeout(global.timer);
  }
}

export default sequencer;
