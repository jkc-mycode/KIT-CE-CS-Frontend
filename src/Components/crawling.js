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
            <div className="crawlingBox_tab">
                <input type="radio" name="tabmenu" id="tab_all" checked />
                <label for="tab_all">전체</label>
                <input type="radio" name="tabmenu" id="tab_AI" />
                <label for="tab_AI">AI</label>
                <input type="radio" name="tabmenu" id="tab_CE" />
                <label for="tab_CE">CE</label>
                <input type="radio" name="tabmenu" id="tab_SE" />
                <label for="tab_SE">SE</label>

                <div className="conbox all">
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

                <div className="conbox AI">
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

                <div className="conbox CE">
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

                <div className="conbox SE">
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
            </div>
        </div>
    );
}

export default Crawling;