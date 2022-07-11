import React, { memo } from 'react';
import { withRouter } from 'react-router';
import { Formik } from 'formik';
import { array, object, func, bool, string } from 'prop-types';

import { goBack } from 'utils/routerFunctions';

import ThemedTextField from 'components/ThemedTextField';
import ThemedPasswordField from 'components/ThemedPasswordField';
import ThemedButton from 'components/ThemedButton';
import ThemedScrollDiv from 'components/ThemedScrollDiv';
import ThemedSelect from 'components/ThemedSelect';

import AuthViewWrapper from '../../AuthViewWrapper';

import './RegisterContent.scss';

const RegisterContent = ({
   history,
   groupsList,
   initialValues,
   validationSchema,
   handleSubmit,
   loading,
   errorMessage,
}) => {
   return (
      <AuthViewWrapper>
         <div className="register">
            <h1>Rejestracja Football Managment</h1>

            <Formik
               initialValues={initialValues}
               validationSchema={validationSchema}
               onSubmit={handleSubmit}
            >
               {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit} className="register__form">
                     <ThemedScrollDiv className="register__inputs">
                        <ThemedTextField
                           variant="outlined"
                           size="small"
                           label="Nazwa użytkownika"
                           name="username"
                           className="form__input"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.username}
                           error={touched.username && errors.username ? true : false}
                           helperText={touched.username && errors.username}
                           disabled={loading}
                        />

                        <ThemedTextField
                           variant="outlined"
                           size="small"
                           type="email"
                           label="E-mail"
                           name="email"
                           className="form__input"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.email}
                           error={touched.email && errors.email ? true : false}
                           helperText={touched.email && errors.email}
                           disabled={loading}
                        />

                        <ThemedTextField
                           variant="outlined"
                           size="small"
                           label="Imię"
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
                           label="Nazwisko"
                           name="lastName"
                           className="form__input"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.lastName}
                           error={touched.lastName && errors.lastName ? true : false}
                           helperText={touched.lastName && errors.lastName}
                           disabled={loading}
                        />

                        <ThemedPasswordField
                           variant="outlined"
                           size="small"
                           label="Hasło"
                           name="password"
                           className="form__input"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.password}
                           error={touched.password && errors.password ? true : false}
                           helperText={touched.password && errors.password}
                           disabled={loading}
                        />

                        <ThemedPasswordField
                           variant="outlined"
                           size="small"
                           label="Potwierdź hasło"
                           name="passwordConfirm"
                           className="form__input"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.passwordConfirm}
                           error={touched.passwordConfirm && errors.passwordConfirm ? true : false}
                           helperText={touched.passwordConfirm && errors.passwordConfirm}
                           disabled={loading}
                        />

                        <ThemedSelect
                           variant="outlined"
                           size="small"
                           wrapperClass="form__input"
                           label="Typ użytkownika"
                           name="role"
                           menuItemsList={groupsList}
                           propsToMapValue="id"
                           propsToMapName="name"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.role}
                           error={touched.role && errors.role ? true : false}
                           helperText={touched.role && errors.role}
                           disabled={loading}
                        />
                     </ThemedScrollDiv>

                     <div className="form__buttons">
                        <ThemedButton variant="outlined" onClick={goBack(history)}>
                           Powrót
                        </ThemedButton>

                        <ThemedButton type="submit" color="primary" disabled={loading}>
                           Zarejestruj się
                        </ThemedButton>
                     </div>
                  </form>
               )}
            </Formik>
            <span className="form__errors">{errorMessage}</span>
         </div>
      </AuthViewWrapper>
   );
};

RegisterContent.propTypes = {
   history: object,
   groupsList: array,
   initialValues: object,
   validationSchema: object,
   handleSubmit: func,
   loading: bool,
   errorMessage: string,
};

export default memo(withRouter(RegisterContent));
