import { connect } from 'react-redux';
import { CombinedState } from 'redux/store';
import { IconButton, Icon, Text } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { addTrack } from 'redux/actions';

const AddTrackButton = (props) => {
  const handleAddTrackButton = () => {
    props.addTrack(props.currentScene, true);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 30 }}>
      <IconButton aria-label="Add Track" icon={<Icon as={FaPlus} color="gray.400"/>} variant="outline" size="lg" onClick={handleAddTrackButton} />
      <Text color="gray.500">Add track</Text>
    </div>
  )
}

const mapStateToProps = (state: CombinedState) => {
  return {
    currentScene: state.scenes.currentScene,
  }
}

export default connect(mapStateToProps, { addTrack })(AddTrackButton);
