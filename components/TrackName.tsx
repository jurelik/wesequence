import { connect } from 'react-redux';
import { Flex, IconButton, Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { changeTrackName } from 'redux/actions';

const TrackName = (props: any) => {
  const EditableControls = ({ isEditing, onSubmit, onCancel, onEdit }) => {
    return isEditing ? (
      <Flex direction="row" ml={2}>
        <IconButton aria-label="Submit" size="xs" onClick={onSubmit} icon={<FaCheck />}/>
        <IconButton aria-label="Cancel" size="xs" onClick={onCancel} icon={<FaTimes />} />
      </Flex>
    ) : (
      <IconButton aria-label="Change Track Name" size="xs" ml={2} onClick={onEdit} icon={<FaEdit />} variant="ghost"/>
    )
  }

  const handleSubmit = (value: string) => {
    props.changeTrackName(props.sceneId, props.trackId, value, true);
  }

  return (
    <Editable
      defaultValue={props.name}
      isPreviewFocusable={false}
      submitOnBlur={false}
      onSubmit={handleSubmit}
      mb="1px"
      ml="3px"
      fontWeight="bold"
    >
      {(props) => (
        <Flex direction="row" alignItems="center">
          <EditablePreview />
          <EditableInput w={100} />
          <EditableControls {...props} />
        </Flex>
      )}
    </Editable>
  )
}

const mapDispatchToProps = {
  changeTrackName
}

export default connect(null, mapDispatchToProps)(TrackName);
