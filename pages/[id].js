import { useState, useEffect } from 'react';
import socketSetup from 'utils/socketSetup';

export default function Room() {
  let socket;

  useEffect(() => {
    socketSetup(socket);
  }, [])

  return (
    <div>hello world</div>
  )
}
