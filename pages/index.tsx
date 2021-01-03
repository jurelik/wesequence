import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import {} from 'redux/actions';

const Home = () => {
  const router = useRouter();

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

  }

  return (
    <div className={styles.container}>
      <button onClick={handleCreateRoom}>Create a Room</button>
      <p>or</p>
      <div style={{ display: 'flex' }}>
        <input />
        <button>Join a Room</button>
      </div>
    </div>
  )
}

export default Home;
