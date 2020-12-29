import { connect } from 'react-redux';
import { SequencerStore } from 'redux/rootReducer';
import { seqButtonPress } from 'redux/actions';

const Button = (props: any) => {
  const handleOnClick = () => {
    props.seqButtonPress(props.sceneId, props.trackId, props.id, true);
  }

  return (
    <button onClick={handleOnClick}>{props.value}</button>
  )
}

const mapStateToProps = (state: SequencerStore) => {
  return {
    scenes: state.scenes
  }
}

const mapDispatchToProps = {
  seqButtonPress
}

export default connect(mapStateToProps, mapDispatchToProps)(Button);
