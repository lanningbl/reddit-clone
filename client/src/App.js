import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';

import AuthContext from './contexts/auth-context';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CommunityPage from './pages/CommunityPage';

function App() {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const login = (user_id, token, token_expiration) => {
    setUserId(user_id);
    setToken(token);
  };

  const logout = () => {
    setUserId(null);
    setToken(null);
  };

  // const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  // if (!user && localStorage.jwtToken) {
  //   const token = localStorage.jwtToken;
  //   const decoded = jwt_decode(token);
  //   setUser(decoded);
  //   const currentTime = Date.now() / 1000;
  //   if (decoded.exp < currentTime) {
  //     localStorage.removeItem('jwtToken');
  //     setUser(null);
  //   }
  // }

  return (
    <Router>
      <AuthContext.Provider
        value={{ userId: userId, token: token, login: login, logout: logout }}
      >
        <Navigation />
        <div className='app-container'>
          <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path={window.location.pathname} component={CommunityPage} />
          </Switch>
        </div>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
