import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import './mypage.css';
import { getCookie, removeCookie } from '../cookie';
import Pagination from "react-js-pagination";

function MyInfoPage(){
    //신고자리스트 페이지네이션
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(2); //20개 고정
    const [total, setTotal] = useState(12); //전체 게시물 수
    let reportNum = 0; //신고리스트 num

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
    //let num = myArticle.length; //article 길이

    //유저등급변경
    const [userId, setUserId] = useState("");
    const [grade, setGrade] = useState(0);

    function timer(d){
        let timestamp = d;
        let date = new Date(timestamp);

        let year = date.getFullYear().toString().slice(0); //년도 뒤에 두자리
        let month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
        let day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
        let hour = ("0" + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
        let minute = ("0" + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
        let second = ("0" + date.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)

        let returnDate = year + "/" + month + "/" + day + "/ " + hour + ":" + minute + ":" + second;
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
        const res = await axios.get('/mypage/?page=' + postPage)
            .then((res) => {
                console.log(res.data);
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
                    console.log(res);
                    alert("변경되었습니다.");
                    window.location.reload();
                })
                .catch((e) => {
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
                    console.log(res);
                    alert("탈퇴되었습니다ㅠㅠ");
                    removeCookie("kit_acs", { domain: "localhost", path: "/" });
                    navigate('/');
                })
                .catch((e) => {
                    console.log(e);
                })
        }else{
            console.log("취소");
        }
    }

    //신고 리스트 가져오는 axios
    const getReportList = async () => {
        const res = await axios.get('/report?page=' + page)
            .then((res) => {
                console.log(res.data);
                setReportList(res.data.reports);
                setTotal(res.data.totalReport);
                setLimit(res.data.postLimit);
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
                    console.log(res);
                    window.location.reload();
                })
                .catch((e) => {
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
                    console.log(res);
                    alert("변경되었습니다!");
                    window.location.reload();
                })
                .catch((e) => {
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
        <div className='view_section'>
            <div className='left_mypage'>
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
                {
                    user.id === "admin"
                        ? <div className='grade_box'>
                            <h1>&#xE001;_ UserGrade</h1>
                            <form>
                                <input type="text" name="user" placeholder="아이디 입력" onChange={onUserIdHandler}/>
                                <input type="text" name="grade" placeholder="등급 입력" onChange={onGradeHandler}/>
                                <button type="button" onClick={gradeChange}>변경하기</button>
                            </form>
                        </div>
                        : null
                }
            </div>
            <div className="margin_section"></div>
            <div className='right_mypage'>
                <div className="mypost_box">
                    <h1>&#xE001;_ MyPost</h1>
                    <table>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성일</th>
                            <th>댓글수</th>
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
                                        <td>
                                            <div className="title_length">{i.title}</div>
                                        </td>
                                        <td>{timer(i.date)}</td>
                                        <td>{i.commentList.length}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
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
                {
                    user.id === "admin"
                        ? <div className='report_box'>
                            <h1>&#xE001;_ ReportList</h1>
                            <table>
                                <tr>
                                    <th>번호</th>
                                    <th>카테고리</th>
                                    <th>링크</th>
                                    <th>신고사유</th>
                                    <th>신고자</th>
                                    <th>신고일</th>
                                    <th></th>
                                </tr>
                                {
                                    reportList.map((item) => {
                                        let type = null;
                                        reportNum++;
                                        if(item.targetType === "article"){
                                            type = "게시물"
                                        }else{
                                            type = "댓글"
                                        }
                                        return(
                                            <tr>
                                                <td>{reportNum}</td>
                                                <td>{type}</td>
                                                <td><Link to={`/view/${item.articleId}`}>바로가기</Link></td>
                                                <td>{item.reason}</td>
                                                <td>{item.reporter}</td>
                                                <td>{timer(item.date)}</td>
                                                <td>
                                                    <button type="button" className="report_delete_button" value={item._id} onClick={deleteReport}>삭제</button>
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
                        : null
                }
                <br/><br/><br/>
                <input type="password" className="delete_account_password" onChange={onDeleteAccountPassword} placeholder="비밀번호를 입력해주세요"/>
                <button type="button" className="delete_account" onClick={onDeleteAccount}>회원탈퇴</button>
            </div>
        </div>
    )
}
export default MyInfoPage;