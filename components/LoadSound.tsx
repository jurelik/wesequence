import { connect } from "react-redux";
import { changeSoundSend } from 'redux/actions';

const LoadSound = (props: any) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files[0].size > 3000000) {
      console.log('File size must be below 2MB.');
      return;
    }
    props.changeSoundSend(props.sceneId, props.trackId, e.target.files[0]);
  }

  return (
    <input type="file" accept="audio/mp3, audio/wav" onChange={handleFileChange} />
  )
}

const mapDispatchToProps = {
  changeSoundSend
}

export default connect(null, mapDispatchToProps)(LoadSound);
