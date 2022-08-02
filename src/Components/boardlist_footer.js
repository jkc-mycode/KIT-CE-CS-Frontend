import React from "react";
import './menubar.css';
import {useNavigate} from 'react-router-dom';
import styled from "styled-components";

function BoardFooter({ total, limit, page, setPage }){
    const numPages = Math.ceil(total / limit);
    const navigate = useNavigate();
    const loginCheck = () => {
        if(window.sessionStorage.getItem("id") === null){
            alert("로그인 후 이용 가능합니다.");
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

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: deeppink;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default BoardFooter;