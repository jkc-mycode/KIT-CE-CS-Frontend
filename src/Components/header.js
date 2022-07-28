import React from "react";
import './header.css';
import {Link} from 'react-router-dom';

const onClickLogout = (event) => {
    event.preventDefault();
    let sessionStorage = window.sessionStorage;
    sessionStorage.clear();
    window.location.reload();
}

function Header(){
    let sessionStorage = window.sessionStorage;
    let user_id = sessionStorage.getItem("id");
    let loginmessage = sessionStorage.getItem("message");
    //console.log(JSON.stringify(sessionStorage));
    if(loginmessage === "Welcome! "+user_id){
        return(
            <div className = "header">
                <div className ="header_container">
                    <Link to="/" className="header_items">CE-SE</Link>
                    <div className="header-right-container">
                        <Link to="/" className="header_items" onClick={onClickLogout}>Logout</Link>
                        <div className="header_line"></div>
                        <Link to="/MyPage" className="header_items">MyPage</Link>
                    </div>
                </div>
            </div>
        );
    }else{
        return(
            <div className = "header">
                <div className ="header_container">
                    <Link to="/" className="header_items">CE-SE</Link>
                    <div className="header-right-container">
                        <Link to="/login" className="header_items">로그인</Link>
                        <div className="header_line"></div>
                        <Link to="/signup" className="header_items">회원가입</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;