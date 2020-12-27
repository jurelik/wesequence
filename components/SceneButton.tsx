import { connect } from 'react-redux';
import { changeScene } from 'redux/actions';

const SceneButton = (props) => {
  const handleSceneButton = () => {
    props.changeScene(props.index);
  }

  return (
    <button onClick={handleSceneButton}>Scene {props.index + 1}</button>
  )
}

const mapDispatchToProps = {
  changeScene
}

export default connect(null, mapDispatchToProps)(SceneButton);
