import React, {useState} from "react";
import './header.css';
import {Link} from 'react-router-dom';
import axios from "axios";

const onClickLogout = (event) => {
    axios.delete('/log/out')
        .then((res) => {
            console.log(res);
            window.sessionStorage.clear();
            window.location.replace('/');
        })
        .catch((e) => {
            console.log(e);
        })
}

function Header(){
    const [search, setSearch] = useState("");
    const onSearchHandler = async (e) => {
        e.preventDefault();
        const temp = await e.currentTarget.value;
        setSearch(temp);
        console.log(temp);
    }
    const onSearch = (e) => {
        e.preventDefault();
        // const res = await axios.get("/article/search")
        console.log(search);
        console.log(window.location);
    }

    let sessionStorage = window.sessionStorage;
    let user_id = sessionStorage.getItem("id");
    // return(
    //     <div className = "header">
    //         <div className ="header_container">
    //             <Link to="/" className="header_items">CE-SE</Link>
    //             <div className="header-right-container">
    //                 <Link to="/login" className="header_items">로그인</Link>
    //                 <div className="header_line"></div>
    //                 <Link to="/signup" className="header_items">회원가입</Link>
    //             </div>
    //             <div className="header_search_container">
    //                 <input type="text" placeholder="검색어를 입력해주세요." onChange={onSearchHandler}/>
    //                 <input type="submit" value="검색" />
    //                 <button type="button">검색1</button>
    //                 <Link to="/search" state={{user: search}}>asd</Link>
    //             </div>
    //         </div>
    //     </div>
    // );
    // return(
    //     <div className = "header">
    //         <div className ="header_container">
    //             <Link to="/" className="header_items">CE-SE</Link>
    //             <div className="header-right-container">
    //                 <Link to="/login" className="header_items">로그인</Link>
    //                 <div className="header_line"></div>
    //                 <Link to="/signup" className="header_items">회원가입</Link>
    //             </div>
    //             <div className="header_search_container">
    //                 <form onSubmit={onSearch}>
    //                     <input type="text" placeholder="검색어를 입력해주세요."/>
    //                     <input type="submit" value="검색" />
    //                 </form>
    //             </div>
    //         </div>
    //     </div>
    // );
    if(user_id !== null){
        return(
            <div className = "header">
                <div className ="header_container">
                    <Link to="/" className="header_items">CE-SE</Link>
                    <div className="header-right-container">
                        <Link to="/" className="header_items" onClick={onClickLogout}>로그아웃</Link>
                        <div className="header_line"></div>
                        <Link to="/info" className="header_items">마이페이지</Link>
                    </div>
                    <div className="header_search_container">
                        <form action="/search" method="get">
                            <input type="text"  placeholder="검색어를 입력해주세요." />
                            <button type="button" onClick={onSearch}>검색</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }else{
        return(
            <div className = "header">
                <div className ="header_container">
                    <Link to="/" className="header_items">CE-SE</Link>
                    <div className="header-right-container">
                        <Link to="/login" className="header_items">로그인</Link>
                        <div className="header_line"></div>
                        <Link to="/signup" className="header_items">회원가입</Link>
                    </div>
                    <div className="header_search_container">
                        <form action="/search" method="get">
                            <input type="text" placeholder="검색어를 입력해주세요." name="content"/>
                            <input type="submit" value="검색" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;