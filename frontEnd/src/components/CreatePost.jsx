import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useState, useRef } from 'react';
import usePreviewImg from '../Hooks/usePreviewImg';
import { BsFillImageFill } from 'react-icons/bs';
import useShowToast from '../Hooks/useShowToast';

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setpostText] = useState('');
  const { handleImageChange, imgUrl, setimgUrl } = usePreviewImg();
  const imageRef = useRef(null);
  const showToast = useShowToast();

  const handleTextChange = (e) => {
    // console.log(e.target.value);
  };

  const handleCreatePost = () => {
    showToast('Success', 'Post created successfully', 'success');
  };

  return (
    <>
      <Button
        position={'fixed'}
        bottom={'10'}
        right={'10'}
        leftIcon={<AddIcon />}
        bg={useColorModeValue('gray.300', 'gray.dark')}
        onClick={onOpen}
      >
        Post
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea placeholder="What's on your mind?" onChange={handleTextChange} value={postText}></Textarea>
              <Text fontSize={'xs'} fontWeight={'bold'} textAlign={'right'} m={'1'} color={'gray.800'}>
                500/500
              </Text>
              <Input type="file" hidden ref={imageRef} onChange={handleImageChange} />
              <BsFillImageFill
                style={{ cursor: 'pointer', marginLeft: '5px' }}
                size={16}
                onClick={() => {
                  imageRef.current.click();
                }}
              />
            </FormControl>
            {/* displaying the selected image */}
            {imgUrl && (
              <Flex mt={5} w={'full'} position={'relative'}>
                <Image src={imgUrl} alt={'selected  Image'} />
                <CloseButton
                  onClick={() => {
                    setimgUrl('');
                  }}
                  bg={'gray.800'}
                  position={'absolute'}
                  top={2}
                  right={2}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreatePost}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
