import React, {useState} from "react";
import {Link, useLocation} from 'react-router-dom';
import { Icon } from "@material-ui/core";
import './header.css';
import axios from "axios";
import { getCookie, removeCookie } from '../cookie';
import Dropdown from "./post_dropdown";


const onClickLogout = async (event) => {
    await axios.delete('/log/out')
        .then((res) => {
            removeCookie("kit_acs", { domain: "localhost", path: "/" });
            removeCookie("kit_acs_class");
        })
        .catch((e) => {
            console.log(e);
        })
        .finally(() => {
            window.location.replace('/');
        })
}

function Header(){
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

    if(getCookie('kit_acs')){
        return(
            <div className = "header">
                <div className ="header_container">
                    <Link to="/" className="header_items">CE-SE</Link>
                    <div className="header_right_container">
                        <div className="header_items">
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
                                <div className="header_search">
                                    <form action={location.pathname}>
                                        <span className="search_row">
                                            <input type="text" placeholder="       입력해주세요." name={dropdownValue} onChange={onSearchHandler} className="search_input"/>
                                        </span>
                                        <button type="submit" className="search_button"><Icon fontSize='small'>search</Icon></button>
                                    </form>
                                </div>
                            </div>     
                        <div className="header_line"></div>
                        <Link to="" className="header_items" onClick={onClickLogout}>로그아웃</Link>
                        <div className="header_line"></div>
                        <Link to="/info" className="header_items">마이페이지</Link>
                    </div>
                </div>
            </div>
        );

    }else{
        return(
            <div className = "header">
                <div className ="header_container">
                    <Link to="/" className="header_items">CE-SE</Link>
                    <div className="header_right_container">
                        <div className="header_items">
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
                            <div className="header_search">
                                <form action={location.pathname}>
                                    <span className="search_row">
                                        <input type="text" placeholder="       입력해주세요." name={dropdownValue} onChange={onSearchHandler} className="search_input"/>
                                    </span>
                                    <button type="submit" className="search_button"><Icon fontSize='small'>search</Icon></button>
                                </form>
                            </div>
                        </div>   
                        <div className="header_line"></div>
                        <Link to="/login" className="header_items">로그인</Link>
                        <div className="header_line"></div>
                        <Link to="/signup" className="header_items">회원가입</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;