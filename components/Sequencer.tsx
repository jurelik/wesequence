import { connect } from 'react-redux';
import { SequencerStore, StoreTrack } from 'redux/rootReducer';
import Track from 'components/Track';
import Transport from 'components/Transport';
import SceneArea from 'components/SceneArea';
import DownloadButton from 'components/DownloadButton';

const Sequencer = (props: any) => {
  return (
    <div>
      <header style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
        <Transport />
        <DownloadButton  />
      </header>
      <SceneArea />
      {props.scenes.length > 0 ? props.scenes[props.currentScene].tracks.map((track: StoreTrack) => (
        <Track key={track.id} id={track.id} name={track.name} sceneId={props.scenes[props.currentScene].id} sequence={track.sequence} mute={track.mute} solo={track.solo}/>
      )) : null}
    </div>
  )
}

const mapStateToProps = (state: SequencerStore) => {
  return {
    scenes: state.scenes,
    currentScene: state.currentScene
  }
}

export default connect(mapStateToProps)(Sequencer);
