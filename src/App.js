import logo from './logo.svg';
import './App.css';
import React, {useState, Fragment} from "react";
import {Route, Routes} from 'react-router-dom';


import Header from './Components/header';
import MenuBar from './Components/menubar'
import BoardList from './Components/boardlist'
import BoardList_Notice from './Components/boardlist_notice'
import BoardList_Study from './Components/boardlist_study'
import BoardList_Free from './Components/boardlist_free'
import BoardList_Graduate from './Components/boardlist_graduate'
import LoginPage from './Components/Login'
import Register from './Components/Register';
import ViewPage from './Components/View';
import MyPage from './Components/mypage';

function App() {
  return (
    <Fragment>
      {/* <div className="view_section"> */}
        <Header></Header>
        <MenuBar></MenuBar>

        <Routes>
            <Route path="/" element={<BoardList/>}></Route>
            <Route path="/boardlist_notice" element={<BoardList_Notice/>}></Route>
            <Route path="/boardlist_free" element={<BoardList_Free/>}></Route>
            <Route path="/boardlist_study" element={<BoardList_Study/>}></Route>
            <Route path="/boardlist_graduate" element={<BoardList_Graduate/>}></Route>
            <Route path="/login" element={<LoginPage/>}></Route>
            <Route path="/signup" element={<Register/>}></Route>
            <Route path="/mypage" element={<MyPage/>}></Route>
            <Route path="/view/:viewId" element={<ViewPage/>}></Route>
            <Route path="/boardlist_notice/view/:viewId" element={<ViewPage/>}></Route>
            <Route path="/boardlist_free/view/:viewId" element={<ViewPage/>}></Route>
            <Route path="/boardlist_study/view/:viewId" element={<ViewPage/>}></Route>
            <Route path="/boardlist_graduate/view/:viewId" element={<ViewPage/>}></Route>
        </Routes>
      {/* </div> */}
    </Fragment>
  );
}

export default App;
