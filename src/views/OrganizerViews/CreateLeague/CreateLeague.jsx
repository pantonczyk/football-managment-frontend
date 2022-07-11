import React, { memo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';

import CREATE_LEAGUE from 'api/mutations/CREATE_LEAGUE';

import useToggleVisibility from 'hooks/useToggleVisibility';

import convertIdToGid from 'utils/convertIdToGid';

import CreateLeagueContent from './CreateLeagueContent';

const CreateLeague = () => {
   const [errorMessage, setErrorMessage] = useState('');
   const [isSplitLeague, toggleIsSplitLeague] = useToggleVisibility(false);
   const [createLeagueMutation, { loading }] = useMutation(CREATE_LEAGUE);
   const history = useHistory();

   const today = new Date();
   const tomorrow = new Date(today);
   tomorrow.setDate(tomorrow.getDate() + 1);

   const initialValues = {
      name: '',
      shortName: '',
      description: '',
      leagueSize: '',
      splitOneStartDate: today,
      splitTwoStartDate: tomorrow,
   };

   const validationSchema = Yup.object().shape({
      name: Yup.string().required('To pole jest wymagane!'),
      shortName: Yup.string().max(40, 'Maksymalnie 40 znaków!').required('To pole jest wymagane!'),
      description: Yup.string().required('To pole jest wymagane!'),
      leagueSize: Yup.number()
         .integer()
         .min(4, 'Liczba drużyn musi zawierać się w przedziale 4-32')
         .max(32, 'Liczba drużyn musi zawierać się w przedziale 4-32')
         .required('To pole jest wymagane!')
         .test(
            'Czy jest liczbą parzystą?',
            'Liczba zespołów musi być parzysta!',
            (value) => value % 2 === 0
         ),
      splitOneStartDate: Yup.date().nullable().required('To pole jest wymagane!'),
      splitTwoStartDate: Yup.date().concat(
         isSplitLeague &&
            Yup.date()
               .nullable()
               .required('To pole jest wymagane!')
               .when('splitOneStartDate', (splitOneStartDate, schema) => {
                  if (splitOneStartDate) {
                     const dayAfter = new Date(splitOneStartDate);
                     dayAfter.setDate(dayAfter.getDate() + 1);

                     return schema.min(
                        dayAfter,
                        'Data rozpoczęcia drugiej rundy nie może być wcześniejsza niż pierwszej!'
                     );
                  }
               })
      ),
   });

   const redirectToCreatedLeague = (data) => {
      const leagueGid = convertIdToGid('LeagueNode', data?.createLeague?.league?.id);
      if (leagueGid) history.push(`/league-organizer/leagues/${leagueGid}/overview`);
   };

   const createLeague = ({
      name,
      shortName,
      description,
      leagueSize,
      splitOneStartDate,
      splitTwoStartDate,
   }) => {
      setErrorMessage('');

      createLeagueMutation({
         variables: {
            name,
            shortName,
            description,
            leagueSize,
            isSplit: isSplitLeague,
            splitOneStartDate,
            splitTwoStartDate,
         },
      })
         .then(({ data }) => redirectToCreatedLeague(data))
         .catch((error) => setErrorMessage(error.message));
   };

   const handleSubmit = (values) => {
      createLeague(values);
   };

   return (
      <CreateLeagueContent
         initialValues={initialValues}
         validationSchema={validationSchema}
         handleSubmit={handleSubmit}
         isSplitLeague={isSplitLeague}
         toggleIsSplitLeague={toggleIsSplitLeague}
         loading={loading}
         errorMessage={errorMessage}
      />
   );
};

export default memo(CreateLeague);
