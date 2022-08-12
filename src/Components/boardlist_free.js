import React from "react";
import './boardlist.css';
import BoardRow from './boardrow';
import Crawling from './crawling';



function BoardList() {
    return(
        <div className = "view_section">
            <div className="body_section">
            <div className="left_section">
                <div className="nowBoard">&#xE001;_ 자유 게시판</div>
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
                    </tbody>
                </table>
                <BoardRow/>
            </div>
            <div className="margin_section"></div>
            <div className="right_section">
                <Crawling></Crawling>
            </div>
            </div>
        </div>
    )
}

export default BoardList;