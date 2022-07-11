import { deleteSession } from 'api/manageSession';

export const logout = (history, client) => () => {
   deleteSession();
   client.clearStore();
   history.push('/login');
};
