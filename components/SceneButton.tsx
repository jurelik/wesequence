import { connect } from 'react-redux';
import { changeScene, deleteScene } from 'redux/actions';

const SceneButton = (props) => {
  const handleSceneButton = () => {
    props.changeScene(props.index);
  }

  const deleteSceneButton = () => {
    props.deleteScene(true, props.sceneId);
  }

  return (
    <div style={{ display: 'inline', marginRight: 20 }}>
      <button onClick={handleSceneButton}>Scene {props.index + 1}</button>
      <button onClick={deleteSceneButton}>x</button>
    </div>
  )
}

const mapDispatchToProps = {
  changeScene,
  deleteScene
}

export default connect(null, mapDispatchToProps)(SceneButton);
