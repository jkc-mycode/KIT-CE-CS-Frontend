import React, {useState} from 'react';
import './view_test.css';


import Header from './header';
import MenuBar from './menubar';
import BoardList from './boardlist';

function ViewPage(){
    const [post, setPost] = useState({});

    //useEffect() 처리

    return (
        <>
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
            <BoardList/>
        </>
    )
}
export default ViewPage;