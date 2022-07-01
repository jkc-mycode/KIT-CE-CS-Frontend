import React from "react";
import './boardlist.css';
import BoardRow from './boardrow';

const boardlist = [{
    no: 1,
    title : "ㅇ러ㅐ오랴볼댜로댜로댤댜ㅗㄹ도ㅑㄹ도",
    author : '120404214',
    date : '2022-07-01',
    increment : 21313123
    },
    {
        no: 2,
        title : "ㅇ러ㅐ오랴볼댜로댜로댤댜ㅗㄹ도ㅑㄹ도",
        author : '120404214',
        date : '2022-07-01',
        increment : 21313123
    },
    {
        no: 3,
        title : "ㅇ러ㅐ오랴볼댜로댜로댤댜ㅗㄹ도ㅑㄹ도",
        author : '120404214',
        date : '2022-07-01',
        increment : 21313123
    },
    {
        no: 4,
        title : "ㅇ러ㅐ오랴볼댜로댜로댤댜ㅗㄹ도ㅑㄹ도",
        author : '120404214',
        date : '2022-07-01',
        increment : 21313123
    },
    {
        no: 5,
        title : "ㅇ러ㅐ오랴볼댜로댜로댤댜ㅗㄹ도ㅑㄹ도",
        author : '120404214',
        date : '2022-07-01',
        increment : 21313123
    },
    {
        no: 6,
        title : "ㅇ러ㅐ오랴볼댜로댜로댤댜ㅗㄹ도ㅑㄹ도",
        author : '120404214',
        date : '2022-07-01',
        increment : 21313123
    },
]


function BoardList() {
    return(
        <div className = "board_list_container">
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
                <BoardRow boardList={boardlist}/>
                </tbody>
            </table>
        </div>
    )
}

export default BoardList;