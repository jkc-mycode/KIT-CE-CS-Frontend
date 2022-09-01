import React, {useState, useCallback, useEffect} from 'react';
import './Register.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function RegisterPage(){
    const [name, setName] = useState(""); //이름
    const [webmail, setWebmail] = useState(""); //웹메일
    const [id, setId] = useState(""); //아이디
    const [password, setPassword] = useState(""); //비밀번호
    const [confirmPassword, setConfirmPassword] = useState(""); //비밀번호 확인
    const navigate = useNavigate();

    //오류메시지 상태 저장
    const [nameMessage, setNameMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [idMessage, setIdMessage] = useState("");
    const [pwCheckMsg, setpwCheckMsg] = useState(""); // 비밀번호 확인 메시지

    //유효성 검사
    const [isName, setIsName] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isId, setIsId] = useState(false);
    const [isPassword, setIsPassword] = useState(false); // 비밀번호 확인 검사

    //중복체크 여부 검사
    const [dupIdFlag, setDupIdFlag] = useState(false);
    const [dupIdMsg, setDupIdMsg] = useState("");
    const [dupEmailFlag, setDupEmailFlag] = useState(false);
    const [dupEmailMsg, setDupEmailMsg] = useState("");
    const [dupIdButtonCheck, setDupIdButtonCheck] = useState(false); //ID 중복체크 버튼 확인용
    const [dupEmailButtonCheck, setDupEmailButtonCheck] = useState(false); //Email 중복체크 버튼 확인용

    const onNameHandler = useCallback((e) => {
        const nameRegExp = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,5}$/;
        setName(e.currentTarget.value);
        if (!nameRegExp.test(e.currentTarget.value)) {
            setNameMessage('2자 이상 5자 이하의 한글을 입력해주세요!');
            setIsName(false);
        } else {
            setNameMessage('올바른 이름 형식입니다 :)');
            setIsName(true);
        }
    }, [])
    const onMailHandler = useCallback((e) => {
        const webmailRegExp = /^[a-z0-9]{3,10}$/;
        setWebmail(e.currentTarget.value);
        if (!webmailRegExp.test(e.currentTarget.value)) {
            setEmailMessage('3자 이상 10자 이하의 영문, 숫자를 입력해주세요!');
            setIsEmail(false);
        } else {
            setEmailMessage('올바른 Email 형식입니다 :)');
            setIsEmail(true);
        }
    }, [])
    const onIdHandler = useCallback((e) => {
        const idRegExp = /^[a-z0-9]{5,10}$/;
        setId(e.currentTarget.value);
        if (!idRegExp.test(e.currentTarget.value)) {
            setIdMessage('5자 이상 10자 이하의 영문, 숫자를 입력해주세요!');
            setIsId(false);
        } else {
            setIdMessage('올바른 ID 형식입니다 :)');
            setIsId(true);
        }
    }, [])
    const onPasswordHandler = useCallback((e) => {
        const passwordRegExp = /^(?=.*[a-zA-Z!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        let space = /\s/g;
        setPassword(e.currentTarget.value);
        if(space.test(e.currentTarget.value)) {
            setpwCheckMsg('공백은 사용불가입니다!');
            setIsPassword(false);
        } else if (!passwordRegExp.test(e.currentTarget.value)) {
            setpwCheckMsg('숫자+영문자(+특수문자) 조합으로 8자리 이상 입력해주세요!');
            setIsPassword(false);
        } else {
            setpwCheckMsg('안전한 비밀번호에요 :)');
            setIsPassword(true);
        }
    }, [])
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
        checkPassword(event.currentTarget.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(!isName){
            return alert("이름을 다시 확인해주세요!");
        }else if(!isId){
            return alert("아이디를 다시 확인해주세요!");
        }else if(!dupIdFlag){
            return alert("아이디 중복체크해주세요!");
        }else if(!isPassword){
            return alert("비밀번호를 다시 확인해주세요!");
        }else if(!isEmail){
            return alert("웹메일을 다시 확인해주세요!");
        }else if(!dupEmailFlag){
            return alert("웹메일 중복체크해주세요!");
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
            axios.post('/sign/up', data, headers)
                .then((res) => {
                    console.log(res.data);
                    alert("가입완료!!");
                    alert("*****웹메일에서 인증 진행후 로그인 가능합니다.***** \n(인증메일이 도착하지 않을 시 대표메일로 문의바랍니다)");
                })
                .catch((e) => {
                    console.log(e);
                })
            navigate('/login');
        }
    }

    function checkPassword(target)
    {
        if (password !== target)
        {
            setIsPassword(false);
            setpwCheckMsg("비밀번호가 서로 일치하지 않습니다.");
        }
        else if (password === target)
        {
            setIsPassword(true);
            setpwCheckMsg("비밀번호가 일치합니다.");
        }
    }

    const dupIdCheck = async (event) => {
        event.preventDefault();
        setDupIdButtonCheck(true);
        if(!isId){
            return setDupIdMsg("아이디를 다시 확인해주세요!");
        }else{
            await axios.get('/sign/dupId/?id=' + id)
                .then((res) => {
                    console.log(res);
                    setDupIdFlag(true);
                    setDupIdMsg("사용 가능한 ID입니다.");
                })
                .catch((e) => {
                    console.log(e);
                    if(e.response.data.message === "Duplicated Id"){
                        setDupIdMsg("중복된 ID입니다.");
                    }else if(e.response.data.message === "No User"){
                        setDupIdMsg("ID를 입력해주세요.");
                    }
                })
        }
    }

    const dupEmailCheck = (event) => {
        event.preventDefault();
        setDupEmailButtonCheck(true);
        if(!isEmail){
            return setDupEmailMsg("이메일을 다시 확인해주세요!");
        }else{
            axios.get('/sign/dupWebmail?webmail=' + webmail)
                .then((res) => {
                    setDupEmailFlag(true);
                    setDupEmailMsg("사용 가능한 Email입니다.");
                })
                .catch((e) => {
                    console.log(e.response.data.message);
                    if(e.response.data.message === "Duplicated Webmail"){
                        setDupEmailMsg("중복된 Email입니다.");
                    }else if(e.response.data.message === "No User"){
                        setDupEmailMsg("Email을 입력해주세요.");
                    }
                })
        }
    }

    return (
        <div className="box register_box">
            <h1 className="boxBigTitle">&#xE001;_ Register</h1>
            <h3 className="message">회원가입을 위해 아래 정보를 입력해주세요.</h3>
            <form>
                <div className="input_msg">이름</div>
                <div className="input_row">
                    <input type="text" name="name" value={name} placeholder="Name" className="name_input" onChange={onNameHandler} /><br/>
                </div>
                <div className={isName ? 'success' : 'failure'}>{nameMessage}</div>
                <div className="input_msg">아이디</div>
                <div className="input_row">
                    <input type="text" name="id" value={id} placeholder="ID" className="reg_id_input" onChange={onIdHandler} /><br/>
                </div>
                {
                    dupIdButtonCheck === false
                        ? <div className={isId ? 'success' : 'failure'}>{idMessage}</div>
                        : <div className={dupIdFlag ? 'success' : 'failure'}>{dupIdMsg}</div>
                }
                <div className="button_container">
                    <button type="button" className="ebutton idcheck_button" onClick={dupIdCheck}>중복 체크</button>
                </div>
                <div className="input_msg">비밀번호</div>
                <div className="input_row">
                    <input type="password" name="password" value={password} placeholder="Password" className="reg_pw_input" onChange={onPasswordHandler} /><br/>
                </div>
                <div className="input_row">
                    <input type="password" name="confirmPassword" value={confirmPassword} placeholder="Password Confirm" className="confirm_pw_input" onChange={onConfirmPasswordHandler} /><br/>
                </div>
                <div className={isPassword ? 'success' : 'failure'}>{pwCheckMsg}</div>
                <div className="input_msg">금오공대 웹메일</div>
                <div className="email_input_row">
                    <input type="text" name="webmail" value={webmail} placeholder="WebMail" className="webmail_input" onChange={onMailHandler} />
                    <div className="email_msg">@kumoh.ac.kr</div>
                </div>
                {
                    dupEmailButtonCheck === false
                        ? <div className={isEmail ? 'success' : 'failure'}>{emailMessage}</div>
                        : <div className={dupEmailFlag ? 'success' : 'failure'}>{dupEmailMsg}</div>
                }
                <div className="button_container">
                    <button type="button" className="ebutton emailcheck_button" onClick={dupEmailCheck}>중복 체크</button>
                </div>
                <div className="button_container">
                    <button type="button" className="mbutton register_button" onClick={onSubmit}>회원가입</button>
                </div>
            </form>
        </div>
    )
}
export default RegisterPage;
