import React, {useState, useCallback} from 'react';
import axios from 'axios';
import './idsearch.css';

function IDSearch (){
    const [name, setName] = useState("");
    const [webmail, setWebmail] = useState("");

    const [nameCheck, setNameCheck] = useState(false);
    const [webmailCheck, setWebmailCheck] = useState(false);

    const onNameHandler = useCallback((e) => {
        const nameRegExp = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,5}$/;
        setName(e.currentTarget.value);
        if (!nameRegExp.test(e.currentTarget.value)) {
            setNameCheck(false);
        } else {
            setNameCheck(true);
        }
    }, [])
    const onWebmailHandler = useCallback((e) => {
        const webmailRegExp = /^[a-z0-9]{3,10}$/;
        setWebmail(e.currentTarget.value);
        if (!webmailRegExp.test(e.currentTarget.value)) {
            setWebmailCheck(false);
        } else {
            setWebmailCheck(true);
        }
    }, [])
    
    let data = {
        name: `${name}`,
        webmail: `${webmail}@kumoh.ac.kr`
    }
    const headers = {
        "Content-Type": `application/json`,
    };
    const submitUserInfo = async () => {
        console.log(name, nameCheck);
        console.log(webmail, webmailCheck);
        if(!nameCheck){
            alert("이름이 잘못 입력되었습니다.");
        }else if(!webmailCheck){
            alert("웹메일이 잘못 입력되었습니다.")
        }else{
            const res = await axios.post('/sign/findID', data, headers)
                .then((res) => {
                    alert(name + "님의 아이디 : " + res.data);
                })
                .catch((e) => {
                    console.log(e);
                    alert("일치하는 정보가 없습니다.");
                })
        }
    }

    return(
        <>
            <div className="search_box">
                <div className="id_search_box">
                    <h1>&#xE001;_ 아이디 찾기</h1>
                    <div>이름</div>
                    <input type="text" className="id_search_name" onChange={onNameHandler}/>
                    <div>웹메일</div>
                    <input type="text" className="id_search_webmail" onChange={onWebmailHandler}/>@kumoh.ac.kr<br/><br/>
                    <button type="button" className="id_search_button" onClick={submitUserInfo}>아이디찾기</button>
                </div>
            </div>
        </>
    )
}

export default IDSearch;