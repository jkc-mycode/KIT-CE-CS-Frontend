import React, {useState, useEffect} from 'react';
import './pwcheck.css';
import axios from 'axios';
import {useParams} from "react-router-dom";

function Pwcheck(){
    const [object, setObject] = useState([]);
    let code = useParams().code;

    //임시비밀번호 받는 axios
    const tempPassword = async () => {
        const tempPw = await axios.get('/sign/password/' + code + window.location.search);
        setObject(tempPw.data);
    }
    useEffect(() => {
        tempPassword();
    }, [])

    return(
        <div className="box login_box">
            <h1 className="boxBigTitle">&#xE001;_ 임시 비밀번호</h1>
            {object.name}<p>님의 임시 비밀번호는</p> {object.newPassword} <p> 입니다.</p>
            <p>반드시 마이페이지에서 비밀번호 변경해 주세요!!</p>
        </div>
    )
}
export default Pwcheck;
