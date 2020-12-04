import socketHandler from 'utils/socketHandler';

const setupSocket = async (socket) => {
  socket = new WebSocket('ws://localhost:8080');

  socket.onopen = e => {
    console.log('Connected to server.');
  }

  socketHandler(socket);
}

export default setupSocket;
