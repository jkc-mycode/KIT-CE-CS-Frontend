import React, {useState} from 'react';
import './Verification.css';

function VerificationPage(){
    const [verification, setVerification] = useState("");

    const onVerificationHandler = (event) => {
        setVerification(event.currentTarget.value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className="verification_box">
            <h1 className="verification_title">&#xE001;_ Verification</h1>
            <h3 className="message">입력하신 웹메일로 인증 코드가 전송되었습니다.<br/>메일함을 확인 후 인증 코드를 입력해 주세요.</h3>
            <form>
                <input type="text" name="verification" value={verification} placeholder="인증코드" className="verification_input" onChange={onVerificationHandler} /><br/>
                <div className="button_container">
                    <button type="submit" className="verification_button" onSubmit={onSubmit} >인증하기</button>
                </div>
            </form>
        </div>
    )
}
export default VerificationPage;