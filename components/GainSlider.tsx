import { connect } from 'react-redux';
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';
import { SequencerStore } from 'redux/rootReducer';
import { changeGain } from 'redux/actions';

const GainSlider = (props: any) => {
  const handleGainChange = (value: number) => {
    props.changeGain(props.sceneId, props.trackId, value, true);
  }

  return (
    <Slider aria-label="volume-slider" w={150} mx={3} min={0} max={127} value={props.gain} onChange={handleGainChange}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
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
