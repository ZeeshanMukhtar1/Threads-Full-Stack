import React from 'react';
import { useState } from 'react';
import useShowToast from './useShowToast';
const usePreviewImg = () => {
  const [imgUrl, setimgUrl] = useState(null);
  const showToast = useShowToast();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setimgUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      showToast('invalid file type , please select an image file ', error);
      setimgUrl('htts://via.placeholder.com/150');
      //   setimgUrl(null);
    }
  };

  // console.log(imgUrl);
  return {
    handleImageChange,
    imgUrl,
    setimgUrl,
  };
};

export default usePreviewImg;
