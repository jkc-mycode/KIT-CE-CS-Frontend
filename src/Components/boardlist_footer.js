import React, {useState, useEffect} from 'react';
import './menubar.css';
import { getCookie } from '../cookie';
import Pagination from "react-js-pagination";
import {useNavigate, useLocation} from 'react-router-dom';
import axios from "axios";

function BoardFooter() {
    const location = useLocation();
    const obj = new URLSearchParams(location.search);
    const [page, setPage] = useState(Number(obj.get("pageNum")) || 1);
    const [limit, setLimit] = useState(2); //20개 고정
    const [total, setTotal] = useState(12); //전체 게시물 수

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();
    const loginCheck = () => {
        if(!getCookie("kit_acs")){
            alert("로그인 후 이용 가능합니다.");
            navigate('/login')
        }else{
            navigate('/post_write');
        }
    }
    const handlePageChange = (page) => {
        let obj = new URLSearchParams(location.search);
        setPage(page);
        if(obj.get("title")){
            navigate(location.pathname + "?pageNum=" + page + "&title=" + obj.get("title"));
        }else if(obj.get("content")){
            navigate(location.pathname + "?pageNum=" + page + "&content=" + obj.get("content"));
        }else{
            navigate(location.pathname + "?pageNum=" + page);
        }
    };
    const getList = async () => {
        let url = "/article"+ location.pathname + "?pageNum=" + page
        if(!title && !content)
            url = "/article"+ location.pathname + "?pageNum=" + page
        else if (title)
            url = url + "&title="+title
        else if (content)
            url += "&content="+content
        const posts = await axios.get(url)
        setTotal(posts.data.totalArticle);
        setLimit(posts.data.postLimit);
    }
    useEffect(() => {
        const obj = new URLSearchParams(location.search)
        if(Number(obj.get("pageNum")) === 0){
            setPage(1);
        }else{
            setPage(Number(obj.get("pageNum")));
        }
        setTitle(obj.get("title"));
        setContent(obj.get("content"));
        getList();
    }, [page, location])

    return (
        <div className = "boardlist_footer">
            <button type="button" className="sbutton post_write" onClick={loginCheck}>글쓰기</button>
            {/*<Pagination*/}
            {/*    activePage={page} //현재 페이지*/}
            {/*    itemsCountPerPage={limit} //한 페이지당 보여줄 리스트 아이템의 개수*/}
            {/*    totalItemsCount={total} //총 아이템의 개수*/}
            {/*    pageRangeDisplayed={10} //Paginator 내에서 보여줄 페이지의 범위(10개)*/}
            {/*    prevPageText={"‹"} //"이전"을 나타낼 텍스트*/}
            {/*    nextPageText={"›"} //"다음"을 나타낼 텍스트*/}
            {/*    onChange={handlePageChange} //페이지가 바뀔 때 핸들링해줄 함수*/}
            {/*    onClick={getList}*/}
            {/*/>*/}
        </div>
    )
}

export default BoardFooter;