import { connect } from 'react-redux';
import { Flex, Button, Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import { changeTrackName } from 'redux/actions';

const TrackName = (props: any) => {
  const EditableControls = ({ isEditing, onSubmit, onCancel, onEdit }) => {
    return isEditing ? (
      <Button size="sm" onClick={onSubmit}>submit</Button>
    ) : (
      <Button size="sm" onClick={onEdit}>edit </Button>
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
      >
        {(props) => (
          <Flex direction="row">
            <EditablePreview />
            <EditableInput w={200}/>
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
