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
import MyInfoPage from './Components/mypage';
import PostWrite from './Components/post_write';
import PostUpdate from './Components/post_update';
import Footer from './Components/footer';
import Crawling from './Components/crawling';

function App() {
  return (
    <Fragment>
      {/* <div className="view_section"> */}
        <Header></Header>
        <MenuBar></MenuBar>

        <Routes>
            <Route path="/" element={<BoardList/>}></Route>
            <Route path="/notice" element={<BoardList_Notice/>}></Route>
            <Route path="/free" element={<BoardList_Free/>}></Route>
            <Route path="/study" element={<BoardList_Study/>}></Route>
            <Route path="/graduate" element={<BoardList_Graduate/>}></Route>
            <Route path="/login" element={<LoginPage/>}></Route>
            <Route path="/signup" element={<Register/>}></Route>
            <Route path="/info" element={<MyInfoPage/>}></Route>
            <Route path="/view/:viewId" element={<ViewPage/>}></Route>
            <Route path="/notice/view/:viewId" element={<ViewPage/>}></Route>
            <Route path="/free/view/:viewId" element={<ViewPage/>}></Route>
            <Route path="/study/view/:viewId" element={<ViewPage/>}></Route>
            <Route path="/graduate/view/:viewId" element={<ViewPage/>}></Route>
            <Route path="/post_write" element={<PostWrite/>}></Route>
            <Route path="/post_update/:viewId" element={<PostUpdate/>}></Route>
        </Routes>
        <Crawling></Crawling>
        <Footer></Footer>
      {/* </div> */}
    </Fragment>
  );
}

export default App;
