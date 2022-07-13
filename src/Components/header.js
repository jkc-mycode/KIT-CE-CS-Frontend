import React from "react";
import './header.css';
import {Link} from 'react-router-dom';

function Header(){
    return(
        <div className = "header">
            <div className ="header_container">
                <Link className="header_items" to="/">CE-SE</Link>
                <Link className="header_items" to="/login">로그인</Link>
                <Link className="header_items" to="/signup">회원가입</Link>
                <Link className="header_items" to="/MyPage">MyPage</Link>
            </div>
        </div>
    );
}

export default Header;