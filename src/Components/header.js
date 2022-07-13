import React from "react";
import './header.css';
import {Link} from 'react-router-dom';

function Header(){
    return(
        <div className = "header">
            <div className ="header_container">
                <Link to="/">CE-SE</Link>
                <div className="header-right-container">
                    <Link to="/login">로그인</Link>
                    <div className="header_line"></div>
                    <Link to="/signup">회원가입</Link>
                    <div className="header_line"></div>
                    <Link to="/MyPage">MyPage</Link>
                </div>
            </div>
        </div>
    );
}

export default Header;