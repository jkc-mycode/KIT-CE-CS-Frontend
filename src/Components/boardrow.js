import React, {Fragment, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

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
                            {/*<td onClick={() => selectContent(i._id)}>*/}
                            {/*    <Link to={'view/' + i._id} state={{ data: i}}>{i.no}</Link>*/}
                            {/*</td>*/}
                            {/*<td onClick={() => selectContent(i._id)}>*/}
                            {/*    <Link to={'view/' + i._id} state={{ data: i}}>{i.title}</Link>*/}
                            {/*</td>*/}
                            <td>{i.no}</td>
                            <td>{i.title}</td>
                            <td>{i.author}</td>
                            <td>{timer(i.date)}</td>
                            <td>{i.views}</td>
                        </tr>
                    )
                })
            }
        </Fragment>
    )
}

export default BoardRow;