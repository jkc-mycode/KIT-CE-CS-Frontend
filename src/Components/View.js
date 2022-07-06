import React, {useState} from 'react';
import './View.css';


import Header from './header';
import MenuBar from './menubar';
import BoardList from './boardlist';

function ViewPage(){
    const [post, setPost] = useState({});

    //useEffect() 처리

    return (
        <div className="view_section">
            <div className="post_section">
                <h1 className="title">&#xE001;_ 게시글 타이틀</h1> {/* {post.title} */}
                <div>
                    <table className="post_info_table">
                        <tr>
                            <td>작성자</td> {/* {post.author} */}
                            <td>조회수 &nbsp;</td> {/* {post.hit} */}
                            <td>작성일 &nbsp;</td> {/* {post.date} */}
                        </tr>
                    </table>
                    <div className="line"></div>
                    <div className="post_content" style={{height: '400px'}}>더미 데이터 게시글</div> {/* {post.content} */}
                    <div className="post_tag" >태그 정보</div> {/* {post.tag} */}
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
                <BoardList/>
            </div>
        </div>
    )
}
export default ViewPage;