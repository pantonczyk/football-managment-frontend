import React, { memo, useState, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import GET_CURRENT_USER from 'api/queries/GET_CURRENT_USER';
import SET_USER_PHOTO from 'api/mutations/SET_USER_PHOTO';
import REMOVE_PHOTO_CURRENT_USER from 'api/mutations/REMOVE_PHOTO_CURRENT_USER';

import AvatarManage from 'components/AvatarManage';
import FormEditUserProfile from './FormEditUserProfile';
import FormResetPassword from './FormResetPassword';

import './UserProfile.scss';

const UserProfile = () => {
   const [userData, setUserData] = useState(null);
   const [errorMessage, setErrorMessage] = useState('');
   const { data } = useQuery(GET_CURRENT_USER);

   useMemo(() => {
      setUserData(data?.me);
   }, [data]);

   const [setUserPhotoMutation, { loading: uploadLoading }] = useMutation(SET_USER_PHOTO);
   const [deletePhotoMutation, { loading: deleteLoading }] = useMutation(REMOVE_PHOTO_CURRENT_USER);

   const setError = (error) => {
      if (error)
         setErrorMessage(
            'Wygląda na to, że coś poszło nie tak. Spróbuj później lub skontakuj się z administaratorem systemu.'
         );
   };
   const deletePhoto = () => {
      deletePhotoMutation().catch(setError);
   };

   const uploadPhoto = (photo) => {
      setErrorMessage('');
      setUserPhotoMutation({
         variables: {
            photo,
         },
      }).catch(setError);
   };

   const loading = useMemo(() => {
      return uploadLoading || deleteLoading;
   }, [uploadLoading, deleteLoading]);

   return (
      <div className="userProfile">
         <div className="userProfile__header">
            <h1>Profil użytkownika</h1>
         </div>

         <div className="userProfile__formPhoto">
            <h2>Edytuj zdjęcie użytkownika</h2>
            <AvatarManage
               photo={userData?.photo}
               alternativeText="Zdjęcie profilowe aktualnego użytkownika"
               handleDeletePhoto={deletePhoto}
               handleUploadPhoto={uploadPhoto}
               loading={loading}
               errorMessage={errorMessage}
            />
         </div>

         <div className="userProfile__formUserData">
            <h2>Edytuj dane użytkownika</h2>
            <FormEditUserProfile userData={userData} />
         </div>

         <div className="userProfile__formResetPassword">
            <h2>Zmiana hasła</h2>
            <p className="formResetPassword__passwordPolicy">
               Hasło musi składać się z 8 znaków, w tym z wielkiej i małej litery, cyfry i jednego
               znaku specjalnego
            </p>
            <FormResetPassword />
         </div>
      </div>
   );
};

export default memo(UserProfile);
