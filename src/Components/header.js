import React, {useState} from "react";
import './header.css';
import {Link, useLocation} from 'react-router-dom';
import axios from "axios";
import { getCookie, removeCookie } from '../cookie';
import Dropdown from "./post_dropdown";

const onClickLogout = (event) => {
    axios.delete('http://localhost:3001/log/out')
        .then((res) => {
            removeCookie("kit_acs");
        })
        .catch((e) => {
            console.log(e);
        })
        .finally(() => {
            window.location.replace('/');
        })
}

function Header(props){
    const [search, setSearch] = useState("");

    const [dropdownVisibility, setDropdownVisibility] = useState(false);
    const [dropdownName, setDropdownName] = useState("제목");
    const [dropdownValue, setDropdownValue] = useState("title");

    const location = useLocation();

    const onDropdownHandler = (event) => {
        console.log(event.currentTarget.value);
        setDropdownName(event.currentTarget.name);
        setDropdownValue(event.currentTarget.value);
        setDropdownVisibility(false);
    }
    const onSearchHandler = async (e) => {
        e.preventDefault();
        const temp = await e.currentTarget.value;
        setSearch(temp);
        console.log(temp);
    }

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
    if(getCookie('kit_acs')){
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
                        <div className="post_dropdown_box">
                            <button onClick={(e) => setDropdownVisibility(!dropdownVisibility)}>
                                {
                                    dropdownVisibility
                                        ? `${dropdownName}`
                                        : `${dropdownName}`
                                }
                            </button>
                            <Dropdown visibility={dropdownVisibility}>
                                <ul>
                                    <li><button type="button" value="title" name="제목" onClick={onDropdownHandler}>제목</button></li>
                                    <li><button type="button" value="content" name="내용" onClick={onDropdownHandler}>내용</button></li>
                                </ul>
                            </Dropdown>
                        </div>
                        <form action={location.pathname}>
                            <input type="text" placeholder="검색어를 입력해주세요." name={dropdownValue} onChange={onSearchHandler}/>
                            <button type="submit">검색</button>
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
                        <div className="post_dropdown_box">
                            <button onClick={(e) => setDropdownVisibility(!dropdownVisibility)}>
                                {
                                    dropdownVisibility
                                        ? `${dropdownName}`
                                        : `${dropdownName}`
                                }
                            </button>
                            <Dropdown visibility={dropdownVisibility}>
                                <ul>
                                    <li><button type="button" value="title" name="제목" onClick={onDropdownHandler}>제목</button></li>
                                    <li><button type="button" value="content" name="내용" onClick={onDropdownHandler}>내용</button></li>
                                </ul>
                            </Dropdown>
                        </div>
                        <form action={location.pathname}>
                            <input type="text" placeholder="검색어를 입력해주세요." name={dropdownValue} onChange={onSearchHandler}/>
                            <button type="submit">검색</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;