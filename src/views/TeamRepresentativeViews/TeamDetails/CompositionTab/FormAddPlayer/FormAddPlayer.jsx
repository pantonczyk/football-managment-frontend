import React, { memo, useState } from 'react';
import { Formik } from 'formik';
import { useMutation, useQuery } from '@apollo/client';
import * as Yup from 'yup';
import { string } from 'prop-types';

import CREATE_PLAYER from 'api/mutations/CREATE_PLAYER';
import GET_PLAYER_POSITIONS from 'api/queries/GET_PLAYER_POSITIONS';

import convertIdToGid from 'utils/convertIdToGid';

import ThemedTextField from 'components/ThemedTextField';
import ThemedButton from 'components/ThemedButton';
import ThemedDatePicker from 'components/ThemedDatePicker';
import ThemedSelect from 'components/ThemedSelect';
import ImageUpload from 'components/ImageUpload';

import './FormAddPlayer.scss';

const FormAddPlayer = ({ teamGid }) => {
   const today = new Date();
   const [errorMessage, setErrorMessage] = useState('');
   const [playerPositionList, setPlayerPositionList] = useState([]);
   const [playerImage, setPlayerImage] = useState(null);
   const [createPlayerMutation, { loading }] = useMutation(CREATE_PLAYER);

   useQuery(GET_PLAYER_POSITIONS, {
      onCompleted: (data) => {
         setPlayerPositionList(data?.playerPositions);
      },
   });

   const validationSchema = Yup.object().shape({
      firstName: Yup.string().required('To pole jest wymagane!'),
      lastName: Yup.string().max(40, 'Maksymalnie 40 znaków!').required('To pole jest wymagane!'),
      dateOfBirth: Yup.date().required('To pole jest wymagane!'),
      height: Yup.number()
         .positive('Wzrost musi być wartością dodatnią!')
         .required('To pole jest wymagane!'),
      weight: Yup.number()
         .positive('Waga musi być wartością dodatnią!')
         .required('To pole jest wymagane!'),
      playerNumber: Yup.number()
         .integer()
         .min(1, 'Minimalny dopuszczalny numer zawodnika to 1!')
         .max(99, 'Maksymalny dopuszczalny numer zawodnika to 99!')
         .required('To pole jest wymagane!'),
      positionId: Yup.number().required('To pole jest wymagane!'),
   });

   const resetFieldForm = (resetForm) => {
      resetForm({
         values: {
            firstName: '',
            lastName: '',
            dateOfBirth: today,
            height: '',
            weight: '',
            playerNumber: '',
            positionId: '',
         },
      });
   };

   const createPlayer = (
      { firstName, lastName, dateOfBirth, height, weight, playerNumber, positionId },
      resetForm
   ) => {
      setErrorMessage('');

      const positionGid = convertIdToGid('PlayerPositionNode', positionId);

      createPlayerMutation({
         variables: {
            firstName,
            lastName,
            dateOfBirth,
            height,
            weight,
            playerNumber,
            photo: playerImage,
            positionGid,
            teamGid,
         },
         refetchQueries: ['GET_PLAYERS_BY_TEAM'],
      })
         .then(resetFieldForm(resetForm))
         .catch((error) => setErrorMessage(error.message));
   };

   const handleSubmit = (values, { resetForm }) => {
      createPlayer(values, resetForm);
   };

   return (
      <div className="createPlayer">
         <div className="createPlayer__header">
            <h1>Dodaj nowego zawodnika</h1>
         </div>

         <Formik
            initialValues={{
               firstName: '',
               lastName: '',
               dateOfBirth: today,
               height: '',
               weight: '',
               playerNumber: '',
               positionId: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
         >
            {({
               values,
               errors,
               touched,
               handleChange,
               handleBlur,
               handleSubmit,
               setFieldValue,
            }) => (
               <form onSubmit={handleSubmit} className="createPlayer__form">
                  <ThemedTextField
                     variant="outlined"
                     size="small"
                     label="Imię zawodnika"
                     name="firstName"
                     className="form__input"
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.firstName}
                     error={touched.firstName && errors.firstName ? true : false}
                     helperText={touched.firstName && errors.firstName}
                     disabled={loading}
                  />

                  <ThemedTextField
                     variant="outlined"
                     size="small"
                     label="Nazwisko zawodnika"
                     name="lastName"
                     className="form__input"
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.lastName}
                     error={touched.lastName && errors.lastName ? true : false}
                     helperText={touched.lastName && errors.lastName}
                     disabled={loading}
                  />

                  <ThemedDatePicker
                     variant="outlined"
                     size="small"
                     type="date"
                     label="Data urodzenia"
                     name="dateOfBirth"
                     className="form__input"
                     onChange={(value) => setFieldValue('dateOfBirth', value)}
                     onBlur={handleBlur}
                     value={values.dateOfBirth}
                     error={touched.dateOfBirth && errors.dateOfBirth ? true : false}
                     helperText={touched.dateOfBirth && errors.dateOfBirth}
                     disabled={loading}
                  />

                  <ThemedTextField
                     variant="outlined"
                     size="small"
                     type="number"
                     InputProps={{ inputProps: { min: 0, max: 3, step: 0.01 } }}
                     label="Wzrost zawodnika (w metrach)"
                     name="height"
                     className="form__input"
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.height}
                     error={touched.height && errors.height ? true : false}
                     helperText={touched.height && errors.height}
                     disabled={loading}
                  />

                  <ThemedTextField
                     variant="outlined"
                     size="small"
                     type="number"
                     InputProps={{ inputProps: { min: 0, max: 500, step: 1 } }}
                     label="Waga zawodnika"
                     name="weight"
                     className="form__input"
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.weight}
                     error={touched.weight && errors.weight ? true : false}
                     helperText={touched.weight && errors.weight}
                     disabled={loading}
                  />

                  <ThemedTextField
                     variant="outlined"
                     size="small"
                     type="number"
                     InputProps={{ inputProps: { min: 1, max: 99 } }}
                     label="Numer zawodnika"
                     name="playerNumber"
                     className="form__input"
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.playerNumber}
                     error={touched.playerNumber && errors.playerNumber ? true : false}
                     helperText={touched.playerNumber && errors.playerNumber}
                     disabled={loading}
                  />

                  <ThemedSelect
                     variant="outlined"
                     size="small"
                     wrapperClass="form__input"
                     label="Pozycja zawodnika"
                     name="positionId"
                     menuItemsList={playerPositionList}
                     propsToMapValue="id"
                     propsToMapName="name"
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.positionId}
                     error={touched.positionId && errors.positionId ? true : false}
                     helperText={touched.positionId && errors.positionId}
                     disabled={loading}
                  />

                  <ImageUpload handleUploadImage={setPlayerImage} />
                  <div className="form__button">
                     <ThemedButton type="submit" color="primary" disabled={loading}>
                        Dodaj
                     </ThemedButton>
                  </div>
                  <span className="form__errors">{errorMessage}</span>
               </form>
            )}
         </Formik>
      </div>
   );
};

FormAddPlayer.propTypes = {
   teamGid: string,
};

export default memo(FormAddPlayer);
