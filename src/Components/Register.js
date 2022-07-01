import React, {useState} from 'react';

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
            <h2 className="register_title">회원가입</h2>
            <form>
                <input type="text" name="name" value={name} placeholder="이름" className="name_input" onChange={onNameHandler} /><br/>
                <input type="email" name="webmail" value={webmail} placeholder="웹메일 ex) WebMail@kumoh.ar.kr" className="webmail_input" onChange={onMailHandler} /><br/>
                <input type="text" name="id" value={id} placeholder="아이디" className="reg_id_input" onChange={onIdHandler} /><br/>
                <input type="password" name="password" value={password} placeholder="비밀번호" className="reg_pw_input" onChange={onPasswordHandler} /><br/>
                <input type="password" name="confirmPassword" value={confirmPassword} placeholder="비밀번호 확인" className="confirm_pw_input" onChange={onConfirmPasswordHandler} /><br/>
                <button type="submit" className="register_button" onSubmit={onSubmit} >회원가입</button>
            </form>
        </div>
    )
}
export default RegisterPage;