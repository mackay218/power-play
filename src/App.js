import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LandingPage from './components/LandingPage/LandingPage';
import TermsPage from './components/TermsPage/TermsPage';
import HomePage from './components/HomePage/HomePage';
import PlayerProfilePage from './components/PlayerProfilePage/PlayerProfilePage';
import PlayersListedPage from './components/PlayersListedPage/PlayersListedPage';
import AdminPage from './components/AdminPage/AdminPage';
import CoachListPage from './components/AdminPage/CoachListPage';
import SuspendPage from './components/PlayerProfilePage/SuspendPage';

import './styles/main.css';

const App = () => (
  <div>
    <Header title="Project Base" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/landing_page" />
        <Route
          path="/login"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/home"
          component={HomePage}
        />
        {/* static legal terms page */}
        <Route
          path="/terms"
          component={TermsPage}
        />
        <Route
          path="/landing_page"
          component={LandingPage}
        />
        {/* page that will be displayed when user with "player" role logs in */}
        <Route
        path="/player_profile_page"
        component={PlayerProfilePage}
        />
        <Route
        path="/suspend_page"
        component={SuspendPage}
        />
        <Route
        path="/players_page"
        component={PlayersListedPage}
        />
        <Route
        path="/admin_page"
        component={AdminPage}
        />
        <Route
        path="/admin_coach_list_page"
        component={CoachListPage}
        />
        
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
