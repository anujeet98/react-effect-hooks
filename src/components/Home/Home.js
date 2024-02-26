import React, { useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import AuthContext from '../../contexts/auth-context';

const Home = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <button onClick={authCtx.onLogout}>Logout</button>
    </Card>
  );
};

export default Home;
