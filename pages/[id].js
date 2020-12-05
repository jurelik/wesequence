import { useState, useEffect } from 'react';
import setupSocket from 'utils/setupSocket';
import setupWebAudio from 'utils/setupWebAudio';
import socketHandler from 'utils/socketHandler';

let context;
let socket;

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

  const playSound = () => {
    let source = context.createBufferSource();
    source.buffer = state.sounds.kick;
    source.connect(context.destination);
    source.start();
  }

  return (
    <div>
      <button onClick={playSound}>play/stop</button>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const id = params.id;

  return {
    props: { id }, // will be passed to the page component as props
  }
}
