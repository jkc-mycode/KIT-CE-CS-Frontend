import React, { useEffect, useState } from "react";
import './crawling.css';
import axios from "axios";
import {useNavigate} from 'react-router-dom';


const testlist = [{
        no: 1,
        title : "test1",
        views : 123,
        commentListlength : 12
    },
    {
        no: 2,
        title : "test2",
        views : 111,
        commentListlength : 1
    },
    {
        no: 3,
        title : "test3",
        views : 222,
        commentListlength : 33
    }
]

function Crawling() {
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("/")
            .then((res) => {
                setList(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <div className="crawlingBox">
            <div className="crawlingBoxMsg">#학과 공지사항</div>
            <table className="crawling">
                {
                    testlist.map((i) => {
                        let goView = (e) => {
                            navigate('view/'+i.no, {state : e.target.value});
                        }
                        return (
                            <>
                            <tr onClick={goView}>
                                <td>{i.title}</td>
                                <td>{i.views}</td>
                                <td>{i.commentListlength}</td>
                            </tr>
                            {/*<span onClick={goView}>{i.title} </span>*/}
                            </>
                        )
                    })
                }
            </table>
        </div>
    );
}

export default Crawling;