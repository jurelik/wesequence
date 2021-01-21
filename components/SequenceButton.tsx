import { connect } from 'react-redux';
import { CombinedState } from 'redux/store';
import { Button } from '@chakra-ui/react';
import { seqButtonPress } from 'redux/actions';

const SequenceButton = (props: any) => {
  const handleOnClick = () => {
    props.seqButtonPress(props.trackId, props.index, true);
  }

  return (
    <Button size="sm" w="2vw" h="2vw" minW={8} minH={8} mx={1} boxShadow="base" colorScheme={props.value === 1 ? 'blue' : null}onClick={handleOnClick}></Button>
  )
}

const mapStateToProps = (state: CombinedState, ownProps: any) => {
  return {
    value: state.tracks.byId[ownProps.trackId].sequence[ownProps.index]
  }
}

const mapDispatchToProps = {
  seqButtonPress
}

export default connect(mapStateToProps, mapDispatchToProps)(SequenceButton);
