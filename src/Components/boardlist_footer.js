import React from "react";
import './menubar.css';
import {useNavigate} from 'react-router-dom';
import { getCookie } from '../cookie';

function BoardFooter() {
    const navigate = useNavigate();
    const loginCheck = () => {
        if(!getCookie("kit_acs")){
            alert("로그인 후 이용 가능합니다.");
            navigate('/login')
        }else{
            navigate('/post_write');
        }
    }
    return (
        <div className = "boardlist_footer">
            <button type="button" className="post_write" onClick={loginCheck}>글쓰기</button>
        </div>
    )
}

export default BoardFooter;