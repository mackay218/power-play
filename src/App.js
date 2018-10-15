import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LandingPage from './components/LandingPage/LandingPage';
import TermsPage from './components/TermsPage/TermsPage';
import PlayerProfileDisplay from './components/PlayerProfilePage/PlayerProfileDisplay';
import PlayersListedPage from './components/PlayersListedPage/PlayersListedPage';
import AdminPage from './components/AdminPage/AdminPage';
import CoachListPage from './components/AdminPage/CoachListPage';
import TeamsPage from './components/TeamsPage/TeamsPage';
import SuspendPage from './components/PlayerProfilePage/SuspendPage';
import SetPasswordPage from './components/SetPasswordPage/SetPasswordPage';

import './styles/main.css';

const App = () => (
  <div>
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
        component={PlayerProfileDisplay}
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
        <Route
        path="/teams"
        component={TeamsPage}
        />
        <Route
        path="/set_password/:inviteCode"
        component={SetPasswordPage}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
