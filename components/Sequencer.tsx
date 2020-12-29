import { connect } from 'react-redux';
import { SequencerStore, StoreTrack, StoreScene } from 'redux/rootReducer';
import sequencer from 'utils/sequencer';
import Track from 'components/Track';
import SceneButton from 'components/SceneButton';
import { changeTempo, changeIsPlaying, addTrack } from 'redux/actions';

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

  const handleAddButton = () => {
    props.addTrack(props.scenes[props.currentScene].id, true);
  }

  const handleTempoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.changeTempo(parseInt(event.target.value), true);
  }

  return (
    <div>
      <button onClick={handlePlayButton}>play</button>
      <button onClick={handleStopButton}>stop</button>
      <button onClick={handleAddButton}>+</button>
      <input
        name="bpm"
        type="number"
        value={props.tempo}
        onChange={handleTempoChange}
      />
      {props.scenes.length > 0 ? props.scenes.map((scene: StoreScene, index: number) => (
        <SceneButton key={index} index={props.scenes.indexOf(scene)} />
      )) : null}
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

const mapDispatchToProps = { changeTempo, changeIsPlaying, addTrack };

export default connect(mapStateToProps, mapDispatchToProps)(Sequencer);
