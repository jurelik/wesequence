const setupSocket = (id) => {
  return new Promise((resolve) => {
    const socket = id ? new WebSocket(`ws://localhost:8080/${id}`) : new WebSocket('ws://localhost:8080');

    socket.onopen = (e) => {
      console.log('Connected to server.');
      resolve(socket);
    }
  })
}

export default setupSocket;
