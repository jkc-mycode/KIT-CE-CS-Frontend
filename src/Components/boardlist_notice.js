import React, {useState, useEffect} from "react";
import './boardlist.css';
import BoardRow from './boardrow';
import axios from 'axios';


function BoardList() {
    const [list, setList] = useState([]);
    let temp = []; //배열 임시저장 변수
    useEffect(() => {
        axios.get("/article/notice")
            .then((res) => {
                console.log(res.data.board);
                setList(res.data.board);
            })
            .catch((e) => {
                console.log(e);
            })
    }, [])

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
                <BoardRow boardList={list}/>
                </tbody>
            </table>
        </div>
    )
}

export default BoardList;