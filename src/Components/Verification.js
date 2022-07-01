import React, {useState} from 'react';

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
            <h2 className="verification_title">Verification</h2>
            <form>
                <input type="text" name="verification" value={verification} placeholder="인증코드" className="verification_input" onChange={onVerificationHandler} /><br/>
                <button type="submit" className="verification_button" onSubmit={onSubmit} >인증하기</button>
            </form>
        </div>
    )
}
export default VerificationPage;