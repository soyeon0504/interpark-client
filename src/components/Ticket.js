/* eslint-disable jsx-a11y/anchor-is-valid */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/ticket.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BtCate } from "../components/ui/buttons";

function Ticket() {
  // js 코드 자리
  const swiperRef = useRef();
  const [active, setActiveCategory] = useState("ticket1");
  const [htmlTag, setHtmlTag] = useState([]);
  const [jsonCategory, setJsonCategory] = useState("ticket1");

  const axiosJsonData = function (category) {
    axios
      .get(`json/${category}.json`)
      .then(function (res) {
        const result = res.data;
        let arr = [];
        for (let i = 0; i < result.total; i++) {
          const obj = result["ticket_" + (i + 1)];
          arr[i] = obj;
        }
        setHtmlTag(arr);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    axiosJsonData(jsonCategory); // JSON 데이터를 가져오는 함수

    if (swiperRef.current) {
      swiperRef.current.slideTo(0); // 첫 번째 슬라이드로 이동
    }
  }, [jsonCategory]); // jsonCategory가 변경될 때마다 실행

  const CategoryClick = (category) => {
    setActiveCategory(category);
    setJsonCategory(category); // JSON 카테고리를 업데이트
  };

  return (
    <section className="ticket common">
      <div className="ticket-inner c-inner">
        <div className="ticket-header c-header">
          <h2 className="ticket-title c-title">티켓 랭킹</h2>
          <span className="ticket-txt c-txt">오늘 뭐볼까? 지금 HOT한 공연</span>
        </div>
        <div className="ticket-main c-main">
          <div className="ticket-cate c-cate">
            <ul className="ticket-list c-list">
              <li>
                <BtCate
                  focus={active === "ticket1"}
                  onClick={() => CategoryClick("ticket1")}
                >
                  뮤지컬
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "ticket2"}
                  onClick={() => CategoryClick("ticket2")}
                >
                  콘서트
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "ticket3"}
                  onClick={() => CategoryClick("ticket3")}
                >
                  스포츠
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "ticket4"}
                  onClick={() => CategoryClick("ticket4")}
                >
                  전시/행사
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "ticket5"}
                  onClick={() => CategoryClick("ticket5")}
                >
                  클래식/무용
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "ticket6"}
                  onClick={() => CategoryClick("ticket6")}
                >
                  아동/가족
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "ticket7"}
                  onClick={() => CategoryClick("ticket7")}
                >
                  연극
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "ticket8"}
                  onClick={() => CategoryClick("ticket8")}
                >
                  래저/캠핑
                </BtCate>
              </li>
            </ul>
          </div>
          <div className="ticket-slide-wrap">
            <Swiper
              slidesPerView={4}
              slidesPerGroup={4}
              spaceBetween={28}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation]}
              navigation={{
                nextEl: ".ticket-slide-next",
                prevEl: ".ticket-slide-prev",
              }}
              className="ticket-slide"
            >
              {htmlTag.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    {index === htmlTag.length - 1 ? (
                      <div className="ticket-slide-item-btnmore">
                        <a href={item.url} className="ticket-link">
                          <i></i>
                          <p>전체보기</p>
                        </a>
                      </div>
                    ) : (
                      <div className="ticket-slide-item">
                        <a href={item.url} className="ticket-link">
                          <div className="ticket-img">
                            <img src={item.file} alt={item.url} />
                          </div>
                          <div className="ticket-info">
                            <div className="ticket-count">{item.count}</div>
                            <ul className="ticket-good-list">
                              <li className="ticket-good-info-title">
                                <span>{item.title}</span>
                              </li>
                              <li className="ticket-good-info-place">
                                <span>{item.place}</span>
                              </li>
                              <li className="ticket-good-info-duration">
                                <span>{item.duration}</span>
                              </li>
                              <li className="ticket-good-info-tag">
                                <span className={item.class}>{item.txt}</span>
                              </li>
                            </ul>
                          </div>
                        </a>
                      </div>
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <button className="ticket-slide-prev c-slide-prev"></button>
          <button className="ticket-slide-next c-slide-next"></button>
        </div>
        <div className="ticket-go c-go">
          <button className="go-home">티켓 홈 바로가기</button>
        </div>
      </div>
    </section>
  );
}
export default Ticket;
