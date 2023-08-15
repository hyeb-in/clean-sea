import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Bootstrap Bundle CSS
import './App.scss';

// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import Main from "./pages/Main";
import Login from "./pages/Login";
import Join from "./pages/Join";
import MyProfile from "./pages/MyProfile";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Join />} />
        <Route path="/users/:id" exact element={<MyProfile />} />
        <Route path="/search" exact element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
