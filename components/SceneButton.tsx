import { connect } from 'react-redux';
import { SequencerStore } from 'redux/rootReducer';
import { changeScene, deleteScene } from 'redux/actions';

const SceneButton = (props) => {
  const handleSceneButton = () => {
    props.changeScene(props.index);
  }

  const deleteSceneButton = () => {
    if (props.scenes.length > 1) {
      props.deleteScene(true, props.sceneId);
    }
  }

  return (
    <div style={{ display: 'inline', marginRight: 20 }}>
      <button onClick={handleSceneButton}>Scene {props.index + 1}</button>
      {props.scenes.length > 1 &&
        <button onClick={deleteSceneButton}>x</button>
      }
    </div>
  )
}

const mapStateToProps = (state: SequencerStore) => {
  return {
    scenes: state.scenes
  }
}

const mapDispatchToProps = {
  changeScene,
  deleteScene
}

export default connect(mapStateToProps, mapDispatchToProps)(SceneButton);
