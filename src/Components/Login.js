import React, {useState} from 'react';
import './Login.css'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function LoginPage(){
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    let sessionStorage = window.sessionStorage;
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
            console.log('click login')
            console.log('ID : ', id)
            console.log('PW : ', password)

            // axios.post('http://kittaxipool.iptime.org:3000/log/in', data, headers, {withCredentials : true})
            axios.post('/log/in', data, headers, {withCredentials : true})
                .then((res) => {
                    if(res.data.message === "Invalid ID" || res.data.message === "Wrong ID or Password"){
                        alert(res.data.message);
                        navigate('/login');
                    }else{
                        navigate('/'); //임시로 메인으로 이돟
                        window.location.reload();
                        // console.log(res);
                    }
                })
                .catch((e) => {
                    if(e.response.data.message === "Try again"){
                        onClickLogin();
                    }
                })
        }
    }
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
                    <button type="submit" className="login_button" onClick={onClickLogin} >Login</button>
                    <button className="signup_button" onClick={()=>navigate('/signup')}>Sign Up</button>

                </div>
            </form>
        </div>
    )
}
export default LoginPage;