import { connect } from 'react-redux';
import { CombinedState } from 'redux/store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import global from 'utils/global';
import setupSocket from 'utils/setupSocket';
import setupWebAudio from 'utils/setupWebAudio';
import socketHandler from 'utils/socketHandler';
import Sequencer from 'components/Sequencer';
import { handleInitError } from 'redux/actions';
import { Spinner } from '@chakra-ui/react';

const Room = (props) => {
  const router = useRouter();

  useEffect(() => {
    const setup = async () => {
      try {
        global.context = setupWebAudio();
        global.socket = await setupSocket(router.query.id);
        socketHandler();
      }
      catch (err) {
        //Handle error
        props.handleInitError(err);
      }
    }

    // Wait until we get the router object populated
    if (router.asPath !== router.route) {
      setup();
    }
  }, [router])

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#eee' }}>
      {props.loading ?
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh' }}>
          <Spinner size="xl" />
        </div>
        : props.err ?
         <p>{props.err}</p>
        : <Sequencer />}
    </div>
  )
}

const mapStateToProps = (state: CombinedState) => {
  return {
    loading: state.root.loading,
    err: state.root.err
  }
}

const mapDispatchToProps = {
  handleInitError
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
