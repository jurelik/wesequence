import { connect } from 'react-redux';
import { CombinedState } from 'redux/store';
import { Text, Flex, Icon, IconButton, Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { removeListener, addListener } from 'utils/handlePlayStop';
import { changeTrackName } from 'redux/actions';

const TrackName = (props: any) => {
  const EditableControls = ({ isEditing, onSubmit, onCancel, onEdit }) => {
    return isEditing ? (
      <Flex direction="row" ml={2}>
        <IconButton aria-label="Submit" size="xs" onClick={onSubmit} icon={<Icon as={FaCheck} />}/>
        <IconButton aria-label="Cancel" size="xs" onClick={onCancel} icon={<Icon as={FaTimes} />} />
      </Flex>
    ) : (
      <IconButton aria-label="Change Track Name" size="xs" ml={2} onClick={onEdit} icon={<Icon as={FaEdit} />} variant="ghost"/>
    )
  }

  const handleSubmit = (value: string) => {
    addListener();
    props.changeTrackName(props.trackId, value, true);
  }

  const handleClose = () => {
    addListener();
  }

  return (
    <Editable
      defaultValue={props.name}
      isPreviewFocusable={false}
      submitOnBlur={false}
      onSubmit={handleSubmit}
      onCancel={handleClose}
      mb="1px"
      ml="3px"
      fontWeight="bold"
    >
      {(_props) => (
        <Flex direction="row" alignItems="center">
          <Text paddingY="3px" style={{ display: _props.isEditing ? 'none' : null }}>{props.name}</Text>
          <EditableInput w={100} onFocus={removeListener}/>
          <EditableControls {..._props} />
        </Flex>
      )}
    </Editable>
  )
}

const mapStateToProps = (state: CombinedState, ownProps: any) => {
  return {
    name: state.tracks.byId[ownProps.trackId].name
  }
}

const mapDispatchToProps = {
  changeTrackName
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackName);
