const setupSocket = (id: string | string[]) => {
  return new Promise<WebSocket>((resolve, reject) => {
    const socket = new WebSocket(`${process.env.NODE_ENV === 'production' ? 'wss' : 'ws'}://${process.env.NEXT_PUBLIC_CONNECTION_URL}/ws/${id}`);
    const timeout = setTimeout(() => {
      reject('Timed out while connecting to server.');
    }, 5000)

    socket.onopen = () => {
      clearTimeout(timeout);
      console.log('Connected to server.');
      resolve(socket);
    }

    socket.onerror = (err) => {
      clearTimeout();
      reject('Failed to connect to server.');
    }
  })
}

export default setupSocket;
