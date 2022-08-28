import React from "react";
import './boardlist.css';
import BoardRow from './boardrow';
import Crawling from './crawling';
import BoardFooter from './boardlist_footer';

function BoardList() {
    return(
        <div className = "viewSection">
            <div className = "bodySection">
                <div className="main">
                    <div className="box">
                        <div className="boxTitle">&#xE001;_ 졸업생 게시판</div>
                        <table className = "boardlist_table">
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
                        <div className="boardlist_body">
                            <BoardRow />
                        </div>
                        <BoardFooter />
                    </div>
                </div>
                <div className="side">
                    <Crawling></Crawling>
                </div>
            </div>
        </div>
    )
}

export default BoardList;