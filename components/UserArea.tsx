import { connect } from 'react-redux';
import { CombinedState } from 'redux/store'
import { Icon, Tooltip } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';

const UserArea = (props) => {
  return (
    <Tooltip label={`${props.users} ${props.users === 1 ? 'user' : 'users'} connected.`}>
      <span style={{ display: 'flex', overflow: 'auto', maxWidth: '80px' }}>
        {
          Array.from({ length: props.users }, (_, key) => <Icon as={FaUser} ml="2px" key={key} flexShrink={1} />)
        }
      </span>
    </Tooltip>
  )
}

const mapStateToProps = (state: CombinedState) => {
  return {
    users: state.root.users
  }
}

export default connect(mapStateToProps)(UserArea);
