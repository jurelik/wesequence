let tempo = 120;
let currentNote = 0;
let lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
let scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)*
let nextNoteTime = 0.0;
let sequence = [1, 1, 1, 1];
let timerID;
let source;

const sequencer = (command, context, state) => {
  const playSound = (time) => {
    source = context.createBufferSource();
    source.buffer = state.sounds.kick;
    source.connect(context.destination);
    source.start(time);
  }

  const nextNote = () => {
    const secondsPerBeat = 60.0 / tempo;

    nextNoteTime += secondsPerBeat; // Add beat length to last beat time

      // Advance the beat number, wrap to zero
    currentNote++;
    if (currentNote === 4) {
      currentNote = 0;
    }
  }

  const scheduler = () => {
    // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
    while (nextNoteTime < context.currentTime + scheduleAheadTime ) {
      if (sequence[currentNote] === 1) {
        playSound(nextNoteTime)
      }
      nextNote();
    }
    timerID = setTimeout(scheduler, lookahead);
  }

  if (command === 'start') {
    currentNote = 0;
    nextNoteTime = context.currentTime;
    scheduler(); // kick off scheduling
  }
  else {
    clearTimeout(timerID);
  }
}

export default sequencer;
