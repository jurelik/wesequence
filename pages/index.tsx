import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button, Input } from '@chakra-ui/react';
import styles from '../styles/Home.module.css';
import store from 'redux/store';
import global from 'utils/global';

const Home = () => {
  const router = useRouter();
  const [room, setRoom] = useState('');

  useEffect(() => {
    if (global.socket) {
      store.dispatch({ type: 'RESET_ERR_LOADING' });
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

  const handleJoinRoom = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    store.dispatch({ type: 'RESET_ERR_LOADING' });
    router.push(`/${room}`);
  }

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setRoom(e.target.value);
  }

  return (
    <div className={styles.container}>
      <Button size="sm" onClick={handleCreateRoom}>Create a Room</Button>
      <p>or</p>
      <form style={{ display: 'flex' }} onSubmit={handleJoinRoom}>
        <Input size="sm" flex={1} value={room} onChange={handleInputChange}/>
        <Button size="sm" flex={1} type="submit">Join a Room</Button>
      </form>
    </div>
  )
}

export default Home;
