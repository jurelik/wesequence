const setupSocket = (id: string | string[]) => {
  return new Promise<WebSocket>((resolve) => {
    const socket = id ? new WebSocket(`ws://localhost:8080/${id}`) : new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('Connected to server.');
      resolve(socket);
    }
  })
}

export default setupSocket;
