import React, {useState, useEffect} from 'react';
import './pwcheck.css';
import axios from 'axios';
import {useLocation, useParams} from "react-router-dom";

function Pwcheck(){
    const param = new URLSearchParams(window.location.search);
    const {userName, setUserName} = useState("");
    const {newPassword, setNewPassword} = useState("");
    let code = useParams().code;

    //비밀번호 해시값 받고 보내는 axios
    let data = {
        hashValue: `${param.get("hashvalue")}`
    };
    const headers = {
        "Content-Type": `application/json`,
    };
    const pwHashCheck = async () => {
        const pwHash = await axios.post('/', data, headers)
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                console.log(e);
            })
    }

    //임시비밀번호 받는 axios
    const tempPassword = async () => {
        const tempPw = await axios.get('/sign/password/' + code + window.location.search);
        console.log(tempPw);
        setUserName(tempPw.name);
        setNewPassword(tempPw.newPassword);
    }
    useEffect(() => {
        console.log(code);
        tempPassword();
    }, [])

    return(
        <div className="box login_box">
            <h1 className="boxBigTitle">&#xE001;_ 임시 비밀번호</h1>
            <p>{userName}님의 임시 비밀번호는 {newPassword}입니다.</p>
            <p>반드시 마이페이지에서 비밀번호 변경해 주세요!!</p>
        </div>
    )
}
export default Pwcheck;

