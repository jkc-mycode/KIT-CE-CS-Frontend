import logo from './logo.svg';
import './App.css';
import React, {useState, Fragment} from "react";
import {Route, Routes} from 'react-router-dom';


import Header from './Components/header';
import MenuBar from './Components/menubar'
import BoardList from './Components/boardlist'
import LoginPage from './Components/Login'
import Register from './Components/Register';
import ViewPage from './Components/View';

function App() {
  return (
    <Fragment>
        <Header></Header>
        <MenuBar></MenuBar>

        <Routes>
            <Route path="/" element={<BoardList/>}></Route>
            <Route path="/login" element={<LoginPage/>}>
            </Route>
            <Route path="/signup" element={<Register/>}></Route>
            <Route path="/view/:viewId" element={<ViewPage/>}></Route>
        </Routes>
    </Fragment>
  );
}

export default App;
