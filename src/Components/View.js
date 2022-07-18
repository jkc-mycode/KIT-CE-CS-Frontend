import React, {useEffect, useState} from 'react';
import './view_test.css';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';


import Header from './header';
import MenuBar from './menubar';
import BoardList from './boardlist';


function ViewPage(){
    const [list, setList] = useState({});
    let test = useParams().viewId;

    async function refresh(){
        await axios.get("http://kittaxipool.iptime.org:3000/article/view/" + test)
            .then((res) => {
                console.log(res.data);
                setList(res.data);
                console.log(list);
            })
            .catch((e) => {
                console.log(e);
            })
    }

    useEffect(() => {
       //refresh();

    }, [])
    refresh();
    return (
        <>
            <h1 className="title">게시글 타이틀</h1> {/* {post.title} */}
            <div>
                <table className="post_info_table">
                    <tr>
                        <td>{list.article.author}</td> {/* {post.author} */}
                        <td>작성일 &nbsp;</td> {/* {post.date} */}
                        <td>조회수 &nbsp;</td> {/* {post.hit} */}
                    </tr>
                </table>
                <div className="test" style={{height: '400px'}}>{1234}</div> {/* {post.content} */}
                <div className="test" >태그 정보</div> {/* {post.tag} */}
            </div>
            <br/>
            <div>
                <table className="revise_delete_list">
                    <tr>
                        <td>수정(버튼)</td>
                        <td>삭제(버튼)</td>
                        <td>목록(버튼)</td>
                    </tr>
                </table>
            </div>
            <div className="test">댓글 메뉴 위치 (예정)</div><br/>
            <BoardList/>
        </>
    )
}
export default ViewPage;