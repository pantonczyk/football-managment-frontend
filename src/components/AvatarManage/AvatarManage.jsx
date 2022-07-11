import React, { memo, useMemo, useState } from 'react';
import classNames from 'classnames';
import { string, func, bool } from 'prop-types';

import parseImage from 'parsers/paresImage';

import ThemedTooltip from 'components/ThemedTooltip';
import Loader from 'components/Loader';

import DefaultUserImage from 'images/default_user.png';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

import './AvatarManage.scss';

const AvatarManage = ({
   photo,
   alternativeText = 'Domyślne zdjęcie',
   handleDeletePhoto,
   handleUploadPhoto,
   loading = false,
   errorMessage,
}) => {
   const [avatar, setAvatar] = useState(null);
   const [isEditAvatarFocused, setIsEditAvatarFocused] = useState(false);

   useMemo(() => {
      const parsedPhoto = parseImage(photo, DefaultUserImage);
      setAvatar(parsedPhoto);
   }, [photo]);

   const handleSetEditAvatarActive = () => {
      setIsEditAvatarFocused(true);
   };

   const handleSetEditAvatarInactive = () => {
      setIsEditAvatarFocused(false);
   };

   const handleSetAvatar = (e) => {
      e.preventDefault();
      const { files } = e.target;
      const photoToUpload = files[0];
      handleUploadPhoto(photoToUpload);
      e.target.value = null;
   };

   const previewImageClass = classNames('preview__image', loading && 'preview__image--loading');

   return (
      <div
         className="avatarManage"
         onMouseOver={handleSetEditAvatarActive}
         onMouseLeave={handleSetEditAvatarInactive}
      >
         {isEditAvatarFocused && (
            <ThemedTooltip title="Usuń zdjęcie">
               <div className="avatarManage__deleteBtn" onClick={handleDeletePhoto}>
                  <DeleteOutlineRoundedIcon fontSize="inherit" />
               </div>
            </ThemedTooltip>
         )}
         <div className="avatarManage__preview">
            <label htmlFor="imageUpload">
               <input
                  type="file"
                  id="imageUpload"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleSetAvatar}
               />
               <img src={avatar} alt={alternativeText} className={previewImageClass} />
               {loading ? (
                  <div className="preview__loader">
                     <Loader />
                  </div>
               ) : (
                  <div className="preview__overlay">
                     <p className="overlay__text">Zmień zdjęcie</p>
                  </div>
               )}
            </label>
         </div>
         <span className="avatarManage__errors">{errorMessage}</span>
      </div>
   );
};

AvatarManage.propTypes = {
   photo: string,
   alternativeText: string,
   handleDeletePhoto: func,
   handleDeletePhoto: func,
   uploadLoading: bool,
   deleteLoading: bool,
   errorMessage: string,
};

export default memo(AvatarManage);
