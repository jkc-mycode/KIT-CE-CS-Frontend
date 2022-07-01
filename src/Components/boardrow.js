import React, {Fragment, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

function BoardRow ({boardList}){
    const list = boardList;
    const navigate = useNavigate();
    return(
        <Fragment>
            {
                list.map((i) => {

                    let goView = (e) => {
                        navigate('view/'+i.no, {state : e.target.value});
                    }
                    return (
                        <tr onClick={goView}>
                            <td>{i.no}</td>
                            <td>{i.title}</td>
                            <td>{i.author}</td>
                            <td>{i.date}</td>
                            <td>{i.increment}</td>
                        </tr>
                    )
                })
            }
        </Fragment>
    )
}

export default BoardRow;