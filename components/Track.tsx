import { connect } from 'react-redux';
import { useState } from 'react';
import { SequencerStore } from 'redux/rootReducer';
import { Flex, Button, Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import SequenceButton from 'components/SequenceButton';
import LoadSound from 'components/LoadSound';
import GainSlider from 'components/GainSlider';
import TrackName from 'components/TrackName';
import { deleteTrack, muteTrack, soloTrack } from 'redux/actions';

const Track = (props: any) => {
  const handleMuteButton = () => {
    props.muteTrack(props.id);
  }

  const handleSoloButton = () => {
    props.soloTrack(props.id);
  }

  const handleDeleteButton = () => {
    props.deleteTrack(props.sceneId, props.id, true);
  }

  return (
    <div style={{ marginBottom: 10, marginLeft: 10 }}>
      <TrackName name={props.name} sceneId={props.sceneId} trackId={props.id} />
      <Flex alignItems="center">
        {props.sequence.map((step: number, index: number) => (
          <SequenceButton key={index} id={index} value={step} sceneId={props.sceneId} trackId={props.id}/>
        ))}
        <GainSlider sceneId={props.sceneId} trackId={props.id}/>
        <LoadSound sceneId={props.sceneId} trackId={props.id}/>
        <Button size="xs" onClick={handleMuteButton} style={{ backgroundColor: props.mute ? 'red' : null }}>M</Button>
        <Button size="xs" onClick={handleSoloButton} style={{ backgroundColor: props.solo ? 'yellow' : null }}>S</Button>
        <Button size="xs" onClick={handleDeleteButton}>x</Button>
      </Flex>
    </div>
  )
}

const mapDispatchToProps = {
  deleteTrack,
  muteTrack,
  soloTrack
}

const mapStateToProps = (state: SequencerStore) => {
  return {
    scenes: state.scenes
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Track);
