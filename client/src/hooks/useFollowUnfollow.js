import { useState } from 'react';
import useShowToast from './useShowToast';
import userAtom from '../atoms/userAtom';
import { useRecoilValue } from 'recoil';

// Custom hook for handling follow and unfollow functionality
const useFollowUnfollow = (user) => {
  // Retrieving the current user from Recoil state
  const currentUser = useRecoilValue(userAtom);

  // State for tracking whether the current user is following the target user
  const [following, setFollowing] = useState(
    user && user.followers && user.followers.includes(currentUser?._id)
  );

  // State for tracking the update status
  const [updating, setUpdating] = useState(false);

  // Using the useShowToast hook for displaying toasts
  const showToast = useShowToast();

  // Function to handle follow and unfollow actions
  const handleFollowUnfollow = async () => {
    // Checking if the current user is logged in
    if (!currentUser) {
      showToast('Error', 'Please login to follow', 'error');
      return;
    }

    // Checking if an update is already in progress
    if (updating) return;

    // Setting updating to true to indicate the start of the update process
    setUpdating(true);

    try {
      // Making a request to the server to follow or unfollow the user
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Parsing the response data
      const data = await res.json();

      // Handling errors, if any
      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }

      // Handling success cases
      if (following) {
        showToast('Success', `Unfollowed ${user.name}`, 'success');
        user.followers.pop(); // Simulating removing from followers
      } else {
        showToast('Success', `Followed ${user.name}`, 'success');
        user.followers.push(currentUser?._id); // Simulating adding to followers
      }

      // Toggling the following state
      setFollowing(!following);
    } catch (error) {
      // Handling errors during the update process
      showToast('Error', error, 'error');
    } finally {
      // Setting updating to false to indicate the completion of the update process
      setUpdating(false);
    }
  };

  // Returning relevant data and functions for component usage
  return { handleFollowUnfollow, updating, following };
};

// Exporting the custom hook for use in other components
export default useFollowUnfollow;
