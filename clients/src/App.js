import './App.css';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

// 2
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

// 60
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

// 93
import Messenger from './pages/messenger/Messenger';

function App() {
  const {user} = useContext(AuthContext)
  return (
    // 3
    <Router>
      <Switch>
        <Route exact path="/">
           {user ? <Home></Home> : <Register></Register>}
        </Route>
        <Route path="/login">
           {user ? <Redirect to="/"></Redirect> : <Login></Login>}
        </Route>
        <Route path="/register">
           {user ? <Redirect to="/"></Redirect> : <Register></Register>}
        </Route>
        <Route path="/profile/:username">
            {user ? <Profile></Profile> : <Redirect to="/login"></Redirect>}
        </Route>
        {/* 94 */}
        <Route path="/messenger">
           {!user ? <Redirect to="/"></Redirect> : <Messenger></Messenger>}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
