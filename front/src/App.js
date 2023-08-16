import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyProfile from "./pages/MyProfile";
import Search from "./pages/Search";
import "./index.css";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/SignUp" exact element={<SignUp />} />
        <Route path="/users/:id" exact element={<MyProfile />} />
        <Route path="/search" exact element={<Search />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
