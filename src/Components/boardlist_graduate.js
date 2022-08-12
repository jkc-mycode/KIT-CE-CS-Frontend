import React from "react";
import './boardlist.css';
import BoardRow from './boardrow';
import Crawling from './crawling.js';


function BoardList() {
    return(
        <div className = "view_section">
            <div className="left_section">
                <div className="nowBoard">&#xE001;_ 졸업생 게시판</div>
                <table className = "board_list_table">
                    <thead className = "board_head">
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>조회수</th>
                    </tr>
                    </thead>
                    <tbody className = "board_body">
                    <BoardRow/>
                    </tbody>
                </table>
            </div>
            <div className="margin_section"></div>
            <div className="right_section">
                <Crawling></Crawling>
            </div>
        </div>
    )
}

export default BoardList;