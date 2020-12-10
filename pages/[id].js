import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import global from 'utils/global';
import setupSocket from 'utils/setupSocket';
import setupWebAudio from 'utils/setupWebAudio';
import socketHandler from 'utils/socketHandler';
import Sequencer from 'components/Sequencer';

const Room = (props) => {
  const router = useRouter();

  useEffect(() => {
    const setup = async () => {
      global.context = await setupWebAudio();
      global.socket = await setupSocket(router.query.id);
      socketHandler();
    }

    // Wait until we get the router object populated
    if (router.asPath !== router.route) {
      setup();
    }
  }, [router])

  return (
    <div>
      <p>{props.tempo}</p>
      <Sequencer />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    tempo: state.tempo
  }
}

export default connect(mapStateToProps)(Room);
