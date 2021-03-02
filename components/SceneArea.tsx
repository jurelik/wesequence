import { connect } from 'react-redux';
import { CombinedState } from 'redux/store';
import { Flex, Icon, IconButton } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import SceneButton from 'components/SceneButton';
import { addScene } from 'redux/actions';

const SceneArea = (props) => {
  const handleAddSceneButton = () => {
    props.addScene(true);
  }

  return (
    <Flex style={{ marginBottom: 5, marginLeft: 10 }} wrap='wrap'>
      {props.oneOrMoreScenes ? props.allIds.map((scene: string, index: number) => (
        <SceneButton key={index} index={index} sceneId={scene} />
      )) : null}
      <IconButton aria-label="Add Scene" size="sm" onClick={handleAddSceneButton} icon={<Icon as={FaPlus} />} />
    </Flex>
  )
}

const mapStateToProps = (state: CombinedState) => {
  const oneOrMoreScenes = state.scenes.allIds.length > 0 ? true : false;

  return {
    allIds: state.scenes.allIds,
    oneOrMoreScenes
  }
}

const mapDispatchToProps = { addScene };

export default connect(mapStateToProps, mapDispatchToProps)(SceneArea);
