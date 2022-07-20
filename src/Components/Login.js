import React, {useState, useEffect} from 'react';
import './Login.css'
import {useNavigate, useHistory} from 'react-router-dom';
import axios from 'axios';

function LoginPage(){
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    let sessionStorage = window.sessionStorage;

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
            console.log('click login')
            console.log('ID : ', id)
            console.log('PW : ', password)

            axios.post('/log/in', data, headers)
                .then((res) => {
                    console.log(res.data)
                    sessionStorage.setItem("id", id);
                    sessionStorage.setItem("message", res.data.message);
                    if(res.data.message === "Invalid ID" || res.data.message === "Wrong ID or Password"){
                        alert(res.data.message);
                        navigate('/login');
                    }else{
                        navigate('/'); //임시로 메인으로 이돟
                        window.location.reload();
                    }
                })
                .catch((e) => {
                    alert((e))
                })
        }
    }
    const navigate = useNavigate();

    return (
        <div className="login_box">
            <h1 className="login_title">&#xE001;_ Login</h1>
            <form>
                <div className="input_row">
                    <input type="text" name="id" value={id || ''} placeholder="ID" className="id_input" onChange={onIdHandler} /><br/>
                </div>
                <div className="input_row">
                    <input type="password" name="password" value={password || ''} placeholder="Password" className="pw_input" onChange={onPasswordHandler} /><br/>
                </div>
                <div className="button_container">
                    <button className="signup_button" onClick={()=>navigate('/signup')}>Sign Up</button>
                    <button type="submit" className="login_button" onSubmit={onSubmit} >Login</button>
                    </div>
            </form>
        </div>
    )
}
export default LoginPage;