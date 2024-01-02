import { useEffect, useState } from 'react';
// Importing useParams hook from react-router-dom
import { useParams } from 'react-router-dom';
import useShowToast from './useShowToast';

// Custom hook for fetching user profile information
const useGetUserProfile = () => {
  // State to store user profile data
  const [user, setUser] = useState(null);

  // State to track loading status
  const [loading, setLoading] = useState(true);

  // Retrieving the username parameter from the route
  const { username } = useParams();

  // Using the useShowToast hook for displaying toasts
  const showToast = useShowToast();

  // Effect to fetch user profile data when the component mounts or when the username changes
  useEffect(() => {
    const getUser = async () => {
      try {
        // Making a request to the server to fetch user profile data
        const res = await fetch(`/api/users/profile/${username}`);

        // Parsing the response data
        const data = await res.json();

        // Handling errors, if any
        if (data.error) {
          showToast('Error', data.error, 'error');
          return;
        }

        // Checking if the user account is frozen
        if (data.isFrozen) {
          setUser(null);
          return;
        }

        // Setting the user state with the fetched data
        setUser(data);
      } catch (error) {
        // Handling errors during the data fetching process
        showToast('Error', error.message, 'error');
      } finally {
        // Setting loading to false to indicate the completion of data fetching
        setLoading(false);
      }
    };

    // Calling the getUser function
    getUser();
  }, [username, showToast]);

  // Returning loading status and user profile data for component usage
  return { loading, user };
};

// Exporting the custom hook for use in other components
export default useGetUserProfile;
