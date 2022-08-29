import React, {useState, useCallback} from 'react';
import axios from 'axios';
import './idsearch.css';

function IDSearch (){
    const [name, setName] = useState("");
    const [webmail, setWebmail] = useState("");
    const [pwName, setPwName] = useState("");
    const [id, setId] = useState("");

    const [nameCheck, setNameCheck] = useState(false);
    const [webmailCheck, setWebmailCheck] = useState(false);
    const [pwNameCheck, setPwNameCheck] = useState(false);
    const [idCheck, setIdCheck] = useState(false);

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
    const onPwNameHandler = useCallback((e) => {
        const nameRegExp = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,5}$/;
        setPwName(e.currentTarget.value);
        if (!nameRegExp.test(e.currentTarget.value)) {
            setPwNameCheck(false);
        } else {
            setPwNameCheck(true);
        }
    }, [])
    const onIdHandler = useCallback((e) => {
        const idRegExp = /^[a-z0-9]{5,10}$/;
        setId(e.currentTarget.value);
        if (!idRegExp.test(e.currentTarget.value)) {
            setIdCheck(false);
        } else {
            setIdCheck(true);
        }
    }, [])

    //아이디찾기 axios
    const headers = {
        "Content-Type": `application/json`,
    };
    const submitSearchId = async () => {
        let data = {
            name: `${name}`,
            webmail: `${webmail}@kumoh.ac.kr`
        }
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
                    window.location.reload();
                })
                .catch((e) => {
                    console.log(e);
                    alert("일치하는 정보가 없습니다.");
                })
        }
    }

    //비밀번호 재설정 axios
    const submitSearchPw = async () => {
        let data = {
            name: `${pwName}`,
            id: `${id}`
        }
        if(!pwNameCheck){
            alert("이름이 잘못 입력되었습니다.");
        }else if(!idCheck){
            alert("아이디가 잘못 입력되었습니다.")
        }else{
            const res = await axios.post('/sign/findPassword', data, headers)
                .then((res) => {
                    console.log(res);
                    alert("웹메일로 임시 비밀번호 링크를 전송했습니다.");
                    window.location.replace('/login');
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
                    <button type="button" className="id_search_button" onClick={submitSearchId}>아이디찾기</button>
                </div>
                <div className="pw_search_box">
                    <h1>&#xE001;_ 비밀번호 재설정</h1>
                    <div>이름</div>
                    <input type="text" className="pw_search_name" onChange={onPwNameHandler}/>
                    <div>아이디</div>
                    <input type="text" className="pw_search_id" onChange={onIdHandler}/><br/><br/>
                    <button type="button" className="pw_search_button" onClick={submitSearchPw}>비밀번호재설정</button>
                </div>
            </div>
        </>
    )
}

export default IDSearch;