import { Flex, Skeleton, SkeletonCircle, Text, Box } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { Suggesteduser } from './Suggesteduser';
import { useShowToast } from '../hooks/useShowToast';

const Suggestedusers = () => {
  const [loading, setloading] = useState(false);
  const [suggestedUsers, setsuggestedUsers] = useState([]);
  const showToast = useShowToast();
  return (
    <>
      {/* title text */}
      <Text fontWeight={'bold'} mb={4}>
        Suggested Users
      </Text>
      {/* when not loading */}
      {!loading && [0, 1, 2, 3, 4].map((user) => <Suggesteduser key={user._id} user={user} />)}
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
