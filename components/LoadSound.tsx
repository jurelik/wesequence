import { connect } from "react-redux";
import { CombinedState } from 'redux/store';
import { useRef } from 'react';
import { Button } from '@chakra-ui/react';
import { changeSoundSend } from 'redux/actions';

const LoadSound = (props: any) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files[0].size > 2000000) {
      console.log('File size must be below 2MB.');
      return;
    }
    props.changeSoundSend(props.trackId, e.target.files[0]);
  }

  const handleUploadClick = () => {
    inputRef.current.click();
  }

  return (
    <div style={{ flex: 1, marginRight: 10 }}>
      <input ref={inputRef} type="file" style={{ display: 'none' }} accept="audio/mp3, audio/wav" onChange={handleFileChange} />
      <Button size="sm" colorScheme={props.url ? "green" : "red"} variant="outline" style={{ width: '100%' }}onClick={handleUploadClick}>{props.url ? 'Sound Loaded' : 'Upload File'}</Button>
    </div>
  )
}

const mapStateToProps = (state: CombinedState, ownProps: any) => {
  return {
    url: state.tracks.byId[ownProps.trackId].url
  }
}

const mapDispatchToProps = {
  changeSoundSend
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadSound);
