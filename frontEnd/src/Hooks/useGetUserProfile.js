import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useShowToast from './useShowToast';

const useGetUserProfile = () => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);
  const { username } = useParams();
  const showToast = useShowToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast('Error', data.error, 'error');
          return;
        }
        // setuser(data.user);
        setuser(data.user);
      } catch (error) {
        showToast('Error', 'Something went wrong', 'error');
      } finally {
        setloading(false);
      }
    };
    getUser();
  }, [username, showToast]);

  return { user, loading };
};

export default useGetUserProfile;
