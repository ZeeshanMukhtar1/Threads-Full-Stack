// Importing useState from the React library
import { useState } from 'react';

// Importing useShowToast custom hook
import useShowToast from './useShowToast';

// Custom hook for previewing image before upload
const usePreviewImg = () => {
  // State to store the image URL
  const [imgUrl, setImgUrl] = useState(null);

  // Using the useShowToast hook for displaying toasts
  const showToast = useShowToast();

  // Function to handle image change
  const handleImageChange = (e) => {
    // Retrieving the selected file
    const file = e.target.files[0];

    // Checking if the file is of type image
    if (file && file.type.startsWith('image/')) {
      // Creating a FileReader to read the file
      const reader = new FileReader();

      // Callback function when the reading is complete
      reader.onloadend = () => {
        // Setting the image URL in the state
        setImgUrl(reader.result);
      };

      // Reading the file as a data URL
      reader.readAsDataURL(file);
    } else {
      // Displaying an error toast for invalid file type
      showToast('Invalid file type', 'Please select an image file', 'error');

      // Resetting the image URL state to null
      setImgUrl(null);
    }
  };

  // Returning the handleImageChange function, imgUrl, and setImgUrl for component usage
  return { handleImageChange, imgUrl, setImgUrl };
};

// Exporting the custom hook for use in other components
export default usePreviewImg;
