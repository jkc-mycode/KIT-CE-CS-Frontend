import React, {useState, useEffect} from 'react';
import './menubar.css';
import Pagination from "react-js-pagination";
import {useNavigate, useLocation} from 'react-router-dom';
import axios from "axios";

function BoardFooter() {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(2); //20개 고정
    const [total, setTotal] = useState(12); //전체 게시물 수
    const location = useLocation();

    const navigate = useNavigate();
    const loginCheck = () => {
        if(window.sessionStorage.getItem("id") === null){
            alert("로그인 후 이용 가능합니다.");
        }else{
            navigate('/post_write');
        }
    }
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

    return (
        <div className = "boardlist_footer">
            <button type="button" className="post_write" onClick={loginCheck}>글쓰기</button>
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
        </div>
    )
}

export default BoardFooter;