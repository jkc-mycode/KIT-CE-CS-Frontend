import React, {useState, useEffect, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './mypage.css';
import { getCookie, removeCookie } from '../cookie';
import Pagination from "react-js-pagination";

function MyInfoPage(){
    //신고자리스트 페이지네이션
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(2); //20개 고정
    const [total, setTotal] = useState(12); //전체 게시물 수
    const [reportNum, setReportNum] = useState(0); //신고리스트 num
    let z = -1;

    //유저정보 및 페이지네이션
    const [user, setUser] = useState([]); //user 정보
    const [reportList, setReportList] = useState([]);
    const [myArticle, setMyArticle] = useState([]); //게시물
    const [postPage, setPostPage] = useState(1);
    const [postLimit, setPostLimit] = useState(2); //20개 고정
    const [postTotal, setPostTotal] = useState(12); //전체 게시물 수
    const [num, setNum] = useState(0); //각 페이지 제일 윗번호
    let x = -1;

    //비밀번호
    const [currentPassword, setCurrentPassword] = useState(""); //기존 비밀번호
    const [newPassword, setNewPassword] = useState(""); //새로운 비밀번호
    const [deleteAccountPassword, setDeleteAccountPassword] = useState(""); //탈퇴 비밀번호 확인
    const [confirmPassword, setConfirmPassword] = useState(""); //새로운 비밀번호 확인
    const [pwCheckMsg, setpwCheckMsg] = useState(""); // 비밀번호 확인 메시지
    const [pwMsgBool, setpwMsgBool] = useState(false); //같은지 유무 메시지
    const navigate = useNavigate();

    //유저등급변경
    const [userId, setUserId] = useState("");
    const [grade, setGrade] = useState(0);

    function timer(d){
        let timestamp = d;
        let date = new Date(timestamp);

        let year = date.getFullYear().toString().slice(-2); //년도 뒤에 두자리
        let month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
        let day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
        let hour = ("0" + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
        let minute = ("0" + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
        let second = ("0" + date.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)

        let returnDate = year + "." + month + "." + day + ". " + hour + ":" + minute + ":" + second;
        return returnDate;
    }

    //게시물리스트 페이지네이션
    const handlePostPageChange = (page) => {
        setPostPage(page);
    };

    //신고리스트 페이지네이션
    const handlePageChange = (page) => {
        setPage(page);
    };

    //비밀번호 변경관련 핸들러
    const onCurrentPasswordHandler = (event) => {
        setCurrentPassword(event.currentTarget.value);
    }

    const onNewPasswordHandler = useCallback((e) => {
        const passwordRegExp = /^(?=.*[a-zA-Z!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        let space = /\s/g;
        setNewPassword(e.currentTarget.value);
        if(space.test(e.currentTarget.value)) {
            setpwCheckMsg('공백은 사용불가입니다!');
            setpwMsgBool(false);
        } else if (!passwordRegExp.test(e.currentTarget.value)) {
            setpwCheckMsg('숫자+영문자(+특수문자) 조합으로 8자리 이상 입력해주세요!');
            setpwMsgBool(false);
        } else {
            setpwCheckMsg('안전한 비밀번호에요 :)');
            setpwMsgBool(true);
        }
    }, [])
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
        checkPassword(event.currentTarget.value);
    }
    const onDeleteAccountPassword = (event) => {
        setDeleteAccountPassword(event.currentTarget.value);
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

    //유저등급 변경관련 핸들러
    const onUserIdHandler = (e) => {
        setUserId(e.currentTarget.value);
    }
    const onGradeHandler = (e) => {
        setGrade(e.currentTarget.value);
    }

    //mypage 정보 가져오는 axios
    const getUserInfo = async () =>{
        await axios.get('/mypage/?page=' + postPage)
            .then((res) => {
                setUser(res.data.userMypage);
                setMyArticle(res.data.userMypage.articles)
                setPostTotal(res.data.totalArticle);
                setPostLimit(res.data.postLimit);
                setNum(res.data.totalArticle - (postPage * res.data.postLimit)+res.data.postLimit);
            })
            .catch((e) => {
                console.log(e);
            })
    }

    //비밀번호 변경 axios
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
                    alert("변경되었습니다.");
                    window.location.reload();
                })
                .catch((e) => {
                    alert("현재 비밀번호가 틀렸습니다!");
                    console.log(e);
                })
        }
    }

    //회원탈퇴 axios
    const onDeleteAccount = async () => {
        if(window.confirm("정말로 탈퇴하시겠습니까??")){
            await axios.delete('/sign/', {
                data: {
                    password: `${deleteAccountPassword}`
                }
            })
                .then((res) => {
                    alert("탈퇴되었습니다ㅠㅠ");
                    removeCookie("kit_acs", { domain: "kitacs.com", path: "/" });
                    navigate('/');
                })
                .catch((e) => {
                    if(e.response.data.message === "Wrong Password"){
                        alert("비밀번호가 틀렸습니다!");
                    }else{
                        alert("에러!!");
                    }
                })
        }else{
            console.log("취소");
        }
    }

    //신고 리스트 가져오는 axios
    const getReportList = async () => {
        await axios.get('/report?page=' + page)
            .then((res) => {
                setReportList(res.data.reports);
                setTotal(res.data.totalReport);
                setLimit(res.data.postLimit);
                setReportNum((page * res.data.postLimit) - res.data.postLimit + 1)
            })
            .catch((e) => {
                console.log(e);
            })
    }

    //신고 리스트 삭제 axios
    const deleteReport = (e) => {
        if(window.confirm("정말 삭제하시겠습니까?")){
            axios.delete('/report/' + e.currentTarget.value)
                .then((res) => {
                    window.location.reload();
                })
                .catch((e) => {
                    alert("에러!!");
                    console.log(e);
                })
        }else{
            console.log("취소");
        }
    }


    //유저등급 변경 axios
    let data = {
        id: `${userId}`,
        class: `${grade}`
    }
    const headers = {
        "Content-Type": `application/json`,
    };
    const gradeChange = () => {
        if(window.confirm("변경하시겠습니까?")){
            axios.patch('/mypage/class', data, headers)
                .then((res) => {
                    alert("변경되었습니다!");
                    window.location.reload();
                })
                .catch((e) => {
                    alert("잘못된 입력값입니다.");
                    console.log(e);
                })
        }else{
            console.log("취소");
        }
    }

    useEffect(() => {
        if(!getCookie('kit_acs')){
            alert("로그인 후 이용가능!!");
            navigate("/");
        }
        if(getCookie('kit_acs_class') === "3"){
           getReportList();
        }
        getUserInfo();
    }, [page, postPage])

    return (
        <div className='viewSection'>
            <div className='bodySection'>
                <div className='side'>
                    <div className="box mypage_box">
                        <h1 className="boxTitle">&#xE001;_ 마이페이지</h1>
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
                                <input type="password" name="password" value={currentPassword} placeholder="현재 비밀번호" className="reg_pw_input" onChange={onCurrentPasswordHandler} /><br/>
                            </div>
                            <div className="mypage_row">
                                <input type="password" name="password" value={newPassword} placeholder="새 비밀번호" className="reg_pw_input" onChange={onNewPasswordHandler} /><br/>
                            </div>
                            <div className="mypage_row">
                                <input type="password" name="confirmPassword" value={confirmPassword} placeholder="다시 입력하세요" className="confirm_pw_input" onChange={onConfirmPasswordHandler} /><br/>
                            </div>
                            <div className={pwMsgBool ? 'success' : 'failure'}>{pwCheckMsg}</div>
                            <div className="mypage_button_container">
                                <button type="submit" className="mbutton pw_edit_button" onClick={onPasswordChange} >비밀번호 변경</button>
                            </div>
                            <div className="mypage_msg">회원탈퇴</div>
                            <div className='mypage_row'>
                                <input type="password" className="delete_account_password" onChange={onDeleteAccountPassword} placeholder="비밀번호를 입력해주세요"/>
                            </div>
                            <div className='mypage_button_container'>
                                <button type="button" className="sbutton delete_account" onClick={onDeleteAccount}>회원탈퇴</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='main'>
                    <div className="box mypost_box">
                        <div className='boxTitle'>&#xE001;_ 내 작성글</div>
                        <table>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성일</th>
                            </tr>
                            {
                                myArticle.slice(0).map((i) => {
                                    x = x + 1;
                                    let goView = (e) => {
                                        navigate('/view/'+i._id, {state : i});
                                    }
                                    return (
                                        <tr onClick={goView}>
                                            <td>{num-x}</td>
                                            <td>{i.title.length > 15 ? `${i.title.substring(0, 15)}...` : i.title}<span className='commentCount'> [{i.commentCount}]</span></td>
                                            <td>{timer(i.date)}</td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                        {
                            myArticle.length === 0
                                ? <div className="noMyArticle">작성된 게시물이 없습니다.</div>
                                : null
                        }
                        <Pagination
                            activePage={postPage} //현재 페이지
                            itemsCountPerPage={postLimit} //한 페이지당 보여줄 리스트 아이템의 개수
                            totalItemsCount={postTotal} //총 아이템의 개수
                            pageRangeDisplayed={4} //Paginator 내에서 보여줄 페이지의 범위(10개)
                            prevPageText={"‹"} //"이전"을 나타낼 텍스트
                            nextPageText={"›"} //"다음"을 나타낼 텍스트
                            onChange={handlePostPageChange} //페이지가 바뀔 때 핸들링해줄 함수
                            onClick={getUserInfo}
                        />
                    </div>
                </div>
            </div>
            {
                user.id === "admin"
                    ? <div className='bodySection'>
                        <div className='side'>
                            <div className='box grade_box'>
                                <div className='boxTitle'>&#xE001;_ 유저 등급 조정</div>
                                <form>
                                    <div className="mypage_msg">아이디</div>
                                    <div className="mypage_row">
                                    <input type="text" name="user" placeholder="아이디 입력" className='grade_input' onChange={onUserIdHandler}/>
                                    </div>
                                    <div className="mypage_msg">등급</div>
                                    <div className="mypage_row">
                                    <input type="text" name="grade" placeholder="등급 입력" className='grade_input' onChange={onGradeHandler}/>
                                    </div>
                                    <div className='mypage_button_container'>
                                        <button type="button" className='mbutton grade_edit' onClick={gradeChange}>변경하기</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className='main'>
                            <div className='box report_box'>
                                <div className='boxTitle'>&#xE001;_ 신고함</div>
                                <table>
                                    <tr>
                                        <th>번호</th>
                                        <th>카테고리</th>
                                        <th>내용</th>
                                        <th>신고사유</th>
                                        <th>신고자</th>
                                        <th>신고일</th>
                                        <th></th>
                                    </tr>
                                    {
                                        reportList.map((item) => {
                                            let type = null;
                                            z = z + 1;
                                            let goView = (e) => {
                                                navigate(`/view/${item.articleId}`, {state : item});
                                            }
                                            if(item.targetType === "article"){
                                                type = "게시물"
                                            }else{
                                                type = "댓글"
                                            }
                                            return(
                                                <tr>
                                                    <td onClick={goView}>{reportNum + z}</td>
                                                    <td onClick={goView}>{type}</td>
                                                    {
                                                        item.targetType === "article"
                                                            ? <td onClick={goView}>바로가기</td>
                                                            : <td onClick={goView}>{item.content.length > 15 ? `${item.content.substring(0, 15)}...` : item.content}</td>
                                                    }
                                                    <td onClick={goView}>{item.reason.length > 5 ? `${item.reason.substring(0, 5)}...` : item.reason}</td>
                                                    <td onClick={goView}>{item.reporter}</td>
                                                    <td onClick={goView}>{timer(item.date)}</td>
                                                    <td>
                                                        <button type="button" className="ebutton report_delete_button" value={item._id} onClick={deleteReport}>삭제</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </table>
                                <Pagination
                                    activePage={page} //현재 페이지
                                    itemsCountPerPage={limit} //한 페이지당 보여줄 리스트 아이템의 개수
                                    totalItemsCount={total} //총 아이템의 개수
                                    pageRangeDisplayed={4} //Paginator 내에서 보여줄 페이지의 범위(10개)
                                    prevPageText={"‹"} //"이전"을 나타낼 텍스트
                                    nextPageText={"›"} //"다음"을 나타낼 텍스트
                                    onChange={handlePageChange} //페이지가 바뀔 때 핸들링해줄 함수
                                    onClick={getReportList}
                                />
                            </div>
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}
export default MyInfoPage;