import React, { memo, useState, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { string } from 'prop-types';

import GET_STADIUM_BY_LEAGUE from 'api/queries/GET_STADIUM_BY_LEAGUE';
import REMOVE_STADIUM from 'api/mutations/REMOVE_STADIUM';

import convertIdToGid from 'utils/convertIdToGid';
import { redirectTo } from 'utils/routerFunctions';

import Loader from 'components/Loader';
import ThemedButton from 'components/ThemedButton';
import ThemedIconButton from 'components/ThemedIconButton';
import ThemedTooltip from 'components/ThemedTooltip';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import './StadiumTable.scss';

const StadiumTable = ({ leagueGid }) => {
   const history = useHistory();
   const [stadiumList, setStadiumList] = useState([]);

   const { data, loading } = useQuery(GET_STADIUM_BY_LEAGUE, {
      variables: {
         leagueGid,
      },
   });

   useMemo(() => {
      setStadiumList(data?.stadiumsByLeague);
   }, [data]);

   const [removeStadiumMutation] = useMutation(REMOVE_STADIUM, {
      refetchQueries: ['GET_STADIUM_AVAILABILITIES_BY_LEAGUE'],
   });

   const removeStadium = (stadiumId) => () => {
      const stadiumGid = convertIdToGid('StadiumNode', stadiumId);

      removeStadiumMutation({
         variables: {
            stadiumGid,
         },
         update(cache) {
            cache.modify({
               fields: {
                  stadiumsByLeague(existingStadiumsRefs, { readField }) {
                     return existingStadiumsRefs.filter(
                        (stadiumRef) => stadiumId !== readField('id', stadiumRef)
                     );
                  },
               },
            });
         },
      });
   };

   const redirectToStadiumView = (stadiumId) => {
      const stadiumGid = convertIdToGid('StadiumNode', stadiumId);
      return redirectTo(
         history,
         `/league-organizer/leagues/${leagueGid}/league-manage/stadium/${stadiumGid}`
      );
   };

   return (
      <div className="stadiumTable">
         <div className="stadiumTable__header">
            <h1>Lista stadionów</h1>
         </div>

         <ul className="stadiumTable__table">
            <li className="table__header">
               <div className="row__col row__col-40">Nazwa stadionu</div>
               <div className="row__col row__col-50">Adres</div>
               <div className="row__col row__col-5"></div>
               <div className="row__col row__col-5"></div>
            </li>

            {loading ? (
               <Loader />
            ) : stadiumList?.length ? (
               stadiumList?.map(({ id, name, address }) => (
                  <li key={id} className="table__row">
                     <div className="row__col row__col-40" data-label="Nazwa stadionu">
                        {name}
                     </div>
                     <div className="row__col row__col-50" data-label="Adres">
                        {address}
                     </div>

                     <div className="row__col row__col-5 row__coll-options">
                        <ThemedIconButton size="small" onClick={redirectToStadiumView(id)}>
                           <ThemedTooltip title="Edytuj">
                              <EditRoundedIcon style={{ color: '#757575' }} />
                           </ThemedTooltip>
                        </ThemedIconButton>
                     </div>

                     <div className="row__col row__col-5 row__coll-options">
                        <ThemedIconButton size="small" color="error" onClick={removeStadium(id)}>
                           <ThemedTooltip title="Usuń stadion">
                              <DeleteRoundedIcon style={{ color: '#ff2b59' }} />
                           </ThemedTooltip>
                        </ThemedIconButton>
                     </div>

                     <div className="row__col--mobileOptions">
                        <ThemedButton
                           variant="outlined"
                           color="primary"
                           size="small"
                           className="mobileOption"
                           onClick={redirectToStadiumView(id)}
                        >
                           Edytuj
                        </ThemedButton>
                        <ThemedButton
                           variant="outlined"
                           color="secondary"
                           size="small"
                           className="mobileOption"
                           onClick={removeStadium(id)}
                        >
                           Usuń stadion
                        </ThemedButton>
                     </div>
                  </li>
               ))
            ) : (
               <li className="table__emptyState">Brak stadionów do wyświetlenia</li>
            )}
         </ul>
      </div>
   );
};

StadiumTable.propTypes = {
   leagueGid: string,
};

export default memo(StadiumTable);
