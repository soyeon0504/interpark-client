/* eslint-disable jsx-a11y/anchor-is-valid */
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "../styles/event.css";
import "../styles/common.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { InnerArea, SectionTag } from "./layout/layout";

function Event() {
  // js 코드 자리
  // JSX 의 요소를 React 에서 참조
  const swiperRef = useRef();
  // JSON 데이터 저장해 두고, 자료가 바뀌면 화면을 변경할
  // 리액트 변수를 만든다.
  const [htmlTag, setHtmlTag] = useState([]);

  // 외부 데이터 연동하기 (axios 이용)
  const axiosJsonData = () => {
    axios
      .get("event.json")
      .then(function (res) {
        console.log(res.data);

        const result = res.data;
        let arr = [];
        for (let i = 0; i < result.total; i++) {
          const obj = result["event_" + (i + 1)];
          arr[i] = obj;
        }
        console.log(arr);
        setHtmlTag(arr);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 외부 데이터 연동하기 (fetch 이용)
  const getJsonData = () => {
    fetch("event.json")
      .then((response) => {
        console.log("response : ", response);
        // 자료가 불러들여졌을 때
        return response.json();
      })
      .then((result) => {
        console.log("result : ", result);
        // 자료를 원하는데로 처리하겠다.
        // result를 화면에 출력하겠다.
        // 자료가 바뀌면 화면을 변경하는 기능을 생성하겠다.
        let arr = [];
        for (let i = 0; i < result.total; i++) {
          const obj = result["event_" + (i + 1)];
          arr[i] = obj;
        }
        console.log(arr);
        setHtmlTag(arr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // html 이 준비가 되면, json 을 불러들이겠다.
  // 1. 외부데이터 부르기 좋은 자리
  // 2. html 태그 참조 (useRef 할때 )
  // 3. window 참조할때
  // 4. window.addEventListener("scroll"...)
  // 5. cleanUp 할때 : 컴포넌트 화면에서 사라질때 실행할 함수
  // 6. 타이머 만들고, 제거할때.
  // 컴포넌트가 화면에 보여질 때 실행할 내용 기재 장소
  // use 는 Hook 이라고 합니다.
  // 원하는 시점을 감시하고 실행할 함수
  useEffect(() => {
    // 외부 데이터 불러들이기
    axiosJsonData();
    // getJsonData();
  }, []);

  return (
    <SectionTag pt={0} pb={90}>
      <InnerArea>
            <div className="event-header">
                <h2 className="event-title">이벤트</h2>
                <span className="event-txt">인터파크에서 할인혜택을 꼭 챙기세요.</span>
            </div>
            <div className="event-main"></div>

          <div className="event-slide-wrap">
            <Swiper
              slidesPerView={4}
              spaceBetween={28}
              slidesPerGroup={4}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation]}
              navigation={{
                nextEl: ".event-slide-wrap .slide-next-bt",
                prevEl: ".event-slide-wrap .slide-prev-bt",
              }}
              className="event-slide"
            >
              {htmlTag.map((item, index) => {
                return (
                  <SwiperSlide>
                    
                        <div className="swiper-slide">
                            <div className="event-slide-item">
                                    <a href="" className="event-link">
                                        <div className="event-image">
                                            <img src={item.image} alt="" />
                                        </div> 
                                    </a>
                                </div>
                        </div>
                    
                    
                  </SwiperSlide>
                );
              })
            }
            
            </Swiper>

            <button className="slide-prev-bt">
              <img src="images/slider_arrow.svg" alt="" />
            </button>
            <button className="slide-next-bt">
              <img src="images/slider_arrow.svg" alt="" />
            </button>
          </div>

        <div className="event-footer"></div>
      </InnerArea>
    </SectionTag>
  );
}
export default Event;