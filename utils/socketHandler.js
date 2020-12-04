const socketHandler = (socket) => {
  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);

    switch (data.type) {
      case 'init':
        console.log(data.msg);
        break;
      default:
        console.log('default');
        break;
    }
  }
}

export default socketHandler;
