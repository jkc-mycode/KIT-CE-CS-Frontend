import React, {Fragment, useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from "axios";
import './boardrow.css';

function BoardRow (){
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(2); //20개 고정
    const [total, setTotal] = useState(12); //전체 게시물 수
    const offset = (page-1) * limit;
    const navigate = useNavigate();
    const location = useLocation();
    let cat = ""; //카테고리

    const handlePageChange = (page) => {
        setPage(page);
    };
    const getList = async () => {
        //const posts = await axios.get("http://kittaxipool.iptime.org:3000/article/")
        const posts = await axios.get("/article" + location.pathname + "/?pageNum=" + page) //뒤에 pagenum붙여서 보내는 걸로
        console.log(posts);
        const copy = posts.data.articles.slice(); //slice()는 배열의 복사복을 만듦
        var _list = copy.reverse();
        setList(_list);
        setTotal(posts.data.totalArticle);
        setLimit(posts.data.postLimit);
    }
    useEffect(() => {
        getList();
    }, [page])

    function timer(d){
        let timestamp = d;
        let date = new Date(timestamp);

        let year = date.getFullYear().toString(); //년도 뒤에 두자리
        let month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
        let day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)

        let returnDate = month + "/" + day;

        return returnDate;
    }

    return(
        <>
            {
                // list.slice(offset,offset+limit).map((i) => {
                //     let goView = (e) => {
                //         navigate('view/'+i._id, {state : i});
                //     }
                //     if(i.tag === "notice"){
                //         cat = "[공지]";
                //     }else if(i.tag === "free"){
                //         cat = "[자유]";
                //     }else if(i.tag === "study"){
                //         cat = "[학업]";
                //     }else{
                //         cat = "[졸업]";
                //     }
                //     return (
                //         <tr onClick={goView}>
                //             <td>{total-(list.indexOf(i) * page)}</td>
                //             {
                //                 location.pathname === '/'
                //                     ? <td>{cat}</td>
                //                     : null
                //             }
                //             <td>
                //                 <div className="title_length">{i.title}</div>
                //             </td>
                //             <td>{i.authorName}</td>
                //             <td>{timer(i.date)}</td>
                //             <td>{i.views}</td>
                //         </tr>
                //     )
                <>
                <tr>
                    <td>1</td>
                    <td>공지</td>
                    <td>
                        <div className="title_length">제목123</div>
                    </td>
                    <td>작성자</td>
                    <td>08/12</td>
                    <td>33</td>
                </tr>
                <tr>
                <td>1</td>
                <td>공지</td>
                <td>
                    <div className="title_length">제목123</div>
                </td>
                <td>작성자</td>
                <td>08/12</td>
                <td>33</td>
                </tr>
                <tr>
                <td>1</td>
                <td>공지</td>
                <td>
                    <div className="title_length">제목123</div>
                </td>
                <td>작성자</td>
                <td>08/12</td>
                <td>33</td>
                </tr>
                <tr>
                <td>1</td>
                <td>공지</td>
                <td>
                    <div className="title_length">제목123</div>
                </td>
                <td>작성자</td>
                <td>08/12</td>
                <td>33</td>
                </tr>
                <tr>
                <td>1</td>
                <td>공지</td>
                <td>
                    <div className="title_length">제목123</div>
                </td>
                <td>작성자</td>
                <td>08/12</td>
                <td>33</td>
                </tr>
                </>
            }
        </>
    )
}

export default BoardRow;