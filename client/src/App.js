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
import Sale from './Pages/Sale'
import Rental from './Pages/Rental'
import Watchlist from './Pages/Watchlist'
import Message from './Pages/Message'
import BookDetail from './Pages/BookDetail'
// import Footer from './Layouts/Footer';

function App() {
  return (
    <div className="App">
        <Router basename={process.env.PUBLIC_URL}>
          <Navbar/>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/search/:query" exact component={SearchResult} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/sale" exact component={Sale} />
            <Route path="/rental" exact component={Rental} />
            <Route path="/watchlist" exact component={Watchlist} />
            <Route path="/message" exact component={Message} />
            <Route path="/bookdetail/:bookID" exact component={BookDetail} />
            {/* <Route exact path="/account" component={Account} /> */}
          </Switch>
          {/* <Footer/> */}
        </Router>
    </div>
  );
}

export default App;
