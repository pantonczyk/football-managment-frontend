import React, { memo, useState } from 'react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { string, object } from 'prop-types';

import UDPATE_LEAGUE from 'api/mutations/UDPATE_LEAGUE';

import ThemedTextField from 'components/ThemedTextField';
import ThemedButton from 'components/ThemedButton';

import './FormEditLeague.scss';

const FormEditLeague = ({ leagueGid, leagueData }) => {
   const [errorMessage, setErrorMessage] = useState('');

   const [updateLeagueMutation, { loading }] = useMutation(UDPATE_LEAGUE);

   const initialValues = {
      name: leagueData?.name,
      shortName: leagueData?.shortName,
      description: leagueData?.description,
   };

   const validationSchema = Yup.object().shape({
      name: Yup.string().required('To pole jest wymagane!'),
      shortName: Yup.string().max(40, 'Maksymalnie 40 znaków!').required('To pole jest wymagane!'),
      description: Yup.string().required('To pole jest wymagane!'),
   });

   const updateLeague = ({ name, shortName, description }) => {
      setErrorMessage('');

      updateLeagueMutation({
         variables: {
            leagueGid,
            name,
            shortName,
            description,
         },
      }).catch((error) => setErrorMessage(error.message));
   };

   const handleSubmit = (values) => {
      updateLeague(values);
   };

   return (
      <div className="updateLeague">
         <div className="updateLeague__header">
            <h1>Edytuj dane ligi</h1>
         </div>

         <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
         >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
               <form onSubmit={handleSubmit} className="updateLeague__form">
                  <ThemedTextField
                     variant="outlined"
                     size="small"
                     label="Nazwa ligi"
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
                     label="Skrócona nazwa ligi"
                     name="shortName"
                     className="form__input"
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.shortName}
                     error={touched.shortName && errors.shortName ? true : false}
                     helperText={touched.shortName && errors.shortName}
                     disabled={loading}
                  />

                  <ThemedTextField
                     variant="outlined"
                     size="small"
                     label="Opis ligi"
                     name="description"
                     className="form__input"
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.description}
                     error={touched.description && errors.description ? true : false}
                     helperText={touched.description && errors.description}
                     disabled={loading}
                     multiline
                     rows={4}
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

FormEditLeague.propTypes = {
   leagueGid: string,
   leagueData: object,
};

export default memo(FormEditLeague);
