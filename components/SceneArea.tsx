import { connect } from 'react-redux';
import { CombinedState } from 'redux/store';
import { Icon, IconButton } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import SceneButton from 'components/SceneButton';
import { addScene } from 'redux/actions';

const SceneArea = (props) => {
  const handleAddSceneButton = () => {
    props.addScene(true);
  }

  return (
    <div style={{ display: 'flex', marginBottom: 10, marginLeft: 10 }}>
      {props.oneOrMoreScenes ? Object.keys(props.scenes).map((scene: string, index: number) => (
        <SceneButton key={index} index={index} name={props.scenes[scene].name} sceneId={scene} />
      )) : null}
      <IconButton aria-label="Add Scene" size="sm" onClick={handleAddSceneButton} icon={<Icon as={FaPlus} />} />
    </div>
  )
}

const mapStateToProps = (state: CombinedState) => {
  const oneOrMoreScenes = state.scenes.allIds.length > 0 ? true : false;

  return {
    scenes: state.scenes.byId,
    oneOrMoreScenes
  }
}

const mapDispatchToProps = { addScene };

export default connect(mapStateToProps, mapDispatchToProps)(SceneArea);
