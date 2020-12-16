import { connect } from "react-redux";
import { changeSound } from 'redux/actions';

const LoadSound = (props: any) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.changeSound(props.trackName, e.target.files[0]);
  }

  return (
    <input type="file" accept="audio/mp3, audio/wav" onChange={handleFileChange} />
  )
}

const mapDispatchToProps = {
  changeSound
}

export default connect(null, mapDispatchToProps)(LoadSound);
