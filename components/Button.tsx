import { connect } from 'react-redux';
import { handleSeqButtonPress } from 'redux/actions';

const Button = (props: any) => {
  const handleOnClick = () => {
    props.handleSeqButtonPress(props.trackName, props.id);
  }

  return (
    <button onClick={handleOnClick}>{props.value}</button>
  )
}

const mapDispatchToProps = {
  handleSeqButtonPress
}

export default connect(null, mapDispatchToProps)(Button);
