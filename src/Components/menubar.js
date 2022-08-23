import React from "react";
import './menubar.css';
import {Link} from 'react-router-dom';

function MenuBar(){
    return (
        <div className = "box menubar">
            <Link className="menubar_items" to="/">전체 게시판</Link>
            <div className="menubar_line"></div>
            <Link className="menubar_items" to="/notice">공지사항</Link>
            <div className="menubar_line"></div>
            <Link className="menubar_items" to="/study">학업 게시판</Link>
            <div className="menubar_line"></div>
            <Link className="menubar_items" to="/free">자유 게시판</Link>
            <div className="menubar_line"></div>
            <Link className="menubar_items" to="/graduate">졸업생 게시판</Link>
        </div>
    )
}

export default MenuBar;