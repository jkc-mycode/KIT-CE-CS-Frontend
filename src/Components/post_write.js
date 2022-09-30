import React, {useState, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import { getCookie } from '../cookie';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropdown from './dropdown';
import './post_write.css';
import { useDropzone } from "react-dropzone"

function PostWrite(){
    const [title, setTitle] = useState(""); //제목
    const [postWriteCheck, setPostWriteCheck] = useState(true); //게시물 등록 버튼 체크용
    const [content, setContent ] = useState(""); //내용 (HTML 통째로 저장)
    const [dropdownVisibility, setDropdownVisibility] = useState(false);
    const [dropdownName, setDropdownName] = useState("게시판을 선택해주세요.");
    const [dropdownValue, setDropdownValue] = useState("");
    const [fileUpload, setFileUpload] = useState([]);	//파일
    const navigate = useNavigate();

    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value);
    }
    const onContentHandler = (value) => {
        setContent(value);
    }
    const onDropdownHandler = (event) => {
        if (event.currentTarget.name === "공지사항" && parseInt(getCookie("kit_acs_class")) < 2) {
            alert("공지사항 쓰기 권한이 없습니다.")
            return
        }
        setDropdownName(event.currentTarget.name);
        setDropdownValue(event.currentTarget.value);
        setDropdownVisibility(false);
    }

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

    //게시물 작성 axios
    const postWrite = useCallback(async () => {
        if (dropdownValue === '') {
            alert("게시판을 선택해주세요.")
            return
        }else if(title === ""){
            alert("제목을 입력해주세요.")
            return
        }else if(content === ""){
            alert("내용을 입력해주세요.")
            return
        }
        if(postWriteCheck){
            setPostWriteCheck(false)
            const formData = new FormData();
            [].forEach.call(fileUpload, (file) => {
                formData.append('fileList', file)
            })

            let data = {
                title: `${title}`,
                tag: `${dropdownValue}`,
                content: `${content}`
            };
            formData.append("data", JSON.stringify(data));
            await axios.post(
                '/article/',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then((res) => {
                alert("게시물이 등록되었습니다!");
                navigate('/');
            }).catch((e) => {
                console.log(e)
                if (e.response.data.message === "Unauthorized") {
                    alert("다시 로그인해주세요.");
                }
                else if (e.response.data.message === "No Permission") {
                    alert("공지사항 쓰기 권한이 없습니다.");
                }
            })
        }else{
            alert("잠시만 기다려주세요!!");
        }

    }, [fileUpload, title, dropdownValue, content, postWriteCheck])

    const onDrop = useCallback(acceptedFiles => {
        setFileUpload([...fileUpload, ...acceptedFiles])
    }, [fileUpload])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    })

    const removeFile = file => () => {
        const newFiles = [...fileUpload]
        newFiles.splice(newFiles.indexOf(file), 1)
        setFileUpload(newFiles)
    }

    const files = fileUpload.map(file => (
        <li key={file.path}>
            <button className='file_delete_button' onClick={removeFile(file)}><span className="material-icons-outlined">&#xe92b;</span></button>
            {file.path} - {file.size} bytes{" "}
        </li>
    ))
    return (
        <div className="viewSection">
            <div className='bodySection'>
                <div className="main">
                    <div className='box'>
                        <div className="board_title_section">
                            <div className="post_dropdown_box dropdown_box">
                                <button onClick={(e) => setDropdownVisibility(!dropdownVisibility)}>
                                    {dropdownName}
                                </button>
                                <Dropdown visibility={dropdownVisibility}>
                                    <ul>
                                        <div><button className='dtbutton post_dropdown_button' type="button" value="free" name="자유 게시판" onClick={onDropdownHandler}>자유게시판</button></div>
                                        <div><button className='dbutton post_dropdown_button' type="button" value="study" name="학업 게시판" onClick={onDropdownHandler}>학업게시판</button></div>
                                        <div><button className='dbutton post_dropdown_button' type="button" value="graduate" name="졸업생 게시판" onClick={onDropdownHandler}>졸업생게시판</button></div>
                                        <div><button className='dbbutton post_dropdown_button' type="button" value="notice" name="공지사항" onClick={onDropdownHandler}>공지사항</button></div>
                                        <div className='dhidden'>.</div>
                                    </ul>
                                </Dropdown>
                            </div>
                            <div className="input_title_box">&#xE001;_
                                <div className="input_title_row">
                                    <input type="text"
                                        name="title"
                                        value={title}
                                        placeholder="제목을 입력해주세요."
                                        className="input_title"
                                        onChange={onTitleHandler}
                                        // style={{height: "20px", width: "800px"}}
                                    />
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="post_write_box">
                            <ReactQuill
                                style={{height: "350px", width: "100%"}}
                                theme="snow"
                                modules={modules}
                                formats={formats}
                                placeholder="내용을 입력해주세요."
                                onChange={onContentHandler}
                            />
                        </div>
                        <br/><br/><br/>
                        <div className="file">
                            <div className="file_box">
                                <div {...getRootProps({ className: "dropzone" })}>
                                    <input {...getInputProps()} />
                                    <p>클릭 또는 파일을 여기에 드래그 해주세요.</p>
                                </div>
                            </div>
                            {
                                fileUpload.length !== 0
                                    ?<div className="file_list"><ul>{files}</ul></div>
                                    : null
                            }
                        </div>
                        <br/><br/>
                        <div className="post_write_button">
                            <button type="button" className="mbutton post_register_button" onClick={postWrite}>등록</button>
                            <button type="button" className="sbutton post_cancel_button" onClick={() => navigate('/')}>취소</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PostWrite;