import "../styles/footer.css";

function Footer() {
  // javaScript 코드 자리
  return (
    // html 코드 자리
    <footer className="footer">
      <div className="footer-top">
        <ul className="footer-list">
          <li>
            <button>회사소개</button>
            <div className="list-hover">
              <ul>
                <li>
                  <a href="#">인터파크트리플</a>
                </li>
                <li>
                  <a href="#">인터파크커머스</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="#">이용약관</a>
          </li>
          <li>
            <a href="#">개인정보 처리 방침</a>
          </li>
          <li>
            <a href="#">위치기반서비스 이용약관</a>
          </li>
          <li>
            <a href="#">여행약관</a>
          </li>
          <li>
            <a href="#">여행자 보험 가입안내</a>
          </li>
          <li>
            <a href="#">티켓판매안내 </a>
          </li>
          <li>
            <button>공지사항</button>
            <div className="list-hover">
              <ul>
                <li>
                  <a href="#">인터파크트리플</a>
                </li>
                <li>
                  <a href="#">인터파크커머스</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <button>고객센터</button>
            <div className="list-hover">
              <ul>
                <li>
                  <a href="#">투어 고객센터</a>
                </li>
                <li>
                  <a href="#">티켓 고객센터</a>
                </li>
                <li>
                  <a href="#">쇼핑 고객센터</a>
                </li>
                <li>
                  <a href="#">도서 고객센터</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <button>Language</button>
            <div className="list-hover">
              <ul>
                <li>
                  <a href="#">Korean</a>
                </li>
                <li>
                  <a href="#">English</a>
                </li>
                <li>
                  <a href="#">Japanese</a>
                </li>
                <li>
                  <a href="#">Chinese</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className="footer-inner">
        <div className="footer-info">
          <div className="footer-info-slide">
            <h2 className="footer-title">(주)인터파크트리플</h2>
            <div>
              <div className="footer-txt">
                <ul>
                  <li>서울시 강남구 삼성로 512 삼성동빌딩 10층</li>
                  <li>호스팅서비스제공자 (주)인터파크트리플</li>
                  <li>
                    사업자등록번호 824-81-02515
                    <a href="#" className="footer-blue">
                      사업자정보확인
                    </a>
                  </li>
                  <li>통신판매업신고 2022-서울강남-02179</li>
                  <li>관광사업증 등록번호 : 제2014-42호</li>
                  <li>대표이사 최휘영</li>
                </ul>
              </div>
              <div className="footer-notice">
                <p>
                  (주)인터파크트리플은 인터파크티켓, 인터파크투어의
                  통신판매중개자로서 통신판매의 당사자가 아니므로, 개별 <br />
                  판매자가 등록한 오픈마켓 상품에 대해서 (주)인터파크트리플은
                  일체 책임을 지지 않습니다.
                  <br />
                  Copyright ⓒ InterparkTriple Corp. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
          <div className="footer-info-slide">
            <h2>(주)인터파크커머스</h2>
            <div>
              <div className="footer-txt">
                <ul>
                  <li>서울시 서초구 강남대로 447(서초동, 남서울빌딩)</li>
                  <li className="txt2">
                    <span>호스팅서비스제공자 (주)인터파크커머스</span>
                    <span>대표이사 김동식</span>
                  </li>
                  <li>
                    사업자등록번호 422-81-03185
                    <a href="#" className="footer-blue">
                      사업자정보확인
                    </a>
                  </li>
                  <li>통신판매업신고 2023-서울서초-0823</li>
                </ul>
              </div>
              <div className="footer-notice">
                <p>
                  (주)인터파크커머스는 인터파크쇼핑, 인터파크도서의
                  통신판매중개자로서 통신판매의 당사자가 아니므로, 개별 <br />
                  판매자가 등록한 오픈마켓 상품에 대해서 주식회사
                  인터파크커머스는 일체 책임을 지지 않습니다.
                  <br />
                  Copyright ⓒ InterparkTriple Corp. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
