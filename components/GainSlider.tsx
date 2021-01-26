import { connect } from 'react-redux';
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, Tooltip } from '@chakra-ui/react';
import { CombinedState } from 'redux/store';
import { changeGain } from 'redux/actions';

const GainSlider = (props: any) => {
  const handleGainChange = (value: number) => {
    props.changeGain(props.trackId, value, true);
  }

  return (
    <Slider aria-label="volume-slider" w={150} mx={3} min={0} max={127} value={props.gain} onChange={handleGainChange}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip label={props.gain}>
        <SliderThumb />
      </Tooltip>
    </Slider>
  )
}

const mapStateToProps = (state: CombinedState, ownProps: any) => {
  return {
    gain: state.tracks.byId[ownProps.trackId].gain
  }
}

const mapDispatchToProps = {
  changeGain
}

export default connect(mapStateToProps, mapDispatchToProps)(GainSlider);
