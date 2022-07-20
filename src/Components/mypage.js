import React, {useState} from 'react';
import './mypage.css';

function MyPage(){
    const [password, setPassword] = useState(""); //비밀번호
    const [confirmPassword, setConfirmPassword] = useState(""); //비밀번호 확인
    const [pwCheckMsg, setpwCheckMsg] = useState(""); // 비밀번호 확인 메시지
    const [pwMsgBool, setpwMsgBool] = useState(false);

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
        checkPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
        checkPassword(event.currentTarget.value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        if(password !== confirmPassword){ //비밀번호 입력이 같은지 확인
            return alert("비밀번호가 서로 일치하지 않습니다.");
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


    return (
        <div className="mypage_box">
            <h1 className="mypage_title">&#xE001;_ MyPage</h1>
            <form>
                <div className="mypage_msg">이름</div>
                <div className="mypage_row">
                    <div className="name_show">Name</div> {/* {user.name} */}
                </div>
                <div className="mypage_msg">금오공대 웹메일</div>
                <div className="mypage_row">
                    <div className="webmail_show">WebMail@kumoh.ac.kr</div> {/* {user.mail} */}
                </div>
                <div className="mypage_msg">아이디</div>
                <div className="mypage_row">
                    <div className="id_show">ID</div> {/* {user.id} */}
                </div>
                <div className="mypage_msg">비밀번호 수정</div>
                <div className="mypage_row">
                    <input type="password" name="password"  placeholder="Current Password" className="reg_pw_input" onChange={onPasswordHandler} /><br/>
                </div>
                <div className="mypage_row">
                    <input type="password" name="password" value={password} placeholder="New Password" className="reg_pw_input" onChange={onPasswordHandler} /><br/>
                </div>
                <div className="mypage_row">
                    <input type="password" name="confirmPassword" value={confirmPassword} placeholder="New Password Confirm" className="confirm_pw_input" onChange={onConfirmPasswordHandler} /><br/>
                </div>
                <div className={pwMsgBool ? 'success' : 'failure'}>{pwCheckMsg}</div>
                <div className="button_container">
                    <button type="submit" className="pw_edit_button" onSubmit={onSubmit} >비밀번호 변경</button>
                </div>
            </form>
        </div>
    )
}
export default MyPage;