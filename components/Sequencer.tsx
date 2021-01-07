import { connect } from 'react-redux';
import { SequencerStore, StoreTrack, StoreScene } from 'redux/rootReducer';
import { Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import sequencer from 'utils/sequencer';
import Track from 'components/Track';
import SceneButton from 'components/SceneButton';
import { changeTempo, changeIsPlaying, addTrack, addScene } from 'redux/actions';

const Sequencer = (props: any) => {
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
    <div>
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
        {props.scenes.length > 0 ? props.scenes.map((scene: StoreScene, index: number) => (
          <SceneButton key={index} index={props.scenes.indexOf(scene)} sceneId={scene.id} />
        )) : null}
        <Button size="sm" onClick={handleAddSceneButton}>+</Button>
      </div>
      <h1>Scene {props.currentScene + 1}</h1>
      {props.scenes.length > 0 ? props.scenes[props.currentScene].tracks.map((track: StoreTrack) => (
        <Track key={track.id} id={track.id} name={track.name} sceneId={props.scenes[props.currentScene].id} sequence={track.sequence} mute={track.mute} solo={track.solo}/>
      )) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(Sequencer);
