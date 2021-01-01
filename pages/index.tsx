import styles from '../styles/Home.module.css';

export default function Home() {
  const handleCreateRoom = () => {

  }

  const handleJoinRoom = () => {

  }

  return (
    <div className={styles.container}>
      <button>Create a Room</button>
      <p>or</p>
      <div style={{ display: 'flex' }}>
        <input />
        <button>Join a Room</button>
      </div>
    </div>
  )
}
