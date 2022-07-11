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
    console.log(JSON.stringify(sessionStorage));
    if(loginmessage === "Welcome! asd"){
        return(
            <div className = "header">
                <div className ="header_container">
                    <Link to="/">CE-SE</Link>
                    <Link to="/" onClick={onClickLogout}>Logout</Link>
                    <Link to="/MyPage">MyPage</Link>
                </div>
            </div>
        );
    }else{
        return(
            <div className = "header">
                <div className ="header_container">
                    <Link to="/">CE-SE</Link>
                    <Link to="/login">로그인</Link>
                    <Link to="/signup">회원가입</Link>
                    <Link to="/MyPage">MyPage</Link>
                </div>
            </div>
        );
    }
}

export default Header;