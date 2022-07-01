import React from "react";
import './header.css';
import {Link} from 'react-router-dom';

function Header(){
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

export default Header;