import { connect } from 'react-redux';
import { Button } from '@chakra-ui/react';
import { SequencerStore } from 'redux/rootReducer';
import { seqButtonPress } from 'redux/actions';

const SequenceButton = (props: any) => {
  const handleOnClick = () => {
    props.seqButtonPress(props.sceneId, props.trackId, props.id, true);
  }

  return (
    <Button size="sm" w="2vw" h="2vw" minW={8} minH={8} mx={1} boxShadow="base" colorScheme={props.value === 1 ? 'blue' : props.currentNote === props.id ? 'red' : null} onClick={handleOnClick}></Button>
  )
}

const mapStateToProps = (state: SequencerStore) => {
  return {
    scenes: state.scenes,
    currentNote: state.currentNote
  }
}

const mapDispatchToProps = {
  seqButtonPress
}

export default connect(mapStateToProps, mapDispatchToProps)(SequenceButton);
