import { connect } from 'react-redux';
import { seqButtonPress } from 'redux/actions';

const Button = (props: any) => {
  const handleOnClick = () => {
    props.seqButtonPress(props.trackName, props.id, true);
  }

  return (
    <button onClick={handleOnClick}>{props.value}</button>
  )
}

const mapDispatchToProps = {
  seqButtonPress
}

export default connect(null, mapDispatchToProps)(Button);
