import { connect } from 'react-redux';
import { SequencerStore, StoreTrack } from 'redux/rootReducer';
import Track from 'components/Track';
import Transport from 'components/Transport';
import SceneArea from 'components/SceneArea';
import DownloadButton from 'components/DownloadButton';
import UserArea from 'components/UserArea';

const Sequencer = (props: any) => {
  return (
    <div>
      <header style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', marginBottom: 10 }}>
        <div style={{ flex: 1 }}>
          {/*Empty div to used for align purposes*/}
        </div>
        <Transport />
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
          <UserArea />
          <DownloadButton  />
        </div>
      </header>
      <main>
        <SceneArea />
        {props.scenes.length > 0 ? props.scenes[props.currentScene].tracks.map((track: StoreTrack) => (
          <Track key={track.id} id={track.id} name={track.name} sceneId={props.scenes[props.currentScene].id} sequence={track.sequence} mute={track.mute} solo={track.solo}/>
        )) : null}
      </main>
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
