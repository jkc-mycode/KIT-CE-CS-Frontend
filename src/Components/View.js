import React, {useState} from 'react';
import './view_test.css';

function ViewPage(){
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const onIdHandler = (event) => {
        setId(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <div className="test">페이지 이름, 로그인, 마이페이지 메뉴 위치</div>
            <div className="test">네이게이션 메뉴 바 위치</div>
            <h1>게시글 타이틀</h1>
            <div>
                <table>
                    <tr>
                        <td>작성자</td>
                        <td>작성일 &nbsp;</td>
                        <td>조회수 &nbsp;</td>
                    </tr>
                </table>
                <div className="test" style={{height: '400px'}}>더미 데이터 게시글</div>
            </div>
            <br/>
            <div>
                <table>
                    <tr>
                        <td>수정</td>
                        <td>삭제</td>
                        <td>목록</td>
                    </tr>
                </table>
            </div>
            <div className="test">댓글 메뉴 위치</div>
            <div className="test">게시글 목록</div>
        </>
    )
}
export default ViewPage;