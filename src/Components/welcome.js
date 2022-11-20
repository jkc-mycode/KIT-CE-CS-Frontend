import React, {useState, useEffect} from 'react';
import './welcome.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function Welcome(){
    const navigate = useNavigate();
    const [confirmCheck, setConfirmCheck] = useState(false);

    const confirmEmail = async () => {
        await axios.get('/sign/confirmEmail' + window.location.search)
            .then((res) => {
                setConfirmCheck(!confirmCheck);
                console.log("OK");
            })
            .catch((e) => {
                console.log(e);
                alert("잘못된 코드입니다!!");
                navigate("/");
            })
    }

    useEffect(() => {
        confirmEmail()
    }, [])
    return(
        <>
        {
            confirmCheck === true
                ? <div className="box login_box">
                    <h1 className="boxBigTitle">&#xE001;_ 환영합니다.</h1>
                    <br/>
                    <p>인증 절차는 모두 끝났습니다.</p>
                    <p>또 다른 문의 사항이 필요하면</p>
                    <p>저희 대표 메일로 문의주시면 감사하겠습니다.</p>
                    <p>문구 뭐 넣으면 좋을려나....</p>
                </div>
                : null
        }
        </>
    )
}
export default Welcome;
