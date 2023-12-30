import { useToast } from '@chakra-ui/react';
import React from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { useState } from 'react';

export const useFollowUnfollow = (user) => {
  const currentUser = useRecoilValue(userAtom);
  const [following, setfollowing] = useState(user.followers.includes(currentUser?._id));
  const [updating, setupdating] = useState(false);
  const showToast = useToast();
  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      showToast('Error', 'Please login to follow', 'error');
      return;
    }

    // If the user is already updating, return early to prevent multiple requests from being sent
    if (updating) return;
    setupdating(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }
      if (following) {
        showToast('Success', 'Unfollowed', 'success');
        user.followers.pop(currentUser?._id); // Remove the current user from the followers array
      } else {
        showToast('Success', 'Followed', 'success');
        user.followers.push(currentUser?._id); // Add the current user to the followers array
      }
      setfollowing(!following);
    } catch (error) {
      showToast('Error', error, 'error');
    } finally {
      setupdating(false);
    }
  };
  return { handleFollowUnfollow, updating, following };
};
