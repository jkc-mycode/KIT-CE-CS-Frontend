import React from "react";
import "./about.css";
import "./boardlist.css";
import BoardRow from "./boardrow";
import BoardFooter from "./boardlist_footer";

function About() {
  return (
    <>
      <div className="viewSection">
        <div className="bodySection">
          <div className="main">
            <div className="box">
              <div className="boxTitle">&#xE001;_ 도움말</div>
              <br />
              <div className="content">
                <h2>「 ACS 」 금오공과대학교 IT 커뮤니티</h2>
                <br />
                <h3>소개</h3>
                <ul className="ul_1">
                  <li>
                    ㆍ본 커뮤니티는 금오공과대학교 재학생, 졸업생들의 IT 관련
                    정보 공유 및 친목 도모를 위해 제작되었습니다.
                  </li>
                  <br />
                  <li>
                    ㆍ커뮤니티 이름인 'ACS'는 본교 IT 관련 학과인
                    인공지능공학과(AI), 컴퓨터공학과(CE),
                    컴퓨터소프트웨어공학과(SE)의 영문 약자 첫 글자에서
                    유래되었습니다.
                  </li>
                  <br />
                  <li>
                    ㆍIT 관련 학과 재학생들뿐만 아니라, 컴퓨터공학에 관심 있는
                    모든 학생들간의 정보 공유 및 교류를 통해 학업 역량 증진과
                    취업에 도움이 될 수 있기를 바랍니다.
                  </li>
                  <br />
                </ul>
                <br />
                <h3>이용 방법</h3>
                <ul className="ul_1">
                  <li>
                    ㆍ본 커뮤니티의 원활한 사용을 위해 본교 웹메일 인증을 통한
                    회원가입이 필요합니다.
                  </li>
                  <br />
                  <li>
                    ㆍ회원가입을 성공적으로 마치면 글쓰기 버튼을 통해 자유롭게
                    게시글/댓글 작성이 가능합니다.
                  </li>
                  <br />
                  <li>
                    ㆍ공지사항 게시판은 각 학과 교직원/학생회/동아리임원에
                    한하여 권한 상승 후 게시글 작성이 가능합니다. (페이지 하단
                    이메일로 연락주시면 인증 후 권한이 부여됩니다.)
                  </li>
                  <br />
                  <li>
                    ㆍ자유게시판에는 자유롭게 게시글을 작성하실 수 있으며,
                    학업게시판에는 학업질문/스터디모집/프로젝트구인/대외활동
                    등의 글을 작성하실 수 있습니다.
                  </li>
                  <br />
                  <li>
                    ㆍ각 게시판 우측에는 IT 관련 학과의 학과 소식들이 실시간으로
                    업데이트되며, 클릭하여 바로가기가 가능합니다.
                  </li>
                  <br />
                  <li>
                    ㆍ부적절한 게시글과 댓글은 신고 버튼을 통해 사유에 맞게
                    신고해주시면 운영진이 검토 후 삭제할 예정입니다.
                  </li>
                  <br />
                  <li>
                    ㆍ작성한 게시글은 로그인 후 우측 상단 마이페이지에서
                    확인이 가능하며, 상단의 검색 기능을 통해 게시판별로 원하는 키워드를
                    검색하실 수 있습니다.
                  </li>
                  <br />
                  <li>
                    ㆍ커뮤니티 이용 중 발생하는 오류 및 문의는 페이지 하단
                    운영진 이메일로 연락주시면 신속하게 처리하도록 하겠습니다.
                  </li>
                </ul>
              </div>
            </div>
            <div className="box">
              <div className="boxTitle">&#xE001;_ 운영 및 제작</div>
              <br />
              <div className="content">
                <div className="block">
                  <div className="block_inner">
                    <h3>Project Manager</h3>
                    <ul class="ul_1">
                      <li>컴퓨터공학과 - 20' 서준혁</li>
                      <br />
                      <li>컴퓨터소프트웨어공학과 -<br /> 16' 김현진</li>
                    </ul>
                  </div>
                  <div className="block_inner">
                    <h3>Backend Developer</h3>
                    <ul class="ul_1">
                      <li>컴퓨터공학과 - 18' 박준수</li>
                      <br />
                      <li>컴퓨터공학과 - 20' 김원렬</li>
                      <br />
                      <li>컴퓨터공학과 - 20' 김혜진</li>
                    </ul>
                  </div>
                  <div className="block_inner">
                    <h3>Frontend Developer</h3>
                    <ul class="ul_1">
                      <li>컴퓨터공학과 - 20' 김정찬</li>
                      <br />
                      <li>컴퓨터공학과 - 22' 장성진</li>
                      <br />
                      <li>컴퓨터소프트웨어공학과 -<br /> 20' 나영준</li>
                    </ul>
                  </div>
                  <div className="block_inner">
                    <h3>Security Manager</h3>
                    <ul class="ul_1">
                      <li>컴퓨터공학과 - 17' 김형준</li>
                      <br />
                      <li>컴퓨터공학과 - 19' 이근탁</li>
                    </ul>
                  </div>
                </div>
                <br/>
                <h3>참고</h3>
                <ul class="ul_1">
                    <li>
                        ㆍ본 커뮤니티는 2022년도 컴퓨터공학과 학술 동아리 '셈틀꾼'에서 진행된 프로젝트입니다.
                    </li>
                    <br/>
                    <li>
                        ㆍ커뮤니티 이용 중 발생하는 사건/사고의 모든 책임은 이용 당사자에게 있습니다.
                    </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
