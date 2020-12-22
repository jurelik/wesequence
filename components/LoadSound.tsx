import { connect } from "react-redux";
import { changeSound } from 'redux/actions';

const LoadSound = (props: any) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.changeSound(props.trackId, e.target.files[0], true);
  }

  return (
    <input type="file" accept="audio/mp3, audio/wav" onChange={handleFileChange} />
  )
}

const mapDispatchToProps = {
  changeSound
}

export default connect(null, mapDispatchToProps)(LoadSound);
