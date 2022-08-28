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
                                <th>제목</th>
                            </tr>
                        </thead>
                        {
                            aiList[0] === undefined
                                ? <tbody><div>업데이트중입니다....</div></tbody>
                                : <tbody>
                                {
                                    aiList.slice(0,10).map((i) => {
                                        let goView = (e) => {
                                            window.open(i.link, '_blank').focus();
                                        }
                                        return (
                                            <>
                                                <tr onClick={goView}>
                                                    <td>{i.title.length > 20 ? `${i.title.substring(0, 20)}...` : i.title}</td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                                </tbody>
                        }
                    </table>
                </div>

                <div className="conbox CE">
                    <table className="crawling">
                        <thead className = "board_head">
                        <tr>
                            <th>제목</th>
                        </tr>
                        </thead>
                        {
                            ceList[0] === undefined
                                ? <tbody><div>업데이트중입니다....</div></tbody>
                                : <tbody>
                                {
                                    ceList.slice(0,10).map((i) => {
                                        let goView = (e) => {
                                            window.open(i.link, '_blank').focus();
                                        }
                                        return (
                                            <>
                                                <tr onClick={goView}>
                                                    <td>{i.title.length > 20 ? `${i.title.substring(0, 20)}...` : i.title}</td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                                </tbody>
                        }
                    </table>
                </div>

                <div className="conbox SE">
                    <table className="crawling">
                        <thead className = "board_head">
                        <tr>
                            <th>제목</th>
                        </tr>
                        </thead>
                        {
                            csList[0] === undefined
                                ? <tbody><div>업데이트중입니다....</div></tbody>
                                : <tbody>
                                {
                                    csList.slice(0,10).map((i) => {
                                        let goView = (e) => {
                                            window.open(i.link, '_blank').focus();
                                        }
                                        return (
                                            <>
                                                <tr onClick={goView}>
                                                    <td>{i.title.length > 20 ? `${i.title.substring(0, 20)}...` : i.title}</td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                                </tbody>
                        }
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Crawling;