import React, { useEffect, useState } from "react";
import './crawling.css';
import axios from "axios";

const testlist = [{
        no: 1,
        tag: "CE",
        title : "test1"
    },
    {
        no: 2,
        tag: "SE",
        title : "test2",
    },
    {
        no: 3,
        tag: "AI",
        title : "test3",
    }
]

function Crawling() {
    const [list, setList] = useState([]);
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
            <div className="crawlingBoxMsg">&#xE001;_ 학과 공지사항</div>
            <table className="crawling">
                <thead className = "board_head">
                    <tr>
                        <th>구분</th>
                        <th>제목</th>
                    </tr>
                </thead>
                <tbody>
                {
                    testlist.map((i) => {
                        let goView = (e) => {
                            window.open("http://www.naver.com", '_blank').focus();
                        }
                        return (
                            <>
                            <tr onClick={goView}>
                                <td>{i.tag}</td>
                                <td>{i.title}</td>
                            </tr>
                            </>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

export default Crawling;