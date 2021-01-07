import { connect } from 'react-redux';
import { Button } from '@chakra-ui/react';
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
      <Button size="sm" onClick={handleSceneButton}>Scene {props.index + 1}</Button>
      {props.scenes.length > 1 &&
        <Button size="sm" onClick={deleteSceneButton}>x</Button>
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
