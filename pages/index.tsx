import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import store from 'redux/store';
import global from 'utils/global';

const Home = () => {
  const router = useRouter();
  const [room, setRoom] = useState('');

  useEffect(() => {
    if (global.socket) {
      global.socket.close();
    }
  }, [])

  const handleCreateRoom = async () => {
    try {
      const _res = await fetch(`${process.env.NODE_ENV === 'production' ? 'https' : 'http'}://${process.env.NEXT_PUBLIC_CONNECTION_URL}/api/create`);
      const res = await _res.json();

      if (res.type === 'SUCCESS') {
        router.push(`/${res.name}`);
      }
      else {
        throw res.err;
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleJoinRoom = () => {
    store.dispatch({ type: 'RESET_ERR_LOADING' });
    router.push(`/${room}`);
  }

  const handleInputChange = (e) => {
    setRoom(e.target.value);
  }

  return (
    <div className={styles.container}>
      <button onClick={handleCreateRoom}>Create a Room</button>
      <p>or</p>
      <div style={{ display: 'flex' }}>
        <input value={room} onChange={handleInputChange}/>
        <button onClick={handleJoinRoom}>Join a Room</button>
      </div>
    </div>
  )
}

export default Home;
