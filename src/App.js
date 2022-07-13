import React from "react";
import "./App.css";
import MainApp from "./MainApp";
import { Route, Routes } from "react-router-dom";
import Authentication from "./Authentication";
import EmailAuth from './Email-auth.js'
import 'antd/dist/antd.variable.min.css';
import Dashboard from "./Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/login" element={<Authentication />} />
        <Route path="/signin" element={<EmailAuth/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </>
  );
}

export default App;
