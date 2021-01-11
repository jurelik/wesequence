import { connect } from 'react-redux';
import { SequencerStore, StoreScene } from 'redux/rootReducer';
import { Button } from '@chakra-ui/react';
import SceneButton from 'components/SceneButton';
import { addScene } from 'redux/actions';

const SceneArea = (props) => {
  const handleAddSceneButton = () => {
    props.addScene(true);
  }

  return (
    <div style={{ display: 'flex', marginBottom: 10, marginLeft: 10 }}>
      {props.scenes.length > 0 ? props.scenes.map((scene: StoreScene, index: number) => (
        <SceneButton key={index} index={index} name={scene.name} sceneId={scene.id} />
      )) : null}
      <Button size="sm" onClick={handleAddSceneButton}>+</Button>
    </div>
  )
}

const mapStateToProps = (state: SequencerStore) => {
  return {
    scenes: state.scenes,
  }
}

const mapDispatchToProps = { addScene };

export default connect(mapStateToProps, mapDispatchToProps)(SceneArea);
