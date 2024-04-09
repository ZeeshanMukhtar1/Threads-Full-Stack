import { AddIcon } from '@chakra-ui/icons';
import { BardAPI } from 'bard-api-node';
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
  Toast,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import usePreviewImg from '../hooks/usePreviewImg';
import { BsFillImageFill } from 'react-icons/bs';
import { IoSparkles } from 'react-icons/io5';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import useShowToast from '../hooks/useShowToast';
import postsAtom from '../atoms/postsAtom';
import { useParams } from 'react-router-dom';

const MAX_CHAR = 500;

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  const imageRef = useRef(null);
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
  const user = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useRecoilState(postsAtom);
  const { username } = useParams();

  const handleTextChange = (e) => {
    const inputText = e.target.value;

    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setPostText(truncatedText);
      setRemainingChar(0);
    } else {
      setPostText(inputText);
      setRemainingChar(MAX_CHAR - inputText.length);
    }
  };

  const handleCreatePost = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postedBy: user._id,
          text: postText,
          img: imgUrl,
        }),
      });

      const data = await res.json();
      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }
      showToast('Success', 'Post created successfully', 'success');
      if (username === user.username) {
        setPosts([data, ...posts]);
      }
      onClose();
      setPostText('');
      setImgUrl('');
    } catch (error) {
      showToast('Error', error, 'error');
    } finally {
      setLoading(false);
    }
  };

  async function generatePostWithGPT() {
    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            // https://platform.openai.com/usage
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: 'Generate a random post.' }],
            temperature: 0.7, // Adjust temperature for randomness
          }),
        }
      );

      const data = await response.json();
      // Handle the generated chat completion
      console.log(data);
    } catch (error) {
      console.error('Error generating chat completion:', error);
      showToast('Error', 'You exceeded your current quota', 'error');
      onClose();
    }
  }

  async function generatePostWithGemini() {
    // https://github.com/codenze/bard-api-node?tab=readme-ov-file
    // https://aistudio.google.com/app/apikey
    if (isGenerating) {
      // If post generation is already in progress, show a toast message and return early
      showToast('Info', 'Please wait for the current post to generate', 'info');
      return;
    }

    try {
      setIsGenerating(true);
      const bard = new BardAPI();
      const apiKey = import.meta.env.VITE_BARD_API_KEY;
      await bard.initializeChat(apiKey);
      const response = await bard.getBardResponse(
        'Greetings! Please generate a random social media post that contains a maximum of 50 words..!'
      );

      // Extract the text from the response
      const generatedPostText = response.text;
      setPostText(generatedPostText);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <>
      <Button
        position={'fixed'}
        bottom={10}
        right={5}
        bg={useColorModeValue('gray.300', 'gray.dark')}
        onClick={onOpen}
        size={{ base: 'sm', sm: 'md' }}
      >
        <AddIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="Post content goes here.."
                onChange={handleTextChange}
                value={postText}
              />
              <Text
                fontSize="xs"
                fontWeight="bold"
                textAlign={'right'}
                m={'1'}
                color={'gray.800'}
              >
                {remainingChar}/{MAX_CHAR}
              </Text>

              <Input
                type="file"
                hidden
                ref={imageRef}
                onChange={handleImageChange}
              />

              <Flex alignItems="center" mt={2}>
                <BsFillImageFill
                  style={{ cursor: 'pointer' }}
                  size={16}
                  onClick={() => imageRef.current.click()}
                />
                <IoSparkles
                  style={{ cursor: 'pointer', marginLeft: '15px' }}
                  size={16}
                  onClick={() => {
                    generatePostWithGemini();
                  }}
                />
              </Flex>
            </FormControl>

            {imgUrl && (
              <Flex mt={5} w={'full'} position={'relative'}>
                <Image src={imgUrl} alt="Selected img" />
                <CloseButton
                  onClick={() => {
                    setImgUrl('');
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
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreatePost}
              isLoading={loading}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
