import { connect } from 'react-redux';
import { SequencerStore, StoreScene } from 'redux/rootReducer';
import { Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import sequencer from 'utils/sequencer';
import SceneButton from 'components/SceneButton';
import { changeTempo, changeIsPlaying, addTrack, addScene } from 'redux/actions';

const Transport = (props) => {
  const handlePlayButton = () => {
    if (!props.isPlaying) {
      sequencer('start');
    }

    props.changeIsPlaying(true);
  }

  const handleStopButton = () => {
    if (props.isPlaying) {
      sequencer('stop');
    }

    props.changeIsPlaying(false);
  }

  const handleAddTrackButton = () => {
    props.addTrack(props.scenes[props.currentScene].id, true);
  }

  const handleAddSceneButton = () => {
    props.addScene(true);
  }

  const handleTempoChange = (event: string) => {
    props.changeTempo(parseInt(event), true);
  }

  return (
    <div style={{ display: 'flex' }}>
      <Button size="sm" onClick={handlePlayButton}>play</Button>
      <Button size="sm" onClick={handleStopButton}>stop</Button>
      <Button size="sm" onClick={handleAddTrackButton}>+</Button>
      <NumberInput
        size="sm"
        w={100}
        focusInputOnChange={false}
        name="bpm"
        type="number"
        value={props.tempo}
        onChange={handleTempoChange}
        style={{ marginRight: 20 }}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </div>
  )
}

const mapStateToProps = (state: SequencerStore) => {
  return {
    isPlaying: state.isPlaying,
    tempo: state.tempo,
    scenes: state.scenes,
    currentScene: state.currentScene
  }
}

const mapDispatchToProps = { changeTempo, changeIsPlaying, addTrack, addScene };

export default connect(mapStateToProps, mapDispatchToProps)(Transport);
