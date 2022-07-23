import React from "react";
import './menubar.css';
import {Link} from 'react-router-dom';

function MenuBar(){
    return (
        <div className = "menubar">
            <Link className="menubar_items" to="/">전체 게시판</Link>
            <Link className="menubar_items" to="/boardlist_notice">공지사항</Link>
            <Link className="menubar_items" to="/boardlist_study">학업 게시판</Link>
            <Link className="menubar_items" to="/boardlist_free">자유 게시판</Link>
            <Link className="menubar_items" to="/boardlist_graduate">졸업생 게시판</Link>
        </div>
    )
}

export default MenuBar;