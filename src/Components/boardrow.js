import React, {Fragment, useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import BoardFooter from './boardlist_footer';

function BoardRow ({boardList}){
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [total, setTotal] = useState(12);
    const offset = (page-1) * limit;
    const copy = boardList.slice(); //slice()는 배열의 복사복을 만듦
    const list = copy.reverse();
    const navigate = useNavigate();
    const location = useLocation();
    let cat = ""; //카테고리
    //let num = boardList.board.length; //게시물 길이(게시물 번호를 위한 것)

    // useEffect(() => {
    //     setList(boardList.board);
    //     setLimit(boardList.postLimit);
    //     setPage(boardList.pageNum);
    // })

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
                            <td>{i.author}</td>
                            <td>{timer(i.date)}</td>
                            <td>{i.views}</td>
                        </tr>
                    )
                })
            }
            <br/>
            <BoardFooter
                total={total}
                limit={limit}
                page={page}
                setPage={setPage}
            />
            {/*<BoardFooter/>*/}
        </>
    )
}

export default BoardRow;