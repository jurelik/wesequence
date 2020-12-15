import { connect } from 'react-redux';
import { SequencerStore, StoreTrack } from 'redux/rootReducer';
import sequencer from 'utils/sequencer';
import Track from 'components/Track';
import { changeTempo, changeIsPlaying } from 'redux/actions';

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

  const handleTempoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.changeTempo(event.target.value, true);
  }

  return (
    <div>
      <button onClick={handlePlayButton}>play</button>
      <button onClick={handleStopButton}>stop</button>
      <input
        name="bpm"
        type="number"
        value={props.tempo}
        onChange={handleTempoChange}
      />
      {props.scenes.length > 0 ? props.scenes[0].map((track: StoreTrack) => (
        <Track key={track.name} name={track.name} sequence={track.sequence}/>
      )) : null}
    </div>
  )
}

const mapStateToProps = (state: SequencerStore) => {
  return {
    isPlaying: state.isPlaying,
    tempo: state.tempo,
    scenes: state.scenes
  }
}

const mapDispatchToProps = { changeTempo, changeIsPlaying };

export default connect(mapStateToProps, mapDispatchToProps)(Sequencer);
