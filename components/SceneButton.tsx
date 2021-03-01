import { connect } from 'react-redux';
import { Icon, IconButton, Button, ButtonGroup } from '@chakra-ui/react';
import { FaTimes, FaClone } from 'react-icons/fa';
import { CombinedState } from 'redux/store';
import { changeScene, deleteScene, duplicateScene, changeSceneName } from 'redux/actions';
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

  const duplicateSceneButton = () => {
    props.duplicateScene(true, props.sceneId);
  }

  return (
    <div style={{ marginRight: 20 }}>
      <ButtonGroup size="sm" isAttached>
        <Button colorScheme={props.sceneId === props.currentScene ? "blue" : null} onClick={handleSceneButton}>{props.name ? props.name : `Scene ${props.index + 1}`}</Button>
        <ScenePopover index={props.index} sceneId={props.sceneId}/>
        <IconButton aria-label="Duplicate Scene" colorScheme={props.sceneId === props.currentScene ? "blue" : null} onClick={duplicateSceneButton} icon={<Icon as={FaClone} />} />
        {props.moreThanOneScene &&
          <IconButton aria-label="Delete Scene" colorScheme={props.sceneId === props.currentScene ? "blue" : null} onClick={deleteSceneButton} icon={<Icon as={FaTimes} />} />
        }
      </ButtonGroup>
    </div>
  )
}

const mapStateToProps = (state: CombinedState, ownProps: any) => {
  const moreThanOneScene = state.scenes.allIds.length > 1 ? true : false;

  return {
    currentScene: state.scenes.currentScene,
    name: state.scenes.byId[ownProps.sceneId].name,
    moreThanOneScene
  }
}

const mapDispatchToProps = {
  changeScene,
  deleteScene,
  duplicateScene,
  changeSceneName
}

export default connect(mapStateToProps, mapDispatchToProps)(SceneButton);
