import React, {Fragment} from 'react';
import {useNavigate} from 'react-router-dom';
import BoardFooter from './boardlist_footer';

function BoardRow ({boardList}){
    const list = boardList;
    const navigate = useNavigate();

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

    return(
        <Fragment>
            {
                list.map((i) => {
                    let goView = (e) => {
                        navigate('view/'+i._id, {state : i});
                    }
                    return (
                        <tr onClick={goView}>
                            <td>{i.no}</td>
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