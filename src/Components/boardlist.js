import React from "react";
import './boardlist.css';
import BoardRow from './boardrow';

function BoardList() {
    return(
        <div className = "board_list_container">
            <div className="nowBoard">#전체 게시판</div>
            <table className = "board_list_table">
                <thead className = "board_head">
                <tr>
                    <th>번호</th>
                    <th>카테고리</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>조회수</th>
                </tr>
                </thead>
                <tbody className = "board_body">
                <BoardRow />
                </tbody>
            </table>
        </div>
    )
}

export default BoardList;