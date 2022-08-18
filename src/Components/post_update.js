import React, {useState, useCallback} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropdown from './post_dropdown';
import './post_write.css';


function PostUpdate(){
    const location = useLocation(); //navigate로 보낸 파라미터 가져오기 위해 사용
    console.log(location.state);
    const [title, setTitle] = useState(location.state.title); //제목
    let content = location.state.content //내용 (HTML 통째로 저장)
    const viewId = useParams(); //게시물id
    const [dropdownVisibility, setDropdownVisibility] = useState(false);
    const [dropdownName, setDropdownName] = useState(() => {
        if(location.state.tag === "notice"){
            return "공지사항";
        }else if(location.state.tag === "free"){
            return "자유게시판";
        }else if(location.state.tag === "study"){
            return "학업게시판";
        }else{
            return "졸업생게시판";
        }
    });
    const [dropdownValue, setDropdownValue] = useState(location.state.tag);
    const [fileUpload, setFileUpload] = useState(location.state.fileList[0]);	//파일
    const navigate = useNavigate();

    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value);
    }
    const onContentHandler = (value) => {
        console.log(value);
        content = value;
    }
    const onDropdownHandler = (event) => {
        console.log(event.currentTarget.name);
        setDropdownName(event.currentTarget.name);
        setDropdownValue(event.currentTarget.value);
        setDropdownVisibility(false);
    }
    const onFileHandler = useCallback(async (e) => {
        console.log(e.target.files);
        setFileUpload(e.target.files[0]);
    }, [fileUpload])

    const modules = {
        toolbar: [
            //[{ 'font': [] }],
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            [{ 'align': [] }, { 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            ['clean']
        ],
    }
    const formats = [
        // 'font',
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'align', 'color', 'background',
    ]

    const postUpdate = (event) => {
        event.preventDefault();
        let data = {
            title: `${title}`,
            tag: `${dropdownValue}`,
            content: `${content}`
        };
        const headers = {
            "Content-Type": `application/json`,
        };
        axios.patch('/article/' + location.state._id, data, headers)
            .then((res) => {
                console.log(res.data);
            })
            .catch((e) => {
                console.log(e);
            })
        navigate('/');
    }

    return (
        <div className="post_write">
            <div className="input_title_box">
                <input type="text"
                       name="title"
                       value={title}
                       placeholder="제목을 입력해주세요."
                       className="input_title"
                       onChange={onTitleHandler}
                       style={{height: "20px", width: "800px"}}
                />
            </div>
            <br/>
            <div className="post_dropdown_box">
                <button onClick={(e) => setDropdownVisibility(!dropdownVisibility)}>
                    {
                        dropdownVisibility
                            ? `${dropdownName}`
                            : `${dropdownName}`
                    }
                </button>
                <Dropdown visibility={dropdownVisibility}>
                    <ul>
                        <li><button type="button" value="free" name="자유게시판" onClick={onDropdownHandler}>자유게시판</button></li>
                        <li><button type="button" value="notice" name="공지사항" onClick={onDropdownHandler}>공지사항</button></li>
                        <li><button type="button" value="study" name="학업게시판" onClick={onDropdownHandler}>학업게시판</button></li>
                        <li><button type="button" value="graduate" name="졸업생게시판" onClick={onDropdownHandler}>졸업생게시판</button></li>
                    </ul>
                </Dropdown>
            </div>
            <br/>
            <br/>
            <div className="post_write_box">
                <ReactQuill
                    style={{height: "300px", width: "800px"}}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    placeholder="내용을 입력해주세요."
                    onChange={onContentHandler}
                    value={content || ''}
                />
            </div>
            <br/><br/><br/>
            <input type="file" id="file" onChange={onFileHandler} multiple="multiple" />
            <br/><br/>
            <div className="post_write_button">
                <button type="button" className="post_register_button" onClick={postUpdate}>등록</button>
                <button type="button" className="post_cancel_button" onClick={() => navigate('/view/'+location.state._id)}>취소</button>
            </div>
        </div>
    )
}
export default PostUpdate;