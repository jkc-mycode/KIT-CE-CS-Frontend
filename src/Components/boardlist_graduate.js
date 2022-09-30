import React from "react";
import './boardlist.css';
import BoardRow from './boardrow';
import Crawling from './crawling';

function BoardList() {
    return(
        <div className = "viewArea">
            <div className = "bodyArea">
                <div className="mainSection">
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
                        </table>
                        <div className="boardlist_body">
                            <BoardRow />
                        </div>
                    </div>
                </div>
                <div className="sideSection">
                    <Crawling />
                </div>
            </div>
        </div>
    )
}

export default BoardList;