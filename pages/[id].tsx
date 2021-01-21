import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import global from 'utils/global';
import setupSocket from 'utils/setupSocket';
import setupWebAudio from 'utils/setupWebAudio';
import socketHandler from 'utils/socketHandler';
import Sequencer from 'components/Sequencer';
import { SequencerStore } from 'redux/rootReducer'
import { handleInitError } from 'redux/actions';

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
    <div>
      {props.loading ?
        <p>loading</p>
        : props.err ?
         <p>{props.err}</p>
        : <Sequencer />}
    </div>
  )
}

const mapStateToProps = (state: SequencerStore) => {
  return {
    loading: state.root.loading,
    err: state.root.err
  }
}

const mapDispatchToProps = {
  handleInitError
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
