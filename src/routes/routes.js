/***
 *  Created by Sanchit Dang
 ***/
import React, { useContext, useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginContext } from 'contexts';
import { Login, Register, Home, MobileMenu } from 'views';
import { Layout } from '../layout';
import { LayoutConfig } from 'configurations';

export const AppRoutes = (props) => {
  const { loginStatus } = useContext(LoginContext);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  let landingPage = (LayoutConfig.landingPage !== undefined ?
    LayoutConfig.landingPage !== '' ? LayoutConfig.landingPage : '/home'
    : '/home');
  useEffect(() => {
    if (loginStatus)
      setRedirectToLogin(false);
    else
      setRedirectToLogin(true);
  }, [loginStatus]);
  return (
    <Switch>
      <Route exact path='/' render={() => ((redirectToLogin ? <Redirect to={{ pathname: '/login' }} {...props} /> : <Redirect to={{
        pathname: landingPage
      }} {...props} />))} />
      <Route exact path='/login' render={() => ((!redirectToLogin ? <Redirect to={{ pathname: landingPage }} {...props} /> : <Login  {...props} />))} />
      <Route exact path='/register' render={() => ((!redirectToLogin ? <Redirect to={{ pathname: landingPage }} {...props} /> : <Register {...props} />))} />
      <Layout>
        <Route exact path='/home' render={() => ((redirectToLogin ? <Redirect to={{ pathname: '/login' }} {...props} /> : <Home {...props} />))} />
        <Route exact path='/menu' render={() => ((redirectToLogin ? <Redirect to={{ pathname: '/login' }}  {...props} /> : <MobileMenu  {...props} />))} />
      </Layout>
    </Switch>
  );
};
