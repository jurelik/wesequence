const socketSetup = (socket) => {
  socket = new WebSocket('ws://localhost:8080');
  socket.onmessage = e => {
    console.log(e.data);
  }
}

export default socketSetup;
