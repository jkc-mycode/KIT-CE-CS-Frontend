import React, {useState} from 'react';

function LoginPage(){
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const onIdHandler = (event) => {
        setId(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className="login_box">
            <h2 className="login_title">Login</h2>
            <form>
                <input type="text" name="id" value={id} placeholder="아이디" className="id_input" onChange={onIdHandler} /><br/>
                <input type="password" name="password" value={password} placeholder="비밀번호" className="pw_input" onChange={onPasswordHandler} /><br/>
                <button type="submit" className="login_button" onSubmit={onSubmit} >로그인</button>
            </form>
        </div>
    )
}
export default LoginPage;