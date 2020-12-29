import { connect } from 'react-redux';
import { SequencerStore } from 'redux/rootReducer';
import { changeGain } from 'redux/actions';

const GainSlider = (props: any) => {
  const handleGainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.changeGain(props.sceneId, props.trackId, parseInt(e.target.value), true);
  }

  return (
    <input type="range" min={0} max={127} value={props.gain} onChange={handleGainChange} />
  )
}

const mapStateToProps = (state: SequencerStore, ownProps: any) => {
  let gain: number;

  state.scenes[state.currentScene].tracks.some(track => {
    if (track.id === ownProps.trackId) {
      gain = track.gain;
      return true;
    }
  })

  return {
    gain
  }
}

const mapDispatchToProps = {
  changeGain
}

export default connect(mapStateToProps, mapDispatchToProps)(GainSlider);
