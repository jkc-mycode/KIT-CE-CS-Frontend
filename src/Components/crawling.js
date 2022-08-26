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
    const [ceList, setCeList] = useState([]);
    const [csList, setCsList] = useState([]);
    const [aiList, setAiList] = useState([]);

    const getCrawler = async () => {
        const res = await axios.get('/crawler')
            .then((res) => {
                console.log(res.data);
                setCeList(res.data.ce);
                setCsList(res.data.cs);
                setAiList(res.data.ai);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getCrawler();
    }, [])

    return (
        <div className="box crawlingBox">
            <div className="boxTitle">&#xE001;_ 학과 공지사항</div>
            <div className="crawlingBox_tab">
                <input type="radio" name="tabmenu" id="tab_AI" defaultChecked/>
                <label for="tab_AI">AI</label>
                <input type="radio" name="tabmenu" id="tab_CE" />
                <label for="tab_CE">CE</label>
                <input type="radio" name="tabmenu" id="tab_SE" />
                <label for="tab_SE">SE</label>

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
                            aiList.slice(0,10).map((i) => {
                                let goView = (e) => {
                                    window.open(i.link, '_blank').focus();
                                }
                                return (
                                    <>
                                        <tr onClick={goView}>
                                            <td>[AI]</td>
                                            <td>{i.title.length > 20 ? `${i.title.substring(0, 20)}...` : i.title}</td>
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
                            ceList.slice(0,10).map((i) => {
                                let goView = (e) => {
                                    window.open(i.link, '_blank').focus();
                                }
                                return (
                                    <>
                                        <tr onClick={goView}>
                                            <td>[CE]</td>
                                            <td>{i.title.length > 20 ? `${i.title.substring(0, 20)}...` : i.title}</td>
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
                            csList.slice(0,10).map((i) => {
                                let goView = (e) => {
                                    window.open(i.link, '_blank').focus();
                                }
                                return (
                                    <>
                                        <tr onClick={goView}>
                                            <td>[SE]</td>
                                            <td>{i.title.length > 20 ? `${i.title.substring(0, 20)}...` : i.title}</td>
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