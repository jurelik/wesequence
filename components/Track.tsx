import { connect } from 'react-redux';
import { CombinedState } from 'redux/store';
import { Flex, Button, Icon, IconButton } from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import SequenceButton from 'components/SequenceButton';
import LoadSound from 'components/LoadSound';
import GainSlider from 'components/GainSlider';
import TrackName from 'components/TrackName';
import { deleteTrack, muteTrack, soloTrack } from 'redux/actions';

const Track = (props: any) => {
  const handleMuteButton = () => {
    props.muteTrack(props.trackId);
  }

  const handleSoloButton = () => {
    props.soloTrack(props.trackId);
  }

  const handleDeleteButton = () => {
    props.deleteTrack(props.trackId, true);
  }

  return (
    <div style={{ marginBottom: 10, marginLeft: 10 }}>
      <TrackName trackId={props.trackId} />
      <Flex alignItems="center" justifyContent="flex-start">
        <div>
        {props.sequence.map((step: number, index: number) => (
          <SequenceButton key={index} index={index} trackId={props.trackId}/>
        ))}
        </div>
        <GainSlider trackId={props.trackId}/>
        <LoadSound trackId={props.trackId} />
        <div style={{ marginLeft: 'auto' }}>
          <Button size="xs" onClick={handleMuteButton} fontWeight="bold" colorScheme={props.mute ? 'red' : null}>M</Button>
          <Button size="xs" onClick={handleSoloButton} fontWeight="bold" colorScheme={props.solo ? 'yellow' : null}>S</Button>
          <IconButton aria-label="Delete Track" size="xs" onClick={handleDeleteButton} icon={<Icon as={FaTimes} />} />
        </div>
      </Flex>
    </div>
  )
}

const mapDispatchToProps = {
  deleteTrack,
  muteTrack,
  soloTrack
}

const mapStateToProps = (state: CombinedState, ownProps: any) => {
  return {
    sequence: state.tracks.byId[ownProps.trackId].sequence,
    mute: state.tracks.byId[ownProps.trackId].mute,
    solo: state.tracks.byId[ownProps.trackId].solo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Track);
