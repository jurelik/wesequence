import { connect } from 'react-redux';
import { Button, ButtonGroup } from '@chakra-ui/react';
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
    <div style={{ marginRight: 20 }}>
      <ButtonGroup size="sm" isAttached>
        <Button colorScheme={props.index === props.currentScene ? "blue" : null} onClick={handleSceneButton}>Scene {props.index + 1}</Button>
        {props.scenes.length > 1 &&
          <Button colorScheme={props.index === props.currentScene ? "blue" : null} onClick={deleteSceneButton}>x</Button>
        }
      </ButtonGroup>
    </div>
  )
}

const mapStateToProps = (state: SequencerStore) => {
  return {
    scenes: state.scenes,
    currentScene: state.currentScene
  }
}

const mapDispatchToProps = {
  changeScene,
  deleteScene
}

export default connect(mapStateToProps, mapDispatchToProps)(SceneButton);
