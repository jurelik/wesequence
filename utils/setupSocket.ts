const setupSocket = (id: string | string[]) => {
  return new Promise<WebSocket>((resolve) => {
    const socket = id ? new WebSocket(`${process.env.NODE_ENV === 'production' ? 'wss' : 'ws'}://${process.env.NEXT_PUBLIC_CONNECTION_URL}/${id}`) : new WebSocket(`${process.env.NODE_ENV === 'production' ? 'wss' : 'ws'}://${process.env.NEXT_PUBLIC_CONNECTION_URL}`);

    socket.onopen = () => {
      console.log('Connected to server.');
      resolve(socket);
    }
  })
}

export default setupSocket;
