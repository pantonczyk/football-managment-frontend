import React, { memo, useState } from 'react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { string } from 'prop-types';

import UPDATE_TEAM from 'api/mutations/UPDATE_TEAM';

import ThemedTextField from 'components/ThemedTextField';
import ThemedButton from 'components/ThemedButton';

import './OverviewTab.scss';

const OverviewTab = ({ teamGid, teamName, teamShortName }) => {
   const [errorMessage, setErrorMessage] = useState('');

   const [updateTeamMutation, { loading }] = useMutation(UPDATE_TEAM);

   const validationSchema = Yup.object().shape({
      name: Yup.string().required('To pole jest wymagane!'),
      shortName: Yup.string().max(40, 'Maksymalnie 40 znaków!').required('To pole jest wymagane!'),
   });

   const updateTeam = ({ name, shortName }) => {
      setErrorMessage('');
      updateTeamMutation({
         variables: {
            name,
            shortName,
            teamGid,
         },
      }).catch((error) => setErrorMessage(error.message));
   };

   const handleSubmit = (values) => {
      updateTeam(values);
   };

   return (
      <div className="overviewTab">
         <div className="overviewTab__header">
            <h1>Zaktualizuj dane zespołu</h1>
         </div>

         <Formik
            initialValues={{ name: teamName, shortName: teamShortName }}
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
                        Zaktualizuj
                     </ThemedButton>
                  </div>
                  <span className="form__errors">{errorMessage}</span>
               </form>
            )}
         </Formik>
      </div>
   );
};

OverviewTab.propTypes = {
   teamID: string,
   teamName: string,
   teamShortName: string,
};

export default memo(OverviewTab);
