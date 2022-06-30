import React, {useState} from 'react';
import './view_test.css';

function ViewPage(){
    const [post, setPost] = useState({});

    //useEffect() 처리

    return (
        <>
            <div className = "header">
                <div className = "items">CE-SE</div>
                <div className = "items">login</div>
                <div className = "items">MyPage</div>
            </div>
            <div className = "menu_fixed">
                <div className = "menubar">
                    <div className = "menu_items">전체 게시판</div>
                    <div className = "menu_items">졸업생 게시판</div>
                    <div className = "menu_items">질문 게시판</div>
                    <div className = "menu_items">학업 게시판</div>
                    <div className = "menu_items">차후 추가 예정</div>
                    <div className = "menu_items">차후 추가 예정</div>
                </div>
            </div>
            <h1 className="title">게시글 타이틀</h1> {/* {post.title} */}
            <div>
                <table className="post_info_table">
                    <tr>
                        <td>작성자</td> {/* {post.author} */}
                        <td>작성일 &nbsp;</td> {/* {post.date} */}
                        <td>조회수 &nbsp;</td> {/* {post.hit} */}
                    </tr>
                </table>
                <div className="test" style={{height: '400px'}}>더미 데이터 게시글</div> {/* {post.content} */}
                <div className="test" >태그 정보</div> {/* {post.tag} */}
            </div>
            <br/>
            <div>
                <table className="revise_delete_list">
                    <tr>
                        <td>수정(버튼)</td>
                        <td>삭제(버튼)</td>
                        <td>목록(버튼)</td>
                    </tr>
                </table>
            </div>
            <div className="test">댓글 메뉴 위치 (예정)</div><br/>
            <div className="board">
                <table>
                    <tr>
                        <td>번호</td>
                        <td>제목</td>
                        <td>작성자</td>
                        <td>작성일</td>
                        <td>조회수</td>
                    </tr>
                    <td>더미데이터</td>
                </table>
            </div>
        </>
    )
}
export default ViewPage;