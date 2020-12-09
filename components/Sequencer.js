import { useState } from 'react';
import global from 'utils/global';
import sequencer from 'utils/sequencer';

const Sequencer = () => {
  const [ state, setState ] = useState({
    isPlaying: false,
    tempo: 120
  })

  const handlePlayButton = () => {
    setState({ ...state, isPlaying: true });

    if (!state.isPlaying) {
      sequencer('start');
    }
  }

  const handleStopButton = () => {
    setState({ ...state, isPlaying: false });

    if (state.isPlaying) {
      sequencer('stop');
    }
  }

  const handleTempoChange = event => {
    global.tempo = event.target.value;
    setState({ ...state, tempo: event.target.value });
  }

  return (
    <div>
      <button onClick={handlePlayButton}>play</button>
      <button onClick={handleStopButton}>stop</button>
      <input
        name="bpm"
        type="number"
        value={state.tempo}
        onChange={handleTempoChange}
      />
    </div>
  )
}

export default Sequencer;
