import React, {useState, useCallback} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropdown from './post_dropdown';
import './post_write.css';
import { useDropzone } from "react-dropzone"
import {getCookie} from "../cookie";

function PostUpdate(){
    const location = useLocation(); //navigate로 보낸 파라미터 가져오기 위해 사용
    const [title, setTitle] = useState(location.state.list.title); //제목
    let content = location.state.list.content //내용 (HTML 통째로 저장)
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
    const [dropdownValue, setDropdownValue] = useState(location.state.list.tag);
    const [fileUpload, setFileUpload] = useState([]);	//파일
    const [deletedFile, setDeletedFile] = useState([]); //삭제할 기존 파일
    const [files, setFiles] = useState(location.state.file);
    //const deletedFile = [];
    const navigate = useNavigate();

    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value);
    }
    const onContentHandler = (value) => {
        content = value;
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

    const postUpdate = useCallback(async () => {
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
        const formData = new FormData();
        [].forEach.call(fileUpload, (file) => {
            formData.append('fileList', file)
        })
        let data = {
            title: `${title}`,
            tag: `${dropdownValue}`,
            content: `${content}`,
            deletedFile: deletedFile
        };
        formData.append("data", JSON.stringify(data));

        await axios.patch(
            '/article/' + location.state.list._id,
            formData,
            {
                headers : {
                    "Content-Type": 'multipart/form-data'
                }
            })
            .then((res) => {
                alert("게시물이 수정되었습니다!");
            })
            .catch((e) => {
                console.log(e);
                if (e.response.data.message === "Unauthorized") {
                    alert("다시 로그인해주세요.");
                }
                else if (e.response.data.message === "No Permission") {
                    alert("공지사항 쓰기 권한이 없습니다.");
                }
            })
        //navigate('/');
    }, [fileUpload, title, dropdownValue, content])

    const onDrop = useCallback(acceptedFiles => {
        setFileUpload([...fileUpload, ...acceptedFiles])
    }, [fileUpload])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    })

    const removeFile = file => () => {
        console.log(file);
        if(file.originName){
            //setDeletedFile(deletedFile => [...deletedFile, file])
            deletedFile.push(file)
            const newFiles = [...files]
            newFiles.splice(newFiles.indexOf(file), 1)
            setFiles(newFiles)
        }else{
            const newFiles = [...fileUpload]
            newFiles.splice(newFiles.indexOf(file), 1)
            setFileUpload(newFiles)
        }
    }

    const beforeFilesList = files.map(file => (
        <li key={file.originName}>
            {file.originName}
            <button onClick={removeFile(file)}>x</button>
        </li>
    ))
    const newFileList = fileUpload.map(file => (
        <li key={file.path}>
            {file.path}
            <button onClick={removeFile(file)}>x</button>
        </li>
    ))

    return (
        <div className="viewSection">
            <div className='bodySection'>
                <div className="main">
                    <div className='box'>
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
                                style={{height: "350px", width: "100%"}}
                                theme="snow"
                                modules={modules}
                                formats={formats}
                                placeholder="내용을 입력해주세요."
                                onChange={onContentHandler}
                                value={content || ''}
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
                            <div className="file_list">
                                <ul>
                                {
                                    files.length !== 0
                                        ? <>{beforeFilesList}</>
                                        : null
                                }
                                {
                                    fileUpload.length !== 0
                                        ? <>{newFileList}</>
                                        : null
                                }
                                </ul>
                            </div>
                        </div>
                        <br/><br/>
                        <div className="post_write_button">
                            <button type="button" className="mbutton post_register_button" onClick={postUpdate}>등록</button>
                            <button type="button" className="sbutton post_cancel_button" onClick={() => navigate('/view/'+location.state._id)}>취소</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PostUpdate;