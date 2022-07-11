import React, { memo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';

import CREATE_TEAM from 'api/mutations/CREATE_TEAM';

import convertIdToGid from 'utils/convertIdToGid';

import ThemedTextField from 'components/ThemedTextField';
import ThemedButton from 'components/ThemedButton';

import './CreateTeam.scss';

const CreateTeam = () => {
   const [errorMessage, setErrorMessage] = useState('');
   const history = useHistory();

   const [createTeamMutation, { loading }] = useMutation(CREATE_TEAM);

   const validationSchema = Yup.object().shape({
      name: Yup.string().required('To pole jest wymagane!'),
      shortName: Yup.string().max(40, 'Maksymalnie 40 znaków!').required('To pole jest wymagane!'),
   });

   const redirectToCreatedTeam = (data) => {
      const teamGid = convertIdToGid('TeamNode', data?.createTeam?.team?.id);
      if (teamGid) history.push(`/team-representative/teams/${teamGid}/overview`);
   };

   const createTeam = ({ name, shortName }) => {
      setErrorMessage('');

      createTeamMutation({
         variables: {
            name,
            shortName,
         },
      })
         .then(({ data }) => redirectToCreatedTeam(data))
         .catch((error) => setErrorMessage(error.message));
   };

   const handleSubmit = (values) => {
      createTeam(values);
   };

   return (
      <div className="createTeam">
         <div className="createTeam__header">
            <h1>Utwórz nowy zespół</h1>
         </div>

         <Formik
            initialValues={{ name: '', shortName: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
         >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
               <form onSubmit={handleSubmit} className="createTeam__form">
                  <ThemedTextField
                     variant="outlined"
                     size="small"
                     label="Nazwa zespołu"
                     name="name"
                     className="form__input"
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.name}
                     error={touched.name && errors.name ? true : false}
                     helperText={touched.name && errors.name}
                     disabled={loading}
                  />

                  <ThemedTextField
                     variant="outlined"
                     size="small"
                     label="Skrócona nazwa zespołu"
                     name="shortName"
                     className="form__input"
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.shortName}
                     error={touched.shortName && errors.shortName ? true : false}
                     helperText={touched.shortName && errors.shortName}
                     disabled={loading}
                  />

                  <div className="form__button">
                     <ThemedButton type="submit" color="primary" disabled={loading}>
                        Utwórz
                     </ThemedButton>
                  </div>
                  <span className="form__errors">{errorMessage}</span>
               </form>
            )}
         </Formik>
      </div>
   );
};

export default memo(CreateTeam);
