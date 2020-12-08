import { useState, useEffect } from 'react';
import global from 'utils/global';
import setupSocket from 'utils/setupSocket';
import setupWebAudio from 'utils/setupWebAudio';
import socketHandler from 'utils/socketHandler';
import sequencer from 'utils/sequencer';

export default function Room(props) {
  const [state, setState] = useState({
    isPlaying: false,
  });
  const [tempo, setTempo] = useState(global.tempo);

  useEffect(() => {
    const setup = async () => {
      global.context = await setupWebAudio();
      global.socket = await setupSocket(props.id);
      socketHandler();
    }

    setup();
  }, [])

  const handleBtn = () => {
    setState({ ...state, isPlaying: !state.isPlaying });
    global.isPlaying = !state.isPlaying;
    if (global.isPlaying) {
      sequencer('start');
    }
    else {
      sequencer('stop');
    }
  }

  const handleInputChange = event => {
    global.tempo = event.target.value;
    setTempo(event.target.value);
  }

  return (
    <div>
      <button onClick={handleBtn}>play/stop</button>
      <input
        name="bpm"
        type="number"
        value={tempo}
        onChange={handleInputChange}
        />
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const id = params.id;

  return {
    props: { id }, // will be passed to the page component as props
  }
}
