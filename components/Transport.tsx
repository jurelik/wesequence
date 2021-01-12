import { connect } from 'react-redux';
import { useState } from 'react';
import { SequencerStore } from 'redux/rootReducer';
import { Icon, IconButton, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import { FaPlay, FaStop, FaPlus } from 'react-icons/fa';
import sequencer from 'utils/sequencer';
import { changeTempo, changeIsPlaying, addTrack, addScene } from 'redux/actions';

const Transport = (props) => {
  const [firstLoad, setFirstLoad] = useState(true);

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

  const handleTempoChange = (valueStr: string, valueNum: number) => {
    if(firstLoad) {
      return setFirstLoad(false);
    }

    props.changeTempo(valueNum, true);
  }

  return (
    <div style={{ display: 'flex' }}>
      <IconButton aria-label="Play" size="xs" onClick={handlePlayButton} icon={<Icon as={FaPlay} color={props.isPlaying ? "green.300" : null}/>}/>
      <IconButton aria-label="Stop" size="xs" onClick={handleStopButton} icon={<Icon as={FaStop} />} />
      <IconButton aria-label="Add Track" size="xs" onClick={handleAddTrackButton} icon={<Icon as={FaPlus} />} />
      <NumberInput
        size="xs"
        w={100}
        focusInputOnChange={false}
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
