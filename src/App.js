import './App.css';
import { Router, Switch, Route, Link } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import PublicRoute from './PublicRoutes';
import PrivateRoute from './PrivateRoutes';
import { Diary } from './features/diary';
import { Entry } from './features/entry';
import {  Login } from './features/user/Login';
import { Signup } from './features/user/signup';
import { Profile } from './features/user/Profile';
function App() {
  const history = createBrowserHistory()
  return (
    <Router history={history}>
      <Switch>
        <PublicRoute component={Login}exact path='/' />
        <PublicRoute component={Signup}exact path='/signup' />
        <PrivateRoute restricted={true} component={Entry} path={'/entry/:id'} />
        <PrivateRoute restricted={true} component={Diary} path={'/diary'} />
        <PrivateRoute restricted={true} component={Profile} path={'/profile'} />
      </Switch>

    </Router>
  );
}

export default App;
