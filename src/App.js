import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import { createContext, useState } from 'react';
import NotFound from './Components/NotFound/NotFound';
import Blog from './Components/Blog/Blog';
import CreatePost from './Components/CreatePost/CreatePost';
import DetailPost from './Components/DetailPost/DetailPost';


export const UserContext = createContext();
function App(props) {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
    <Router>
        <Switch>
          <Route path= '/home'>
            <Home></Home>
          </Route>
          <Route path= '/login'>
            <Login></Login>
          </Route>
          <PrivateRoute path= '/blog'>
            <Blog></Blog>
          </PrivateRoute>
          <PrivateRoute path= '/detailPost/:postId'>
            <DetailPost></DetailPost>
          </PrivateRoute>
          <PrivateRoute path= '/postBlog'>
            <CreatePost></CreatePost>
          </PrivateRoute>
          <Route exact path= '/'>
            <Home></Home>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
