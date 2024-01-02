// Importing userAtom and useSetRecoilState from the Recoil library
import userAtom from '../atoms/userAtom';
import { useSetRecoilState } from 'recoil';

// Importing useShowToast custom hook
import useShowToast from './useShowToast';

// Custom hook for handling user logout
const useLogout = () => {
  // Using the useSetRecoilState hook to get the setUser function from Recoil
  const setUser = useSetRecoilState(userAtom);

  // Using the useShowToast hook for displaying toasts
  const showToast = useShowToast();

  // Logout function to send a request to the server to log the user out
  const logout = async () => {
    try {
      // Making a request to the server to log the user out
      const res = await fetch('/api/users/logout', {
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

      // Removing user data from local storage
      localStorage.removeItem('user-threads');

      // Setting the user state to null, effectively logging the user out
      setUser(null);
    } catch (error) {
      // Handling errors during the logout process
      showToast('Error', error, 'error');
    }
  };

  // Returning the logout function for component usage
  return logout;
};

// Exporting the custom hook for use in other components
export default useLogout;
