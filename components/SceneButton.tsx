import { connect } from 'react-redux';
import { Flex, Input, Icon, IconButton, Button, ButtonGroup } from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import { SequencerStore } from 'redux/rootReducer';
import { changeScene, deleteScene, changeSceneName } from 'redux/actions';
import ScenePopover from 'components/ScenePopover';

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
        <Button colorScheme={props.index === props.currentScene ? "blue" : null} onClick={handleSceneButton}>{props.name ? props.name : `Scene ${props.index + 1}`}</Button>
        <ScenePopover index={props.index} sceneId={props.sceneId}/>
        {props.scenes.length > 1 &&
          <IconButton aria-label="Delete Scene" colorScheme={props.index === props.currentScene ? "blue" : null} onClick={deleteSceneButton} icon={<Icon as={FaTimes} />} />
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
  deleteScene,
  changeSceneName
}

export default connect(mapStateToProps, mapDispatchToProps)(SceneButton);
