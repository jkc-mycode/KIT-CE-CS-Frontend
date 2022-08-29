import React, {Fragment, useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from "axios";
import Pagination from "react-js-pagination";
import './boardrow.css';

function BoardRow (){
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(2); //20개 고정
    const [total, setTotal] = useState(12); //전체 게시물 수
    const navigate = useNavigate();
    const location = useLocation();
    let cat = ""; //카테고리
    const [num, setNum] = useState(0); //각 페이지 제일 윗번호
    let x = -1;
    // const [title, setTitle] = useState("");
    // const [content, setContent] = useState("");

    const handlePageChange = (page) => {
        setPage(page);
    };
    const getList = async () => {
        // let url = "/article"+ location.pathname + "?pageNum=" + page
        // if(!title && !content)
        //     url = "/article"+ location.pathname + "?pageNum=" + page
        // else if (title)
        //     url = url + "&title="+title
        // else if (content)
        //     url += "&content="+content
        // console.log(url);
        // const posts = await axios.get(url)
        // console.log(posts);
        const obj = new URLSearchParams(location.search)
        let posts = null;
        if(!obj.get("title") && !obj.get("content")){
            posts = await axios.get("/article" + location.pathname + "/?page=" + page) //뒤에 pagenum붙여서 보내는 걸로
        }else if(obj.get("title")){
            posts = await axios.get("/article" + location.pathname + "/?page=" + page + "&title=" + obj.get("title"))
        }else{
            posts = await axios.get("/article" + location.pathname + "/?page=" + page + "&content=" + obj.get("content"))
        }
        console.log(posts);
        const _list = posts.data.articles.slice(); //slice()는 배열의 복사복을 만듦
        setList(_list);
        setTotal(posts.data.totalArticle);
        setLimit(posts.data.postLimit);
        setNum(posts.data.totalArticle - (page * posts.data.postLimit)+posts.data.postLimit);
    }
    useEffect(() => {
        // const obj = new URLSearchParams(location.search)
        // if(Number(obj.get("pageNum")) === 0){
        //     setPage(1);
        // }else{
        //     setPage(Number(obj.get("pageNum")));
        // }
        // setTitle(obj.get("title"));
        // setContent(obj.get("content"));
        getList();
    }, [page, location])

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
                list.slice(0).map((i) => {
                    x = x + 1;
                    let goView = (e) => {
                        navigate('view/'+i._id, {state : i});
                    }
                    if(i.tag === "notice"){
                        cat = "[공지]";
                    }else if(i.tag === "free"){
                        cat = "[자유]";
                    }else if(i.tag === "study"){
                        cat = "[학업]";
                    }else{
                        cat = "[졸업]";
                    }
                    return ( //각 페이지에서 시작하는 번호가 필요할듯
                        <table className='boardrow'>
                            <tr onClick={goView}>
                                <td>{num-x}</td>
                                {
                                    location.pathname === '/'
                                        ? <td>{cat}</td>
                                        : null
                                }
                                <td>
                                    <div className="title_length">{i.title}</div>
                                </td>
                                <td>{i.authorName}</td>
                                <td>{timer(i.date)}</td>
                                <td>{i.views}</td>
                            </tr>
                        </table>
                    )
                })
            }
            <Pagination
                activePage={page} //현재 페이지
                itemsCountPerPage={limit} //한 페이지당 보여줄 리스트 아이템의 개수
                totalItemsCount={total} //총 아이템의 개수
                pageRangeDisplayed={4} //Paginator 내에서 보여줄 페이지의 범위(10개)
                prevPageText={"‹"} //"이전"을 나타낼 텍스트
                nextPageText={"›"} //"다음"을 나타낼 텍스트
                onChange={handlePageChange} //페이지가 바뀔 때 핸들링해줄 함수
                onClick={getList}
            />
        </>
    )
}

export default BoardRow;