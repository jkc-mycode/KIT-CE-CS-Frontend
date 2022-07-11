import React, {useState, useEffect} from 'react';
import './Register.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function RegisterPage(){
    const [name, setName] = useState(""); //이름
    const [webmail, setWebmail] = useState(""); //웹메일
    const [id, setId] = useState(""); //아이디
    const [password, setPassword] = useState(""); //비밀번호
    const [confirmPassword, setConfirmPassword] = useState(""); //비밀번호 확인

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }
    const onMailHandler = (event) => {
        setWebmail(event.currentTarget.value);
    }
    const onIdHandler = (event) => {
        setId(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        let data = {
            name: `${name}`,
            webmail: `${webmail}`,
            id: `${id}`,
            password: `${password}`,
            confirmPassword: `${confirmPassword}`,
            verify: true
        };
        const headers = {
            "Content-Type": `application/json`,
        };
        axios.post('/sign/user', data, headers) //임의의 user 라우터 만들어서 사용함 => 경로 수정 필요
            .then((res) => {
                console.log(res.data)
            })
            .catch()
        navigate('/login');
    }

    return (
        <div className="register_box">
            <h2 className="register_title">&#xE001;_회원가입</h2>
            <form>
                <div className="input_row">
                    <input type="text" name="name" value={name} placeholder="이름" className="name_input" onChange={onNameHandler} /><br/>
                </div>
                <div className="input_row">
                    <input type="email" name="webmail" value={webmail} placeholder="웹메일 ex) WebMail@kumoh.ar.kr" className="webmail_input" onChange={onMailHandler} /><br/>
                </div>
                <div className="input_row">
                    <input type="text" name="id" value={id} placeholder="아이디" className="reg_id_input" onChange={onIdHandler} /><br/>
                </div>
                <div className="input_row">
                    <input type="password" name="password" value={password} placeholder="비밀번호" className="reg_pw_input" onChange={onPasswordHandler} /><br/>
                </div>
                <div className="input_row">
                    <input type="password" name="confirmPassword" value={confirmPassword} placeholder="비밀번호 확인" className="confirm_pw_input" onChange={onConfirmPasswordHandler} /><br/>
                </div>
                <button type="button" className="register_button" onClick={onSubmit} >회원가입</button>
            </form>
        </div>
    )
}
export default RegisterPage;
