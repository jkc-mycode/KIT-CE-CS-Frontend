import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";


function App() {
    let [post, setPost] = useState([]);

  return (
    <div>
        <div className = "header">
            <div className = "items">CE-SE</div>
            <div className = "items">login</div>
            <div className = "items">MyPage</div>
        </div>
        <div className = "menu_fixed">
            <div className = "menubar">
                <div className = "menu_items">전체 게시판</div>
                <div className = "menu_items">졸업생 게시판</div>
                <div className = "menu_items">질문 게시판</div>
                <div className = "menu_items">학업 게시판</div>
                <div className = "menu_items">차후 추가 예정</div>
                <div className = "menu_items">차후 추가 예정</div>
            </div>
        </div>
        <div className = "board">
            <table>
                <tr>
                    <td>번호</td>
                    <td>제목</td>
                    <td>작성자</td>
                    <td>작성일</td>
                    <td>조회수</td>
                </tr>
                <td>더미데이터</td>
            </table>
        </div>
    </div>
  );
}

export default App;
