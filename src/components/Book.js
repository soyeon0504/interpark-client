import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/book.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BtCate } from "../components/ui/buttons";

function Book() {
  // js 코드 자리
  const swiperRef = useRef();
  const [active, setActiveCategory] = useState("book1");
  const [htmlTag, setHtmlTag] = useState([]);
  const [jsonCategory, setJsonCategory] = useState("book1");

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
          const obj = result["book_" + (i + 1)];
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
    <section className="book common">
      <div className="book-inner c-inner">
        <div className="book-header c-header">
          <h2 className="book-title c-title">오늘의 도서</h2>
          <span className="book-txt c-txt">
            지금 읽기 딱 좋은 책, 놓치지 마세요!
          </span>
        </div>
        <div className="book-main c-main">
          <div className="book-cate c-cate">
            <ul className="book-list c-list">
              <li>
                <BtCate
                  focus={active === "book1"}
                  onClick={() => CategoryClick("book1")}
                >
                  MD`s Pick
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "book2"}
                  onClick={() => CategoryClick("book2")}
                >
                  배스트셀러
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "book3"}
                  onClick={() => CategoryClick("book3")}
                >
                  신간추천
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "book4"}
                  onClick={() => CategoryClick("book4")}
                >
                  특가할인
                </BtCate>
              </li>
            </ul>
          </div>
          <div className="book-slide-wrap">
            <Swiper
              slidesPerView={5}
              slidesPerGroup={5}
              spaceBetween={27}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation]}
              navigation={{
                nextEl: ".book-slide-next",
                prevEl: ".book-slide-prev",
              }}
              className="book-slide"
            >
              {htmlTag.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="book-slide-item">
                      <a href={item.url} className="book-link">
                        <div className="book-img">
                          <img src={item.file} alt={item.url} />
                        </div>
                        <div className="book-info">
                          <ul className="book-good-list">
                            <li>
                              <span className="book-good-info-title">
                                {item.title}
                              </span>
                            </li>
                            <li>
                              <p className="book-good-info-price">
                                <em>
                                  {item.price === 0
                                    ? ""
                                    : numberWithCommas(item.price)}
                                </em>
                                원
                              </p>
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
          <button className="book-slide-prev c-slide-prev"></button>
          <button className="book-slide-next c-slide-next"></button>
        </div>
        <div className="book-go c-go">
          <button className="go-home">도서 홈 바로가기</button>
        </div>
      </div>
    </section>
  );
}
export default Book;
