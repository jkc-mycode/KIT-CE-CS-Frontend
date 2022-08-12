import React, {Fragment, useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import BoardFooter from './boardlist_footer';
import axios from "axios";
import Pagination from "react-js-pagination";
// import Pagination from "./Pagination";
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
    const [num, setNum] = useState(0); //각 페이지 제일 윗번호
    let x = -1;

    const handlePageChange = (page) => {
        setPage(page);
    };
    const getList = async () => {
        console.log(location);
        const params = new URLSearchParams(location.search);
        const title = params.get("title");
        const content = params.get("content");
        let posts = null;

        if(title === null && content === null){
            posts = await axios.get("/article"+ location.pathname + "?pageNum=" + page)
        }else if(content === null){
            posts = await axios.get("/article"+ location.pathname + "?pageNum=" + page + "&title=" + title)
        }else{
            posts = await axios.get("/article"+ location.pathname + "?pageNum=" + page + "&content=" + content)
        }
        console.log(posts);
        const _list = posts.data.articles.slice(); //slice()는 배열의 복사복을 만듦
        setList(_list);
        setTotal(posts.data.totalArticle);
        setLimit(posts.data.postLimit);
        setNum(posts.data.totalArticle - (page * posts.data.postLimit)+posts.data.postLimit);
    }
    useEffect(() => {
        getList();
    }, [page, location.search])

    function timer(d){
        let timestamp = d;
        let date = new Date(timestamp);

        let year = date.getFullYear().toString(); //년도 뒤에 두자리
        let month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
        let day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)

        let returnDate = year + "." + month + "." + day;

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
                    )
                })
            }
            <br/>
            <BoardFooter/>
            <Pagination
                activePage={page} //현재 페이지
                itemsCountPerPage={limit} //한 페이지당 보여줄 리스트 아이템의 개수
                totalItemsCount={total} //총 아이템의 개수
                pageRangeDisplayed={10} //Paginator 내에서 보여줄 페이지의 범위(10개)
                prevPageText={"‹"} //"이전"을 나타낼 텍스트
                nextPageText={"›"} //"다음"을 나타낼 텍스트
                onChange={handlePageChange} //페이지가 바뀔 때 핸들링해줄 함수
                onClick={getList}
            />
            {/*<Pagination*/}
            {/*    className="pagination-bar"*/}
            {/*    currentPage={page}*/}
            {/*    totalCount={total}*/}
            {/*    pageSize={limit}*/}
            {/*    onPageChange={page => setPage(page)}*/}
            {/*/>*/}
        </>
    )
}

export default BoardRow;