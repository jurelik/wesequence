import { useState } from 'react';
import { connect } from 'react-redux';
import global from 'utils/global';
import sequencer from 'utils/sequencer';
import Track from 'components/Track';
import { changeTempo } from 'redux/actions';

const Sequencer = (props) => {
  const [ state, setState ] = useState({
    isPlaying: false,
    tempo: 120
  })

  const handlePlayButton = () => {
    setState({ ...state, isPlaying: true });

    if (!state.isPlaying) {
      sequencer('start');
    }
  }

  const handleStopButton = () => {
    setState({ ...state, isPlaying: false });

    if (state.isPlaying) {
      sequencer('stop');
    }
  }

  const handleTempoChange = event => {
    //global.tempo = event.target.value;
    //setState({ ...state, tempo: event.target.value });
    props.changeTempo(event.target.value);
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
      {props.scenes.length > 0 ? props.scenes[0].map(track => (
        <Track key={track.name} name={track.name} />
      )) : null}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    tempo: state.tempo,
    scenes: state.scenes
  }
}

const mapDispatchToProps = { changeTempo };

export default connect(mapStateToProps, mapDispatchToProps)(Sequencer);
