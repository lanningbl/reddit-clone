import { createContext } from 'react';
export default createContext({
  token: null,
  user_id: null,
  login: (token, user_id, token_expiration) => {},
  logout: () => {},
});
