import { useState, useEffect } from 'react';
import setupSocket from 'utils/setupSocket';
import setupWebAudio from 'utils/setupWebAudio';

export default function Room() {
  let socket;
  const [context, setContext] = useState(null);
  const [sounds, setSounds] = useState({});

  useEffect(() => {
    setupSocket(socket);
    setupWebAudio(setContext, setSounds);
  }, [])

  const playSound = () => {
    console.log(context)
    let source = context.createBufferSource();
    source.buffer = sounds.kick;
    source.connect(context.destination);
    source.start();
  }

  return (
    <div>
      <button onClick={playSound}>play/stop</button>
    </div>
  )
}
