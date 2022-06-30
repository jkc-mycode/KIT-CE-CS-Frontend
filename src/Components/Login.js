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
            <h1 className="login_title">&#xE001;_Login</h1>
            <form>
                <div className="input_row">
                    <input type="text" name="id" value={id} placeholder="ID" className="id_input" onChange={onIdHandler} /><br/>
                </div>
                <div className="input_row">
                    <input type="password" name="password" value={password} placeholder="Password" className="pw_input" onChange={onPasswordHandler} /><br/>
                </div>
                <button className="signup_button">Sign Up</button>
                <button type="submit" className="login_button" onSubmit={onSubmit} >Login</button>
            </form>
        </div>
    )
}
export default LoginPage;