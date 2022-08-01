import React, {useState, useEffect} from 'react';
import './mypage.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function MyInfoPage(){
    const [user, setUser] = useState([]); //user 정보
    const [myArticle, setMyArticle] = useState([]); //게시물
    const [currentPassword, setCurrentPassword] = useState(""); //기존 비밀번호
    const [newPassword, setNewPassword] = useState(""); //새로운 비밀번호

    const [confirmPassword, setConfirmPassword] = useState(""); //새로운 비밀번호 확인
    const [pwCheckMsg, setpwCheckMsg] = useState(""); // 비밀번호 확인 메시지
    const [pwMsgBool, setpwMsgBool] = useState(false); //같은지 유무 메시지
    const navigate = useNavigate();
    let num = myArticle.length; //article 길이

    const onCurrentPasswordHandler = (event) => {
        setCurrentPassword(event.currentTarget.value);
        checkPassword(event.currentTarget.value);
    }
    const onNewPasswordHandler = (event) => {
        setNewPassword(event.currentTarget.value);
        checkPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
        checkPassword(event.currentTarget.value);
    }
    function checkPassword(target) {
        if (newPassword !== target)
        {
            setpwMsgBool(false);
            setpwCheckMsg("비밀번호가 서로 일치하지 않습니다.");
        }
        else if (newPassword === target)
        {
            setpwMsgBool(true);
            setpwCheckMsg("비밀번호가 일치합니다.");
        }
    }
    function timer(d){
        let timestamp = d;
        let date = new Date(timestamp);

        let year = date.getFullYear().toString(); //년도 뒤에 두자리
        let month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
        let day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)

        let returnDate = year + "." + month + "." + day;

        return returnDate;
    }

    const onPasswordChange = (event) => {
        event.preventDefault();
        if(newPassword !== confirmPassword){ //비밀번호 입력이 같은지 확인
            return alert("비밀번호가 서로 일치하지 않습니다.");
        }else{
            //비밀번호 변경 axios
            let data = {
                newPassword: `${newPassword}`,
                password: `${currentPassword}`
            };
            const headers = {
                "Content-Type": `application/json`,
            };
            axios.patch('/mypage/password', data, headers)
                .then((res) => {
                    console.log(res);
                    alert("변경되었습니다.");
                    window.location.reload();
                })
                .catch((e) => {
                    console.log(e);
                    window.sessionStorage.clear();
                })
        }
    }
    useEffect(() => {
        //mypage 정보 가져오는 axios
        axios.get('/mypage/')
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
                setMyArticle(res.data.article)
            })
            .catch((e) => {
                console.log(e);
            })
    }, [])

    return (
        <>
            <div className="mypage_box">
                <h1 className="mypage_title">&#xE001;_ MyPage</h1>
                <form>
                    <div className="mypage_msg">이름</div>
                    <div className="mypage_row">
                        <div className="name_show">{user.name}</div>
                    </div>
                    <div className="mypage_msg">금오공대 웹메일</div>
                    <div className="mypage_row">
                        <div className="webmail_show">{user.email}</div>
                    </div>
                    <div className="mypage_msg">아이디</div>
                    <div className="mypage_row">
                        <div className="id_show">{user.id}</div>
                    </div>
                    <div className="mypage_msg">비밀번호 수정</div>
                    <div className="mypage_row">
                        <input type="password" name="password" value={currentPassword} placeholder="Current Password" className="reg_pw_input" onChange={onCurrentPasswordHandler} /><br/>
                    </div>
                    <div className="mypage_row">
                        <input type="password" name="password" value={newPassword} placeholder="New Password" className="reg_pw_input" onChange={onNewPasswordHandler} /><br/>
                    </div>
                    <div className="mypage_row">
                        <input type="password" name="confirmPassword" value={confirmPassword} placeholder="New Password Confirm" className="confirm_pw_input" onChange={onConfirmPasswordHandler} /><br/>
                    </div>
                    <div className={pwMsgBool ? 'success' : 'failure'}>{pwCheckMsg}</div>
                    <div className="button_container">
                        <button type="submit" className="pw_edit_button" onClick={onPasswordChange} >비밀번호 변경</button>
                    </div>
                </form>
            </div>
            <div className="mypost_box">
                {
                    // myArticle.slice(0).reverse().map((i) => {
                    //     let goView = (e) => {
                    //         navigate('view/'+i._id, {state : i});
                    //     }
                    //     return (
                    //         <tr onClick={goView}>
                    //             <td>{num--}</td>
                    //             <td>{i.title}</td>
                    //             <td>{timer(i.date)}</td>
                    //             <td>{i.commentList.length}</td>
                    //         </tr>
                    //     )
                    // })
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                    </tr>
                }
            </div>
        </>
    )
}
export default MyInfoPage;