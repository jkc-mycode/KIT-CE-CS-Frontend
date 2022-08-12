import React from "react";
import './boardlist.css';
import BoardRow from './boardrow';
import Crawling from './crawling.js';
import BoardFooter from './boardlist_footer';

function BoardList() {
    return(
        <div className = "view_section">
            <div className = "body_section">
            <div className="left_section">
                <div className="nowBoard">&#xE001;_ 공지사항</div>
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
                    <BoardFooter />
                
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