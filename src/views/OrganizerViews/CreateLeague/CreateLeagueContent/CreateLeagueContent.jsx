import React, { memo, useMemo } from 'react';
import { Formik } from 'formik';
import { object, func, bool, string } from 'prop-types';

import ThemedTextField from 'components/ThemedTextField';
import ThemedCheckbox from 'components/ThemedCheckbox';
import ThemedButton from 'components/ThemedButton';
import ThemedDatePicker from 'components/ThemedDatePicker';

import './CreateLeagueContent.scss';

const CreateLeagueContent = ({
   initialValues,
   validationSchema,
   handleSubmit,
   loading,
   errorMessage,
   isSplitLeague,
   toggleIsSplitLeague,
}) => {
   const splitOneStartDateLabel = useMemo(() => {
      return isSplitLeague
         ? 'Data rozpoczęcia pierwszej rundy rozgrywek'
         : 'Data rozpoczęcia rozgrywek';
   }, [isSplitLeague]);

   return (
      <div className="createLeague">
         <div className="createLeague__header">
            <h1>Utwórz nową ligę</h1>
         </div>

         <Formik
            initialValues={initialValues}
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
               <form onSubmit={handleSubmit} className="createLeague__form">
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

                  <ThemedTextField
                     variant="outlined"
                     size="small"
                     type="number"
                     InputProps={{ inputProps: { min: 4, max: 32 } }}
                     label="Liczba zespołów w lidze"
                     name="leagueSize"
                     className="form__input"
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.leagueSize}
                     error={touched.leagueSize && errors.leagueSize ? true : false}
                     helperText={touched.leagueSize && errors.leagueSize}
                     disabled={loading}
                  />

                  <ThemedCheckbox
                     checked={isSplitLeague || false}
                     onChange={toggleIsSplitLeague}
                     label="Czy liga będzie będzie dzielona na rundy?"
                     name="isSplitLeague"
                     className="form__input"
                  />

                  <ThemedDatePicker
                     variant="outlined"
                     size="small"
                     type="date"
                     label={splitOneStartDateLabel}
                     name="splitOneStartDate"
                     className="form__input"
                     onChange={(value) => setFieldValue('splitOneStartDate', value)}
                     onBlur={handleBlur}
                     value={values.splitOneStartDate}
                     error={touched.splitOneStartDate && errors.splitOneStartDate ? true : false}
                     helperText={touched.splitOneStartDate && errors.splitOneStartDate}
                     disabled={loading}
                  />

                  {isSplitLeague && (
                     <ThemedDatePicker
                        variant="outlined"
                        size="small"
                        type="date"
                        label="Data rozpoczęcia drugiej rundy rozgrywek"
                        name="splitTwoStartDate"
                        className="form__input"
                        onChange={(value) => setFieldValue('splitTwoStartDate', value)}
                        onBlur={handleBlur}
                        value={values.splitTwoStartDate}
                        error={touched.splitTwoStartDate && errors.splitTwoStartDate ? true : false}
                        helperText={touched.splitTwoStartDate && errors.splitTwoStartDate}
                        disabled={loading}
                     />
                  )}

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

CreateLeagueContent.propTypes = {
   initialValues: object,
   validationSchema: object,
   handleSubmit: func,
   loading: bool,
   errorMessage: string,
   isSplitLeague: bool,
   toggleIsSplitLeague: func,
};

export default memo(CreateLeagueContent);
