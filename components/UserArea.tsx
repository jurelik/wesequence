import { Icon, Tooltip } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';

const UserArea = () => {
  return (
    <Tooltip label="1 user connected.">
      <span>
        <Icon as={FaUser}/>
      </span>
    </Tooltip>
  )
}

export default UserArea;
