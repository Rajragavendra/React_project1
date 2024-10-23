import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Components/login";
import Signup from "../Components/signup";
import Admin from "../Components/admin";
import User from "../Components/user";

const PriavteRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/user/:id" element={<User/>}/>
    </Routes>
  );
};

export default PriavteRoute;
