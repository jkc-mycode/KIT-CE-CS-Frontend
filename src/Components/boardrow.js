import React, {Fragment, useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import BoardFooter from './boardlist_footer';
import axios from "axios";
import Pagination from "react-js-pagination";
import './boardrow.css';

function BoardRow (){
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const [total, setTotal] = useState(12);
    const offset = (page-1) * limit;
    const navigate = useNavigate();
    const location = useLocation();
    let cat = ""; //카테고리
    //let num = boardList.articles.length; //게시물 길이(게시물 번호를 위한 것)

    const handlePageChange = (page) => {
        setPage(page);
    };
    const getList = async () => {
        //const posts = await axios.get("http://kittaxipool.iptime.org:3000/article/")
        const posts = await axios.get("/article" + location.pathname)
        console.log(posts);
        const copy = posts.data.articles.slice(); //slice()는 배열의 복사복을 만듦
        const _list = copy.reverse();
        setList(_list);
    }
    useEffect(() => {
        getList();
    }, [])

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
                list.slice(offset,offset+limit).map((i) => {
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
                    return (
                        <tr onClick={goView}>
                            <td>{list.length-list.indexOf(i)}</td>
                            {
                                location.pathname === '/'
                                    ? <td>{cat}</td>
                                    : null
                            }
                            <td>{i.title}</td>
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
                totalItemsCount={list.length} //총 아이템의 개수
                pageRangeDisplayed={5} //Paginator 내에서 보여줄 페이지의 범위
                prevPageText={"‹"} //"이전"을 나타낼 텍스트
                nextPageText={"›"} //"다음"을 나타낼 텍스트
                onChange={handlePageChange} //페이지가 바뀔 때 핸들링해줄 함수
            />
        </>
    )
}

export default BoardRow;