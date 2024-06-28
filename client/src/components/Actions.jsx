import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BardAPI } from 'bard-api-node';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import useShowToast from '../hooks/useShowToast';
import postsAtom from '../atoms/postsAtom';
import { FaRegFlag } from 'react-icons/fa';
import { PiShareFat } from 'react-icons/pi';
import { Textarea } from '@chakra-ui/react';
import { AiOutlineCopy } from 'react-icons/ai';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const Actions = ({ post, isStatic }) => {
  const user = useRecoilValue(userAtom);
  const [liked, setLiked] = useState(post.likes?.includes(user?._id));
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [isLiking, setIsLiking] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reply, setReply] = useState('');
  const [replyLoading, setReplyLoading] = useState(false);
  const [reportReason, setReportReason] = useState('');

  const showToast = useShowToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isReportOpen,
    onOpen: onReportOpen,
    onClose: onReportClose,
  } = useDisclosure();

  const handleLikeAndUnlike = async () => {
    if (isStatic) return;
    if (!user)
      return showToast(
        'Error',
        'You must be logged in to like a post',
        'error'
      );
    if (isLiking) return;
    setIsLiking(true);
    try {
      const res = await fetch('/api/posts/like/' + post._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.error) return showToast('Error', data.error, 'error');

      if (!liked) {
        // add the id of the current user to post.likes array
        const updatedPosts = posts.map((p) => {
          if (p._id === post._id) {
            return { ...p, likes: [...p.likes, user._id] };
          }
          return p;
        });
        setPosts(updatedPosts);
      } else {
        // remove the id of the current user from post.likes array
        const updatedPosts = posts.map((p) => {
          if (p._id === post._id) {
            return { ...p, likes: p.likes.filter((id) => id !== user._id) };
          }
          return p;
        });
        setPosts(updatedPosts);
      }

      setLiked(!liked);
    } catch (error) {
      showToast('Error', error.message, 'error');
    } finally {
      setIsLiking(false);
    }
  };

  const handleReply = async () => {
    if (isStatic) return;
    if (!user)
      return showToast(
        'Error',
        'You must be logged in to reply to a post',
        'error'
      );
    if (isReplying) return;
    setIsReplying(true);
    try {
      const res = await fetch('/api/posts/reply/' + post._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: reply }),
      });
      const data = await res.json();
      if (data.error) return showToast('Error', data.error, 'error');

      const updatedPosts = posts.map((p) => {
        if (p._id === post._id) {
          return { ...p, replies: [...p.replies, data] };
        }
        return p;
      });
      setPosts(updatedPosts);
      showToast('Success', 'Reply posted successfully', 'success');
      onClose();
      setReply('');
    } catch (error) {
      showToast('Error', error.message, 'error');
    } finally {
      setIsReplying(false);
    }
  };

  async function handleReplyWithAI() {
    if (isStatic) return;

    if (isGenerating) {
      showToast(
        'Info',
        'Please wait for the current reply to generate',
        'info'
      );
      return; // Prevent multiple requests
    }
    setIsGenerating(true);
    setReplyLoading(true); // Set replyLoading to true when reply generation starts
    try {
      const bard = new BardAPI();
      const apiKey = import.meta.env.VITE_BARD_API_KEY;
      await bard.initializeChat(apiKey);
      const response = await bard.getBardResponse(
        'Please generate a random reply to a post contains a maximum of 10 words..!'
      );
      // Extract the text from the response
      const generatedPostText = response.text;
      setReply(generatedPostText);
      showToast('Success', 'Please press Reply button to submit..!', 'success');
    } catch (error) {
      console.error('Error:', error);
      showToast('Error', 'You exceeded your current quota', 'error');
    } finally {
      setIsGenerating(false);
      setReplyLoading(false); // Set replyLoading to false when reply generation finishes
    }
  }

  const handleReport = async () => {
    if (isStatic) return;
    if (!user)
      return showToast(
        'Error',
        'You must be logged in to report a post',
        'error'
      );
    try {
      onReportOpen();
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  const handleCopyUrl = async () => {
    const postUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(postUrl);
      showToast('Success', 'Post URL copied to clipboard', 'success');
    } catch (error) {
      showToast('Error', 'Failed to copy the post URL', 'error');
    }
  };

  const handleReportSubmit = async () => {
    if (!reportReason)
      return showToast('Error', 'Please select a reason', 'error');
    try {
      // Simulate report submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showToast('Success', 'Post reported successfully', 'success');
      onReportClose();
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  const handleSharePost = async () => {
    if (isStatic) return;
    if (!user)
      return showToast(
        'Error',
        'You must be logged in to share a post',
        'error'
      );
    const postUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Share Post',
          text: 'Check out this post!',
          url: postUrl,
        });
        showToast('Success', 'Post shared successfully', 'success');
      } catch (error) {
        showToast('Error', 'Failed to share the post', 'error');
      }
    } else {
      try {
        await navigator.clipboard.writeText(postUrl);
        showToast('Success', 'Post URL copied to clipboard', 'success');
      } catch (error) {
        showToast('Error', 'Failed to copy the post URL', 'error');
      }
    }
  };

  return (
    <Flex flexDirection='column'>
      <Flex gap={3} my={2} onClick={(e) => e.preventDefault()}>
        <svg
          aria-label='Like'
          color={liked ? 'rgb(237, 73, 86)' : ''}
          fill={liked ? 'rgb(237, 73, 86)' : 'transparent'}
          height='19'
          role='img'
          viewBox='0 0 24 22'
          width='20'
          onClick={handleLikeAndUnlike}
        >
          <path
            d='M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z'
            stroke='currentColor'
            strokeWidth='2'
          ></path>
        </svg>

        <svg
          aria-label='Comment'
          color=''
          fill=''
          height='20'
          role='img'
          viewBox='0 0 24 24'
          width='20'
          onClick={onOpen}
        >
          <title>Comment</title>
          <path
            d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
            fill='none'
            stroke='currentColor'
            strokeLinejoin='round'
            strokeWidth='2'
          ></path>
        </svg>

        <div onClick={handleSharePost}>
          <PiShareFat size={20} />
        </div>

        <FaRegFlag onClick={handleReport} cursor='pointer' size={20} />
        <div onClick={handleCopyUrl}>
          <AiOutlineCopy size={20} />
        </div>
      </Flex>

      <Text fontWeight={500}>{post?.likes?.length || 0} likes</Text>

      {/* Modal for Reporting */}
      <Modal isOpen={isReportOpen} onClose={onReportClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Report Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Select
                placeholder='Select a reason'
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
              >
                <option value='violenceThreats'>Violence or Threats</option>
                <option value='hateSpeech'>Hate Speech</option>
                <option value='bullyingHarassment'>
                  Bullying or Harassment
                </option>
                <option value='nuditySexualContent'>
                  Nudity or Sexual Content
                </option>
                <option value='exploitationAbuse'>Exploitation or Abuse</option>
                <option value='selfHarm'>Self-Harm</option>
                <option value='spam'>Spam</option>
                <option value='misinformationDisinformation'>
                  Misinformation or Disinformation
                </option>
                <option value='copyrightTrademark'>
                  Copyright or Trademark Infringement
                </option>
              </Select>
              <br />
              <Textarea
                isInvalid
                placeholder='Please provide additional details (optional)
              '
              />
              <Box mt={3}>
                <Text fontSize={'small'}>
                  For child exploitation content, report directly to the
                  National Center for Missing and Exploited Children (NCMEC) at{' '}
                  <Link href='https://report.cybertip.org/' isExternal>
                    <ExternalLinkIcon
                      style={{
                        width: '20px',
                        height: '20px',
                      }}
                      mx='2px'
                    />
                  </Link>
                </Text>
              </Box>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' onClick={handleReportSubmit}>
              Submit Report
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for Reply */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Post a Reply</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder='Write a reply...'
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={handleReply}
              isLoading={replyLoading}
            >
              Reply
            </Button>
            <Button variant='ghost' onClick={handleReplyWithAI}>
              Generate Reply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Actions;
