import { connect } from 'react-redux';
import { Flex, Input, Icon, IconButton, Button, ButtonGroup } from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import { CombinedState } from 'redux/store';
import { changeScene, deleteScene, changeSceneName } from 'redux/actions';
import ScenePopover from 'components/ScenePopover';

const SceneButton = (props) => {
  const handleSceneButton = () => {
    props.changeScene(props.sceneId);
  }

  const deleteSceneButton = () => {
    if (props.moreThanOneScene) {
      props.deleteScene(true, props.sceneId);
    }
  }

  return (
    <div style={{ marginRight: 20 }}>
      <ButtonGroup size="sm" isAttached>
        <Button colorScheme={props.sceneId === props.currentScene ? "blue" : null} onClick={handleSceneButton}>{props.name ? props.name : `Scene ${props.index + 1}`}</Button>
        <ScenePopover index={props.index} sceneId={props.sceneId}/>
        {props.moreThanOneScene &&
          <IconButton aria-label="Delete Scene" colorScheme={props.sceneId === props.currentScene ? "blue" : null} onClick={deleteSceneButton} icon={<Icon as={FaTimes} />} />
        }
      </ButtonGroup>
    </div>
  )
}

const mapStateToProps = (state: CombinedState) => {
  const moreThanOneScene = state.scenes.allIds.length > 1 ? true : false;

  return {
    currentScene: state.scenes.currentScene,
    moreThanOneScene
  }
}

const mapDispatchToProps = {
  changeScene,
  deleteScene,
  changeSceneName
}

export default connect(mapStateToProps, mapDispatchToProps)(SceneButton);
