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
    const [idCheckMsg, setidCheckMsg] = useState(""); // 아이디 확인 메시지
    const [pwCheckMsg, setpwCheckMsg] = useState(""); // 비밀번호 확인 메시지
    const [pwMsgBool, setpwMsgBool] = useState(false);
    const [dupIdMsg, setDupIdMsg] = useState("");
    const [dupIdFlag, setDupIdFlag] = useState(false);

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
        checkPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
        checkPassword(event.currentTarget.value);
    }
    const navigate = useNavigate();

    function vailidationCheck(str){
        //공백만 입력된 경우
        const blank_pattern1 = /^\s+|\s+$/g;
        if(str.replace(blank_pattern1, '' ) == "" ){
            alert('공백만 입력되었습니다.');
        }
        //문자열에 공백이 있는 경우
        const blank_pattern2 = /[\s]/g;
        if( blank_pattern2.test(str) == true){
            alert('공백이 입력되었습니다.');
        }
        //특수문자가 있는 경우
        const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
        if(special_pattern.test(str) == true){
            alert('특수문자가 입력되었습니다.');
        }
        //공백 혹은 특수문자가 있는 경우
        if(str.search(/\W|\s/g) > -1){
            alert( '특수문자 또는 공백이 입력되었습니다.');
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(!dupIdFlag){
            alert("ID 중복체크해주세요.");
        }else{
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
            axios.post('/sign/up', data, headers) //임의의 user 라우터 만들어서 사용함 => 경로 수정 필요
                .then((res) => {
                    console.log(res.data)
                })
                .catch()
            //navigate('/login');
        }
    }

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

    const dupIdCheck = (event) => {
        event.preventDefault();
        let data = {
            id: `${id}`
        };
        const headers = {
            "Content-Type": `application/json`,
        };
        axios.post('/sign/dupId', data, headers, {withCredentials : true})
            .then((res) => {
                console.log(res);
                if(res.data.message === 'OK'){
                    setDupIdFlag(true);
                    // setDupIdMsg("사용 가능한 ID입니다.")
                    alert("사용 가능한 ID입니다.");
                }else{
                    alert(res.data.message);
                }
            })
            .catch((e) => {
                console.log(e.response);
                if(e.response.data.message === "Duplicated Id"){
                    alert("중복된 ID입니다.");
                }else if(e.response.data.message === "No User"){
                    alert("ID를 입력해주세요.");
                }
            })
    }

    return (
        <div className="register_box">
            <h1 className="register_title">&#xE001;_ Register</h1>
            <h3 className="message">회원가입을 위해 아래 정보를 입력해주세요.</h3>
            <form>
                <div className="input_msg">이름</div>
                <div className="input_row">
                    <input type="text" name="name" value={name} placeholder="Name" className="name_input" onChange={onNameHandler} /><br/>
                </div>
                <div className="input_msg">아이디</div>
                <div className="input_row">
                    <input type="text" name="id" value={id} placeholder="ID" className="reg_id_input" onChange={onIdHandler} /><br/>
                </div>
                <div className="check_msg">{idCheckMsg}</div>
                <div className="button_container">
                    <button type="button" className="idcheck_button" onClick={dupIdCheck}>중복 체크</button>
                </div>
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
                    <input type="text" name="webmail" value={webmail} placeholder="WebMail" className="webmail_input" onChange={onMailHandler} />
                    <div className="email_msg">@kumoh.ac.kr</div>
                </div>
                <div className="button_container">
                    <button type="button" className="register_button" onClick={onSubmit} >register</button>
                </div>
            </form>
        </div>
    )
}
export default RegisterPage;
