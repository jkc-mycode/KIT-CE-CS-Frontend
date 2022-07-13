import React, {useState} from 'react';
import './Register.css';

function RegisterPage(){
    const [name, setName] = useState(""); //이름
    const [webmail, setWebmail] = useState(""); //웹메일
    const [id, setId] = useState(""); //아이디
    const [password, setPassword] = useState(""); //비밀번호
    const [confirmPassword, setConfirmPassword] = useState(""); //비밀번호 확인
    const [idCheckMsg, setidCheckMsg] = useState(""); // 아이디 확인 메시지
    const [pwCheckMsg, setpwCheckMsg] = useState(""); // 비밀번호 확인 메시지
    const [pwMsgBool, setpwMsgBool] = useState(false);

    function checkPassword(target)
    {
        if (password !== target)
        {
            setpwMsgBool(false);
            setpwCheckMsg("비밀번호가 서로 일치하지 않습니다.");
        }
        else if (password === target)
        {
            setpwMsgBool(true);
            setpwCheckMsg("비밀번호가 일치합니다.");
        }
    }

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
        setPassword(event.currentTarget.value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        if(password !== confirmPassword){ //비밀번호 입력이 같은지 확인
            return alert("비밀번호가 서로 일치하지 않습니다.");
        }
    }

    return (
        <div className="register_box">
            <h1 className="register_title">&#xE001;_ Register</h1>
            <h3 className="message">회원가입을 위해 아래 정보를 입력해주세요</h3>
            <form>
                <div className="input_msg">이름</div>
                <div className="input_row">
                    <input type="text" name="name" value={name} placeholder="Name" className="name_input" onChange={onNameHandler} /><br/>
                </div>
                <div className="input_msg">아이디</div>
                <div className="input_row">
                    <input type="text" name="id" value={id} placeholder="ID" className="reg_id_input" onChange={onIdHandler} /><br/>
                </div>
                <div className="button_container">
                    <button className="idcheck_button">중복 체크</button>
                </div>
                <div className="check_msg">{idCheckMsg}</div>
                <div className="input_msg">비밀번호</div>
                <div className="input_row">
                    <input type="password" name="password" value={password} placeholder="Password" className="reg_pw_input" onChange={onPasswordHandler} /><br/>
                </div>
                <div className="input_row">
                    <input type="password" name="confirmPassword" value={confirmPassword} placeholder="Password Confirm" className="confirm_pw_input" onChange={onConfirmPasswordHandler} /><br/>
                </div>
                <div className={pwMsgBool ? 'success' : 'failure'}>{pwCheckMsg}</div>
                <div className="input_msg">금오공대 웹메일</div>
                <div className="email_input_row">
                    <input type="email" name="webmail" value={webmail} placeholder="WebMail" className="webmail_input" onChange={onMailHandler} />
                    <div className="email_msg">@kumoh.ac.kr</div>
                </div>
                <div className="button_container">
                    <button type="submit" className="register_button" onSubmit={onSubmit} >register</button>
                </div>
            </form>
        </div>
    )
}
export default RegisterPage;
