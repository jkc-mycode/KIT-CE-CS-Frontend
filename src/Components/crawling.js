import React, { useEffect, useState } from "react";
import './crawling.css';
import axios from "axios";


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

    const [activeIndex, setActiveIndex]=useState(1);

    const tabClickHandler=(index)=>{
        setActiveIndex(index);
    };

    const tabContArr=[
        {
            tabTitle:(
                <li className={activeIndex===0 ? "mbutton crawlingTabButton" : "sbutton crawlingTabButton"} onClick={()=>tabClickHandler(0)}> AI </li>
            ),
            tabCont:(
                <table className="crawling">
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
            )
        },
        {
            tabTitle:(
                <li className={activeIndex===1 ? "mbutton crawlingTabButton" : "sbutton crawlingTabButton"} onClick={()=>tabClickHandler(1)}> CE </li>
            ),
            tabCont:(
                <table className="crawling">
                    {/* <thead className = "board_head">
                    <tr>
                        <th>제목</th>
                    </tr>
                    </thead> */}
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
            )
        },
        {
            tabTitle:(
                <li className={activeIndex===2 ? "mbutton crawlingTabButton" : "sbutton crawlingTabButton"} onClick={()=>tabClickHandler(2)}> SE </li>
            ),
            tabCont:(
                <table className="crawling">
                    {/* <thead className = "board_head">
                    <tr>
                        <th>제목</th>
                    </tr>
                    </thead> */}
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
            )
        }
    ];

    return (
        <div className="box crawlingBox">
            <div className="boxTitle">&#xE001;_ 학과 공지사항</div>
            <ul className="crawlingTab">
                {tabContArr.map((section, index)=>{
                    return section.tabTitle
                })}
            </ul>
            <div>
                {tabContArr[activeIndex].tabCont}
            </div>
        </div>
    );
}

export default Crawling;