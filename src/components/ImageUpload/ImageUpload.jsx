import React, { memo, useState } from 'react';
import { styled } from '@mui/material/styles';
import { string, func } from 'prop-types';

import ThemedButton from 'components/ThemedButton';

import './ImageUpload.scss';

const Input = styled('input')({
   display: 'none',
});

const ImageUpload = ({
   label = 'Dodaj zdjęcie',
   buttonText = 'Dodaj zdjęcie',
   handleUploadImage,
}) => {
   const [image, setImage] = useState(null);

   const handleSetImage = (e) => {
      e.preventDefault();
      const { files } = e.target;
      const imagesToUpload = files[0];
      setImage(imagesToUpload);
      handleUploadImage(imagesToUpload);
      e.target.value = null;
   };

   return (
      <fieldset className="imageUpload">
         <legend className="imageUpload__label">{label}</legend>

         <label htmlFor="contained-button-file">
            <Input
               accept=".png, .jpg, .jpeg"
               id="contained-button-file"
               type="file"
               onChange={handleSetImage}
            />

            <ThemedButton variant="outlined" color="primary" component="span" size="small">
               {buttonText}
            </ThemedButton>
         </label>
         <span className="imageUpload__info">{image?.name}</span>
      </fieldset>
   );
};

ImageUpload.propTypes = {
   label: string,
   buttonText: string,
   handleUploadImage: func,
};

export default memo(ImageUpload);
