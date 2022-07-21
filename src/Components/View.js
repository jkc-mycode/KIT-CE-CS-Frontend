import React, {useEffect, useState} from 'react';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import './view.css';


function ViewPage(){
    const location = useLocation();
    //const data = location.state.data;
    const [list, setList] = useState([]);
    const [next, setNext] = useState([]);
    const [prev, setPrev] = useState([]);
    const [date, setDate] = useState();
    let test = useParams().viewId;

    function timer(d){
        let timestamp = d;
        let date = new Date(timestamp);

        return (date.getFullYear()+
            "/"+(date.getMonth()+1)+
            "/"+date.getDate()+
            " "+date.getHours()+
            ":"+date.getMinutes()+
            ":"+date.getSeconds());
    }

    const getPost = async () => {
        //await axios.get("http://kittaxipool.iptime.org:3000/article/view/" + test)
        const posts = await axios.get("/article/view/" + test)
        console.log(posts.data.article);
        setList(posts.data.article);
        setNext(posts.data.next);
        setPrev(posts.data.prev);
        setDate(timer(posts.data.article.date));
    }
    useEffect(() => {
        // async function temp(){
        //     await axios.get("/article/view/" + test)
        //         .then((res) => {
        //             //setList(res.data);
        //             console.log(test);
        //             console.log(res.data);
        //             window.localStorage.setItem("aaaa", JSON.stringify(res.data));
        //             console.log(window.localStorage.getItem("aaaa"));
        //         })
        //         .catch((e) => {
        //             console.log(e);
        //         })
        // }
        // obj = JSON.parse(window.localStorage.getItem("aaaa"));
        // console.log(obj);
        // window.localStorage.removeItem("aaaa");
        getPost();
    }, [])
    return (
        <div className="view_section">
            <div className="post_section">
                <div className="post_tag" >#{list.tag}</div> {/* {post.tag} */}
                <h1 className="title">&#xE001;_ {list.title}</h1> {/* {post.title} */}
                <div>
                    <div className="post_info_table">
                        <div className="post_info_author">{list.author}</div> {/* {post.author} */}
                        <div className="post_info_hit">{list.views} &nbsp;</div> {/* {post.hit} */}
                        <div className="post_info_date">{date} &nbsp;</div> {/* {post.date} */}
                    </div>
                    <div className="line"></div>
                    <div className="post_content" style={{height: '400px'}}>{list.content}</div> {/* {post.content} */}
                </div>
                <div>
                    <table className="edit_delete_list">
                        <tr>
                            <td>수정</td>
                            <td>삭제</td>
                            <td>목록</td>
                        </tr>
                    </table>
                    <div className="line"></div>
                </div>
                <div className="test">댓글 메뉴 위치 (예정)</div>
                <div className="line"></div>
                <br/>
                <table className="post_table">
                    <tr>
                        <td>&#xE000; 이전글</td>
                        <td>{next.title}</td>
                    </tr>
                    <tr>
                        <td>다음글 &#xE001;</td>
                        <td>{prev.title}</td>
                    </tr>
                </table>
                {/* <BoardList/> */}
            </div>
        </div>
    )
}
export default ViewPage;