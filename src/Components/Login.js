import React, {useState} from 'react';
import './Login.css'
import { setCookie } from '../cookie';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function LoginPage(){
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onIdHandler = (event) => {
        setId(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onClickLogin = (event) => {
        event.preventDefault();
        let data = {
            id: `${id}`,
            password: `${password}`,
            verify: true
        }
        const headers = {
            "Content-Type": `application/json`,
        };
        if(id === "" && password === ""){
            alert("아이디와 비밀번호를 다시 입력해주세요.");
        }else{
            axios.post('/log/in', data, headers, {withCredentials : true})
                .then((res) => {
                    navigate('/'); //임시로 메인으로 이동
                    setCookie('kit_acs_class', res.data.class)
                })
                .catch((e) => {
                    if(e.response.data.message === "Wrong ID or Password"){
                        alert(e.response.data.message);
                    }else if(e.response.data.message === "Invalid ID"){
                        alert("회원정보가 존재하지 않거나 인증되지 않은 아이디입니다.");
                    }
                    if(e.response.data.message === "Try again"){
                        alert("다시 시도해 주세요.");
                    }
                })
        }
    }
    return (
        <div className="box login_box">
            <h1 className="boxBigTitle">&#xE001;_ Login</h1>
            <form>
                <div className="input_row">
                    <input type="text" name="id" value={id || ''} placeholder="ID" className="id_input" onChange={onIdHandler} /><br/>
                </div>
                <div className="input_row">
                    <input type="password" name="password" value={password || ''} placeholder="Password" className="pw_input" onChange={onPasswordHandler} /><br/>
                </div>
                <div className="button_container">
                    <button type="submit" className="mbutton login_button" onClick={onClickLogin} >로그인</button>
                    <button className="ebutton idsearch_button" onClick={()=>navigate('/idsearch')}>아이디 찾기/비밀번호 초기화</button>
                    <button className="ebutton signup_button" onClick={()=>navigate('/signup')}>회원가입</button>
                </div>
            </form>
        </div>
    )
}
export default LoginPage;