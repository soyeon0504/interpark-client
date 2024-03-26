import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/tour.css";
import axios from "axios";
import { BtCate } from "../components/ui/buttons";

function Tour() {
  const swiperRef = useRef();
  const [active, setActiveCategory] = useState("tour1");
  const [htmlTag, setHtmlTag] = useState([]);
  const [jsonCategory, setJsonCategory] = useState("tour1");

  const numberWithCommas = (str) => {
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const axiosJsonData = function (category) {
    axios
      .get(`json/${category}.json`)
      .then(function (res) {
        const result = res.data;
        let arr = [];
        for (let i = 0; i < result.total; i++) {
          const obj = result["tour_" + (i + 1)];
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
    <section className="tour common">
      <div className="tour-inner c-inner">
        <div className="tour-header c-header">
          <h2 className="tour-title c-title">투어 특가</h2>
          <span className="tour-txt c-txt">해외여행은 인터파크다</span>
        </div>
        <div className="tour-main c-main">
          <div className="tour-cate c-cate">
            <ul className="tour-list c-list">
              <li>
                <BtCate
                  focus={active === "tour1"}
                  onClick={() => CategoryClick("tour1")}
                >
                  망설이면 품절
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "tour2"}
                  onClick={() => CategoryClick("tour2")}
                >
                  패키지
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "tour3"}
                  onClick={() => CategoryClick("tour3")}
                >
                  국내숙소
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "tour4"}
                  onClick={() => CategoryClick("tour4")}
                >
                  해외숙소
                </BtCate>
              </li>
            </ul>
          </div>
          <div className="tour-slide-wrap">
            <Swiper
              slidesPerView={3}
              slidesPerGroup={3}
              spaceBetween={26}
              modules={[Navigation]}
              navigation={{
                nextEl: ".tour-slide-next",
                prevEl: ".tour-slide-prev",
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {htmlTag.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="tour-slide-item">
                      <a href={item.url} className="tour-link">
                        <div className="tour-img">
                          <img src={item.file} alt={item.url} />
                        </div>
                        <div className="tour-info">
                          <ul className="tour-good-list">
                            <li>
                              <span className="tour-box">{item.box}</span>
                            </li>
                            <li>
                              <p className="tour-p-blue">{item.blue}</p>
                            </li>
                            <li>
                              <p>{item.p}</p>
                            </li>
                            <li>
                              <span className="tour-good-info-price">
                                <em>
                                  {item.price === 0
                                    ? ""
                                    : numberWithCommas(item.price)}
                                </em>
                                원~
                              </span>
                            </li>
                          </ul>
                        </div>
                      </a>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <button className="tour-slide-prev c-slide-prev"></button>
          <button className="tour-slide-next c-slide-next"></button>
        </div>
        <div className="tour-go c-go">
          <button className="go-home">투어 홈 바로가기</button>
        </div>
      </div>
    </section>
  );
}
export default Tour;
