import React, { useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { withRouter } from 'react-router';
import Home from "./Pages/Home";
import Navbar from "./Layouts/Navbar";
import Footer from "./Layouts/Footer";
import SearchResult from "./Pages/Search";
import Login from "./Pages/Login";
import Sale from "./Pages/Sale";
import Rental from "./Pages/Rental";
import Watchlist from "./Pages/Watchlist";
import Post from "./Pages/Post";
import BookDetail from "./Pages/BookDetail";
import Profile from "./Pages/Profile";

export const AuthContext = React.createContext();

const iniState = { user: null };

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.data));
      return { user: action.data };
    case "LOGOUT":
      localStorage.clear();
      return { user: null };
    case "UPDATE":
      return { user: action.data };
    case "CHECK_CACHE":
      const usernow = JSON.parse(localStorage.getItem("user"));
      return { user: usernow };
    default:
      return iniState;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, iniState);
  return (
    <div className="App">
      <AuthContext.Provider value={{ state, dispatch }}>
        <Router basename={process.env.PUBLIC_URL}>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/search/:query" exact component={SearchResult} />
            <Route path="/login" exact component={Login} />
            <Route path="/sale" exact component={Sale} />
            <Route path="/rental" exact component={Rental} />
            <Route path="/watchlist" exact component={Watchlist} />
            <Route path="/post" exact component={Post} />
            <Route path="/bookdetail/:bookID" exact component={BookDetail} />
            <Route path="/profile" exact component={Profile} />
          </Switch>
          <Footer />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
