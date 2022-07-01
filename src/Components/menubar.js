import React from "react";
import './menubar.css';

function MenuBar(){
    return (

            <div className = "menubar">
                <div className = "menubar_items">전체 게시판</div>
                <div className = "menubar_items">공지사항</div>
                <div className = "menubar_items">학업 게시판</div>
                <div className = "menubar_items">자유 게시판</div>
                <div className = "menubar_items">졸업생 게시판</div>
            </div>
    )
}

export default MenuBar;