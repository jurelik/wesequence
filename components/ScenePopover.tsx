import { connect } from 'react-redux';
import { useRef } from 'react';
import { Flex, Input, Icon, IconButton, Popover, PopoverBody, PopoverTrigger, PopoverContent, PopoverArrow } from '@chakra-ui/react';
import { FaEdit, FaCheck } from 'react-icons/fa';
import { SequencerStore } from 'redux/rootReducer';
import { removeListener, addListener } from 'utils/handlePlayStop';
import { changeSceneName } from 'redux/actions';

const ScenePopover = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChangeName = (e:React.FormEvent<HTMLFormElement>, onClose: Function) => {
    e.preventDefault();
    props.changeSceneName(props.sceneId, inputRef.current.value, true);

    onClose();
  }

  const handlePopoverClose = () => {
    addListener();
    formRef && formRef.current ? formRef.current.reset() : null;
  }

  const handlePopoverOpen = () => {
    removeListener();
  }

  return (
    <Popover initialFocusRef={inputRef} returnFocusOnClose={false} onOpen={handlePopoverOpen} onClose={handlePopoverClose}>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <IconButton aria-label="Change Name" colorScheme={props.index === props.currentScene ? "blue" : null} icon={<Icon as={FaEdit} />} />
          </PopoverTrigger>
          <PopoverContent ml="10px">
            <PopoverArrow />
            <PopoverBody>
              <form onSubmit={(e) => handleChangeName(e, onClose)} ref={formRef}>
                <Flex direction="row">
                  <Input size="xs" placeholder="Change name" ref={inputRef}/>
                  <IconButton aria-label="Submit" size="xs" ml="5px" type="submit" icon={<Icon as={FaCheck} />}/>
                </Flex>
              </form>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  )

}

const mapStateToProps = (state: SequencerStore) => {
  return {
    currentScene: state.currentScene
  }
}

const mapDispatchToProps = {
  changeSceneName
}

export default connect(mapStateToProps, mapDispatchToProps)(ScenePopover);
