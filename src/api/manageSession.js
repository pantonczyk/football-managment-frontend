const AUTH_SESSION = 'AUTH_SESSION';

// const session = { token, currentUserRole };

export const createSession = (session) => {
   localStorage.setItem(AUTH_SESSION, JSON.stringify(session));
};

export const getSession = () => {
   return JSON.parse(localStorage.getItem(AUTH_SESSION));
};

export const deleteSession = () => {
   localStorage.removeItem(AUTH_SESSION);
};
