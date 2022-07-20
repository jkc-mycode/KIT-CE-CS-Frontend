import React, {useState} from 'react';
import './View.css';


import Header from './header';
import MenuBar from './menubar';
// import BoardList from './boardlist';

function ViewPage(){
    const [post, setPost] = useState({});

    //useEffect() 처리

    return (
        <div className="view_section">
            <div className="post_section">
                <div className="post_tag" ># Tags</div> {/* {post.tag} */}
                <h1 className="title">&#xE001;_ 게시글 타이틀</h1> {/* {post.title} */}
                <div>
                    <div className="post_info_table">
                        <div className="post_info_author">작성자</div> {/* {post.author} */}
                        <div className="post_info_hit">조회수 &nbsp;</div> {/* {post.hit} */}
                        <div className="post_info_date">2022.07.11 10:09 &nbsp;</div> {/* {post.date} */}
                    </div>
                    <div className="line"></div>
                    <div className="post_content" style={{height: '400px'}}>더미 데이터 게시글</div> {/* {post.content} */}
                </div>
                <div>
                    <table className="edit_delete_list">
                        <tr>
                            <td>수정</td>
                            <td>삭제</td>
                            <td>목록</td>
                        </tr>
                    </table>
                    <div className="line"></div>
                </div>
                <div className="test">댓글 메뉴 위치 (예정)</div>
                <div className="line"></div>
                <br/>
                <table className="post_table">
                    <tr>
                        <td>&#xE000; 이전글</td>
                        <td>이전글 제목</td>
                    </tr>
                    <tr>
                        <td>다음글 &#xE001;</td>
                        <td>다음글 제목</td>
                    </tr>
                </table>
                {/* <BoardList/> */}
            </div>
        </div>
    )
}
export default ViewPage;