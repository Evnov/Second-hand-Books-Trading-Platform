import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// import { withRouter } from 'react-router';
import Home from './Pages/Home';
import Navbar from './Layouts/Navbar';
import SearchResult from './Pages/Search';
import Login from './Pages/Login'
import Signup from './Pages/Signup'
// import Footer from './Layouts/Footer';

function App() {
  return (
    <div className="App">
        <Router basename={process.env.PUBLIC_URL}>
          <Navbar/>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/search" exact component={SearchResult} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            {/* <Route exact path="/account" component={Account} /> */}
          </Switch>
          {/* <Footer/> */}
        </Router>
    </div>
  );
}

export default App;
