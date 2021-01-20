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
    props.deleteTrack(props.track.sceneId, props.trackId, true);
  }

  console.log(props.track)
  return (
    <div style={{ marginBottom: 10, marginLeft: 10 }}>
      <TrackName name={props.name} sceneId={props.sceneId} trackId={props.id} />
      <Flex alignItems="center" justifyContent="flex-start">
        <div>
        {props.track.sequence.map((step: number, index: number) => (
          <SequenceButton key={index} id={index} value={step} sceneId={props.track.sceneId} trackId={props.trackId}/>
        ))}
        </div>
        <GainSlider sceneId={props.track.sceneId} trackId={props.trackId}/>
        <LoadSound sceneId={props.track.sceneId} trackId={props.trackId} url={props.track.url}/>
        <div style={{ marginLeft: 'auto' }}>
          <Button size="xs" onClick={handleMuteButton} fontWeight="bold" colorScheme={props.track.mute ? 'red' : null}>M</Button>
          <Button size="xs" onClick={handleSoloButton} fontWeight="bold" colorScheme={props.track.solo ? 'yellow' : null}>S</Button>
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
    track: state.tracks.byId[ownProps.trackId]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Track);
