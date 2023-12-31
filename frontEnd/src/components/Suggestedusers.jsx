import { Flex, Skeleton, SkeletonCircle, Text, Box } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { Suggesteduser } from './Suggesteduser';
import useShowToast from '../hooks/useShowToast';
import { useEffect } from 'react';

const Suggestedusers = () => {
  const [loading, setloading] = useState(true);
  const [suggestedUsers, setsuggestedUsers] = useState([]);
  const showToast = useShowToast();
  useEffect(() => {
    const getSuggestedUsers = async () => {
      setloading(true);
      try {
        const res = await fetch('/api/users/suggested');
        const data = await res.json();
        if (data.error) {
          showToast('error', data.error, 'Error');
        }
        console.log(data);
        setsuggestedUsers(data);
      } catch (error) {
        showToast('error', error.message, 'Error');
      } finally {
        setloading(false);
      }
    };
    getSuggestedUsers();
  }, [showToast]);

  return (
    <>
      {/* title text */}
      <Text fontWeight={'bold'} mb={4}>
        Suggested Users
      </Text>
      {/* when not loading */}
      {/* {!loading && suggestedUsers.map((user) => <Suggesteduser key={user._id} user={user} />)}
       */}
      {!loading && suggestedUsers.map((user) => <Suggesteduser key={user._id} user={user} />)}

      <Flex direction={'column'} gap={4}>
        {/* when loading */}
        {loading &&
          [0, 1, 2, 3, 4].map((_, idx) => (
            <Flex key={idx} gap={2} alignItems={'center'} p={1} borderRadius={'md'}>
              {/* skeleton avatar */}
              <Box>
                <SkeletonCircle size="10" />
              </Box>
              {/* username anf fullname skeleton */}
              <Flex w={'full'} flexDirection={'column'} gap={2}>
                <Skeleton h={'8px'} w={'80px'} />
                <Skeleton h={'8px'} w={'90px'} />
              </Flex>
              {/* folllow btn skelton */}
              <Flex>
                <Skeleton h={'20px'} w={'60px'} />
              </Flex>
            </Flex>
          ))}
      </Flex>
    </>
  );
};

export default Suggestedusers;
