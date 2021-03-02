import { connect } from 'react-redux';
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, Tooltip, useBreakpointValue } from '@chakra-ui/react';
import { CombinedState } from 'redux/store';
import { changeGain } from 'redux/actions';

const GainSlider = (props: any) => {
  const orientation: "vertical" | "horizontal" = useBreakpointValue({ base: 'vertical', sm: 'horizontal', md: 'horizontal' })
  const handleGainChange = (value: number) => {
    props.changeGain(props.trackId, value, true);
  }

  return (
    <Slider aria-label="volume-slider" w={[0, 150, 150]} h={[150, 0, 0]} mx={3} min={0} max={127} value={props.gain} onChange={handleGainChange} orientation={orientation}>
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
