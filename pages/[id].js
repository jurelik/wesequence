import { useState, useEffect } from 'react';
import setupSocket from 'utils/setupSocket';
import setupWebAudio from 'utils/setupWebAudio';
import socketHandler from 'utils/socketHandler';
import sequencer from 'utils/sequencer';

let context;
let socket;
let tempo = 400;
let isPlaying = false;
let currentNote = 0;
let lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
let scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)*
let currentPosition = 0;
let nextNoteTime = 0.0;
let notesInQueue = [];
let sequence = [1, 1, 1, 1];
let timerID;
let source;

export default function Room(props) {
  const [state, setState] = useState({});

  useEffect(() => {
    const setup = async () => {
      context = await setupWebAudio();
      socket = await setupSocket(props.id);
      socketHandler(socket, context, state, setState);
    }

    setup();
  }, [])

  const playSound = (time) => {
    source = context.createBufferSource();
    source.buffer = state.sounds.kick;
    source.connect(context.destination);
    source.start(time);
  }

  const handleBtn = () => {
    isPlaying = !isPlaying;

    if (isPlaying) {
      sequencer('start', context, state);
    }
    else {
      sequencer('stop', context, state);
    }
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

  function scheduler() {
    // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
    while (nextNoteTime < context.currentTime + scheduleAheadTime ) {
      if (sequence[currentNote] === 1) {
        playSound(nextNoteTime)
      }
      nextNote();
    }
    timerID = window.setTimeout(scheduler, lookahead);
  }

  return (
    <div>
      <button onClick={handleBtn}>play/stop</button>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const id = params.id;

  return {
    props: { id }, // will be passed to the page component as props
  }
}
