import { connect } from 'react-redux';
import { SequencerStore } from 'redux/rootReducer';
import Button from 'components/Button';
import LoadSound from 'components/LoadSound';
import { deleteTrack } from 'redux/actions';

const Track = (props: any) => {
  const handleDeleteButton = () => {
    props.deleteTrack(props.name, true);
  }

  return (
    <div>
      <p>{props.name}</p>
      {props.sequence.map((step: number, index: number) => (
        <Button key={index} id={index} value={step} trackName={props.name}/>
      ))}
      <LoadSound trackName={props.name}/>
      <button onClick={handleDeleteButton}>x</button>
    </div>
  )
}

const mapDispatchToProps = {
  deleteTrack
}

const mapStateToProps = (state: SequencerStore) => {
  return {
    scene: state.scenes
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Track);
