import React, {useState, useEffect} from "react";
import {Link, useLocation} from 'react-router-dom';
import './header.css';
import axios from "axios";
import { getCookie, removeCookie } from '../cookie';
import {useCookies} from "react-cookie";
import Dropdown from "./dropdown";




function Header(){
    const [dropdownVisibility, setDropdownVisibility] = useState(false);
    const [dropdownName, setDropdownName] = useState("제목");
    const [dropdownValue, setDropdownValue] = useState("title");
    const [placeHolder, setPlaceHolder] = useState("");
    const [logoutCheck, setLogoutCheck] = useState(true) //댓글 등록 버튼 체크
    const [cookies,  setCookie, removeCookies] = useCookies([]);

    const location = useLocation();

    const onDropdownHandler = (event) => {
        setDropdownName(event.currentTarget.name);
        setDropdownValue(event.currentTarget.value);
        setDropdownVisibility(false);
    }

    const onClickLogout = async (event) => {
        if(logoutCheck){
            setLogoutCheck(false);
            await axios.delete('/log/out')
                .then((res) => {
                    console.log(1);
                    removeCookies("kit_acs", { domain: "kitacs.com", path: "/" });
                    console.log(2);
                    removeCookies("kit_acs_class", { domain: "kitacs.com", path: "/" });
                    console.log(3);

                })
                .catch((e) => {
                    console.log(e);
                })
                .finally(() => {
                    // window.location.replace('/');
                })
        }else{
            alert("잠시만 기다려주세요!!");
        }
    }

    useEffect(() => {
        if(location.pathname === "/"){
            setPlaceHolder("전체 게시판에서 검색")
        }else if(location.pathname === "/free"){
            setPlaceHolder("자유 게시판에서 검색")
        }else if(location.pathname === "/notice"){
            setPlaceHolder("공지사항에서 검색")
        }else if(location.pathname === "/study"){
            setPlaceHolder("학업 게시판에서 검색")
        }else {
            setPlaceHolder("졸업생 게시판에서 검색")
        }
    }, [location.pathname])

    if(getCookie('kit_acs')){
        return(
            <div className = "header">
                <div className = "viewSection">
                    <div className="header_container">
                        <div className = "left_header">
                            <Link to="/" className="header_items"><img className='header_logo' src={process.env.PUBLIC_URL + "/img/acs_logo_edit_low.png"} alt='logo' /></Link>
                        </div>
                        <div className="right_header">
                            {
                                location.pathname === "/" || location.pathname === "/study" || location.pathname === "/free" ||location.pathname === "/notice" || location.pathname === "/graduate"
                                ? <>
                                    <div className="header_items">
                                        <div className="search_row">
                                            <div className="search_dropdown_box">
                                                <button className="dropdown" onClick={(e) => setDropdownVisibility(!dropdownVisibility)}>
                                                    {dropdownName} <span className="material-icons-outlined expand_more">expand_more</span>
                                                </button>
                                                <Dropdown visibility={dropdownVisibility}>
                                                    <div><button className="dtbutton search_dropdown_button" type="button" value="title" name="제목" onClick={onDropdownHandler}>제목</button></div>
                                                    <div><button className="dbbutton search_dropdown_button" type="button" value="content" name="내용" onClick={onDropdownHandler}>내용</button></div>
                                                </Dropdown>
                                            </div>
                                            <span className="header_search">
                                                <form action={location.pathname}>
                                                    <input type="text" placeholder={placeHolder} name={dropdownValue} className="search_input"/>
                                                    <button type="submit" className="search_button"><span className="material-icons-outlined">search</span></button>
                                                </form>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="header_line"></div>
                                </>
                                : <div className="header_items"></div>
                            }
                            <Link to="" className="header_items" onClick={onClickLogout}>로그아웃</Link>
                            <div className="header_line"></div>
                            <Link to="/info" className="header_items">마이페이지</Link>
                        </div>
                    </div>
                </div>
            </div>
        );

    }else{
        return(
            <div className = "header">
                <div className = "viewSection">
                    <div className="header_container">
                        <div className = "left_header">
                            <Link to="/" className="header_items"><img className='header_logo' src={process.env.PUBLIC_URL + "/img/acs_logo.png"} alt='logo' /></Link>
                        </div>
                        <div className="right_header">
                            {
                                location.pathname === "/" || location.pathname === "/study" || location.pathname === "/free" ||location.pathname === "/notice" || location.pathname === "/graduate"
                                    ? <>
                                        <div className="header_items">
                                            <div className="search_row">
                                                <div className="search_dropdown_box">
                                                    <button className="dropdown" onClick={(e) => setDropdownVisibility(!dropdownVisibility)}>
                                                        {dropdownName} <span className="material-icons-outlined expand_more">expand_more</span>
                                                    </button>
                                                    <Dropdown visibility={dropdownVisibility}>
                                                        <div><button className="dtbutton search_dropdown_button" type="button" value="title" name="제목" onClick={onDropdownHandler}>제목</button></div>
                                                        <div><button className="dbbutton search_dropdown_button" type="button" value="content" name="내용" onClick={onDropdownHandler}>내용</button></div>
                                                    </Dropdown>
                                                </div>
                                                <span className="header_search">
                                                    <form action={location.pathname}>
                                                        <input type="text" placeholder={placeHolder} name={dropdownValue} className="search_input"/>
                                                        <button type="submit" className="search_button"><span className="material-icons-outlined">search</span></button>
                                                    </form>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="header_line"></div>
                                    </>
                                    : <div className="header_items"></div>
                            }
                            <Link to="/login" className="header_items">로그인</Link>
                            <div className="header_line"></div>
                            <Link to="/signup" className="header_items">회원가입</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;