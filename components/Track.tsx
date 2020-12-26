import { connect } from 'react-redux';
import { SequencerStore } from 'redux/rootReducer';
import Button from 'components/Button';
import LoadSound from 'components/LoadSound';
import GainSlider from 'components/GainSlider';
import { deleteTrack, muteTrack } from 'redux/actions';

const Track = (props: any) => {
  const handleMuteButton = () => {
    props.muteTrack(props.id);
  }

  const handleDeleteButton = () => {
    props.deleteTrack(props.id, true);
  }

  return (
    <div>
      <p>{props.name}</p>
      {props.sequence.map((step: number, index: number) => (
        <Button key={index} id={index} value={step} trackId={props.id}/>
      ))}
      <GainSlider trackId={props.id}/>
      <LoadSound trackId={props.id}/>
      <button onClick={handleMuteButton} style={{ backgroundColor: props.mute ? 'red' : null }}>M</button>
      <button onClick={handleDeleteButton}>x</button>
    </div>
  )
}

const mapDispatchToProps = {
  deleteTrack,
  muteTrack
}

const mapStateToProps = (state: SequencerStore) => {
  return {
    scene: state.scenes
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Track);
