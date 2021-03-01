import { connect } from 'react-redux';
import { CombinedState } from 'redux/store';
import Track from 'components/Track';
import Transport from 'components/Transport';
import SceneArea from 'components/SceneArea';
import DownloadButton from 'components/DownloadButton';
import UserArea from 'components/UserArea';
import AddTrackButton from 'components/AddTrackButton';
import { Icon, Link } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';

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
      <main style={{ width: '98vw', marginLeft: 'auto', marginRight: 'auto' }}>
        <SceneArea />
        {Object.keys(props.tracks).map((track: any) => {
          if (props.tracks[track].sceneId.toString() === props.currentScene) {
            return (
              <Track key={track} trackId={track}/>
            )
          }
        })}
        <AddTrackButton />
      </main>
      <footer style={{ position: 'fixed', bottom: 0, display: 'flex', justifyContent: 'center', width: '100%', backgroundColor: '#eee' }}>
        <p style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: 14, marginBottom: '2px' }}>Made with <Icon as={FaHeart} mx="3px" color="red.600" /> for <Link href="http://compo.thasauce.net/compos/view/2HTS" mx="3px" color="teal.600">2HTS</Link></p>
      </footer>
    </div>
  )
}

const mapStateToProps = (state: CombinedState) => {
  return {
    currentScene: state.scenes.currentScene,
    tracks: state.tracks.byId
  }
}

export default connect(mapStateToProps)(Sequencer);
