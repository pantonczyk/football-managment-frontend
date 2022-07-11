import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';

import { getSession, deleteSession } from 'api/manageSession';

const isDevelopment = process.env.NODE_ENV == 'development';

const deauthLink = new ApolloLink((operation, forward) => {
   return forward(operation).map((response) => {
      const signatureError = !!response?.errors?.find(
         (err) =>
            err?.message === 'Error decoding signature' ||
            err?.message === 'Authentication credentials were not provided'
      );

      if (signatureError) {
         deleteSession();
         window.location.replace('/login');
         return null;
      }
      return response;
   });
});

const httpLink = createUploadLink({
   uri: process.env.GRAPHQL_URI || '',
});

const authLink = setContext((_, { headers }) => {
   const sesion = getSession();
   const token = sesion?.token;

   return {
      headers: {
         ...headers,
         authorization: token ? `JWT ${token}` : '',
      },
   };
});

export const client = new ApolloClient({
   link: deauthLink.concat(authLink.concat(httpLink)),
   connectToDevTools: isDevelopment,
   cache: new InMemoryCache(),
});
