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
import userAtom from '../Atoms/userAtom';
import { useRecoilValue } from 'recoil';

const CreatePost = () => {
  const Max_Characters = 500;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setpostText] = useState('');
  const [remaingChars, setremaingChars] = useState(Max_Characters);
  const user = useRecoilValue(userAtom);
  const { handleImageChange, imgUrl, setimgUrl } = usePreviewImg();
  const imageRef = useRef(null);
  const showToast = useShowToast();
  const [loading, setloading] = useState(false);

  const handleTextChange = (e) => {
    // console.log(e.target.value);
    const inputText = e.target.value;

    if (inputText.length > Max_Characters) {
      const truncatedText = inputText.substring(0, Max_Characters);
      setpostText(truncatedText);
      setremaingChars(0);
    } else {
      setpostText(inputText);
      setremaingChars(Max_Characters - inputText.length);
    }
  };

  const handleCreatePost = async () => {
    setloading(true);
    try {
      const res = await fetch('/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postedBy: user._id, text: postText, img: imgUrl }),
      });

      const data = await res.json();
      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }
      showToast('Success', 'Post created successfully', 'success');
      onClose();
      setpostText('');
      setimgUrl('');
    } catch (error) {
      showToast('Error', error, 'error');
      console.log(error.message);
    } finally {
      setloading(false);
    }
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
              <Text fontSize={'xs'} fontWeight={'bold'} textAlign={'right'} m={'1'} color={'gray.white'}>
                {remaingChars} / {Max_Characters}
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
            <Button colorScheme="blue" mr={3} onClick={handleCreatePost} isLoading={loading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
