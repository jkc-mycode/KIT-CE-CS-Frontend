import React, {useState, useEffect} from "react";
import './boardlist.css';
import BoardRow from './boardrow';
import axios from 'axios';


function BoardList() {
    const [list, setList] = useState([]);
    useEffect(() => {
        //axios.get("http://kittaxipool.iptime.org:3000/article/")
        axios.get("/article/")
            .then((res) => {
                console.log(res.data);
                setList(res.data.board);
            })
            .catch((e) => {
                console.log(e);
            })
    }, [])
    // const getList = async () => {
    //     const posts = await axios.get("/article/")
    //     console.log(posts.data);
    //     setList(posts.data);
    // }
    // useEffect(() => {
    //     //axios.get("http://kittaxipool.iptime.org:3000/article/")
    //     getList();
    // }, [])
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
                <BoardRow boardList={list}/>
                </tbody>
            </table>
        </div>
    )
}

export default BoardList;