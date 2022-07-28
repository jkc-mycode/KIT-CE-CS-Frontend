import React, {Fragment} from 'react';
import {useNavigate} from 'react-router-dom';
import BoardFooter from './boardlist_footer';

function BoardRow ({boardList}){
    const list = boardList;
    const navigate = useNavigate();
    let num = list.length;
    let cat = "";

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
        <Fragment>
            {
                list.slice(0).reverse().map((i) => {
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
                            <td>{num--}</td>
                            <td>{cat}</td>
                            <td>{i.title}</td>
                            <td>{i.author}</td>
                            <td>{timer(i.date)}</td>
                            <td>{i.views}</td>
                        </tr>
                    )
                })
            }
            <br/>
            <BoardFooter></BoardFooter>
        </Fragment>
    )
}

export default BoardRow;