import { connect } from 'react-redux';
import { SequencerStore } from 'redux/rootReducer';
import { Icon, Tooltip } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';

const UserArea = (props) => {
  return (
    <Tooltip label={`${props.users} ${props.users === 1 ? 'user' : 'users'} connected.`}>
      <span>
        {
          Array.from({ length: props.users }, (_, key) => <Icon as={FaUser} ml="2px" key={key} />)
        }
      </span>
    </Tooltip>
  )
}

const mapStateToProps = (state: SequencerStore) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(UserArea);
