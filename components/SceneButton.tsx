import { connect } from 'react-redux';
import { useRef } from 'react';
import { Flex, Input, Icon, IconButton, Button, ButtonGroup, Popover, PopoverBody, PopoverTrigger, PopoverContent, PopoverArrow } from '@chakra-ui/react';
import { FaTimes, FaEdit, FaCheck } from 'react-icons/fa';
import { SequencerStore } from 'redux/rootReducer';
import { changeScene, deleteScene, changeSceneName } from 'redux/actions';

const SceneButton = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSceneButton = () => {
    props.changeScene(props.index);
  }

  const deleteSceneButton = () => {
    if (props.scenes.length > 1) {
      props.deleteScene(true, props.sceneId);
    }
  }

  const handleChangeName = (e:React.FormEvent<HTMLFormElement>, onClose: Function) => {
    e.preventDefault();
    props.changeSceneName(props.sceneId, inputRef.current.value, true);

    onClose();
  }

  const handlePopoverClose = () => {
    formRef && formRef.current ? formRef.current.reset() : null;
  }

  return (
    <div style={{ marginRight: 20 }}>
      <ButtonGroup size="sm" isAttached>
        <Button colorScheme={props.index === props.currentScene ? "blue" : null} onClick={handleSceneButton}>{props.name ? props.name : `Scene ${props.index + 1}`}</Button>
        <Popover initialFocusRef={inputRef} returnFocusOnClose={false} onClose={handlePopoverClose}>
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
        {props.scenes.length > 1 &&
          <IconButton aria-label="Delete Scene" colorScheme={props.index === props.currentScene ? "blue" : null} onClick={deleteSceneButton} icon={<Icon as={FaTimes} />} />
        }
      </ButtonGroup>
    </div>
  )
}

const mapStateToProps = (state: SequencerStore) => {
  return {
    scenes: state.scenes,
    currentScene: state.currentScene
  }
}

const mapDispatchToProps = {
  changeScene,
  deleteScene,
  changeSceneName
}

export default connect(mapStateToProps, mapDispatchToProps)(SceneButton);
