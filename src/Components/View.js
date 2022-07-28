import React, {useEffect, useState} from 'react';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import './view.css';


function ViewPage(){
    const location = useLocation();
    const navigate = useNavigate();
    //const data = location.state.data;
    const [list, setList] = useState([]);
    const [next, setNext] = useState([]);
    const [prev, setPrev] = useState([]);
    const [date, setDate] = useState();
    let id = useParams().viewId;

    function timer(d){
        let timestamp = d;
        let date = new Date(timestamp);

        let year = date.getFullYear().toString().slice(-2); //년도 뒤에 두자리
        let month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
        let day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
        let hour = ("0" + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
        let minute = ("0" + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
        let second = ("0" + date.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)

        let returnDate = year + "." + month + "." + day + ". " + hour + ":" + minute + ":" + second;

        return returnDate;
    }

    const updateLoginCheck = () => {
        if(list.author !== window.sessionStorage.getItem("name")){
            alert("사용이 불가합니다.");
        }else{
            navigate('/post_update/' + id, {state: list});
        }
    }
    const deletePost = () => {
        if(list.author !== window.sessionStorage.getItem("name")){
            alert("사용이 불가합니다.");
        }else{
            axios.delete('/article/' + id)
                .then((res) => {
                    console.log(res.data);
                    navigate('/');
                })
                .catch((e) => {
                    console.log(e);
                })
        }
    }

    const getPost = async () => {
        //await axios.get("http://kittaxipool.iptime.org:3000/article/view/" + id)
        const posts = await axios.get("/article/view/" + id)
        console.log(posts.data.article);
        console.log(posts.data.next[0]);
        console.log(posts.data.prev[0]);
        setList(posts.data.article);
        setNext(posts.data.next[0]);
        setPrev(posts.data.prev[0]);
        setDate(timer(posts.data.article.date));
    }
    useEffect(() => {
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
                    <div className="post_content" style={{height: '400px'}} dangerouslySetInnerHTML={{__html : list.content}}>
                    </div> {/* {post.content} */}
                </div>
                <div>
                    <table className="edit_delete_list">
                        <tr>
                            <td onClick={updateLoginCheck}>수정</td>
                            <td onClick={deletePost}>삭제</td>
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
                        {
                            prev === undefined
                            ? <td>이전 글이 없습니다.</td>
                            : <td onClick={() => {navigate('/view/'+prev._id); window.location.reload(); }}>{prev.title}</td>
                        }
                    </tr>
                    <tr>
                        <td>다음글 &#xE001;</td>
                        {
                            next === undefined
                            ? <td>다음 글이 없습니다.</td>
                            : <td onClick={() => {navigate('/view/'+next._id); window.location.reload(); }}>{next.title}</td>
                        }
                    </tr>
                </table>
                {/* <BoardList/> */}
            </div>
        </div>
    )
}
export default ViewPage;