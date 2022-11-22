import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './assets/trivia-logo.png';
import pattern from './assets/geometric-lines.png';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import ThemeSong from './components/AudioPlayer';

export default function App() {
  return (
    <div className="App">
      <ThemeSong />
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <img src={ pattern } className="pattern-circle-bottom" alt="pattern-circle" />
        <img src={ pattern } className="pattern-circle-top" alt="pattern-circle" />
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/settings" component={ Settings } />
          <Route exact path="/game" component={ Game } />
          <Route exact path="/feedback" component={ Feedback } />
          <Route exact path="/ranking" component={ Ranking } />
        </Switch>
      </header>
    </div>
  );
}
