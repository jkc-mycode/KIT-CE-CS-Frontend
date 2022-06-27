import React, {useState} from 'react';

function LoginPage(){
    const [ID, setID] = useState("");
    const [PW, setPW] = useState("");

    return (
        <div className="login_box">
            <h2 className="login_title">Login</h2>
            <form>
                <input type="text" name="ID" value={ID} placeholder="아이디" className="id_input"/><br/>
                <input type="password" name="PW" value={PW} placeholder="비밀번호" className="pw_input"/><br/>
                <button type="submit" className="login_button">로그인</button>
            </form>
        </div>
    )
}

export default LoginPage;