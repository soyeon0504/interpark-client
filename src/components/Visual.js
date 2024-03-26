import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "../styles/visual.css";
import { useEffect, useRef, useState } from "react";
// axios 모듈 가져오기
import axios from "axios";

function Visual() {
  // js 코드 자리
  // JSX 에 작성된 html 태그를 React 에서 참조
  // 1. swiper 슬라이드 태그를 참조한다.
  const swiperRef = useRef();

  // 외부 데이터 연동 ( axios 활용)
  const axiosGetData = function () {
    axios
      .get(
        `json/visual.json`
      )
      .then(function (res) {
        // console.log(res);
        makeVisualSlide(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let [visualHtml, setVisualHtml] = useState([]);

  const makeVisualSlide = (_data) => {
    const visualRes = _data;

    let visualArray = [];
    for (let i = 0; i < visualRes.total; i++) {
      visualArray[i] = visualRes["visual_" + (i + 1)];
    }
    // console.log(visualArray);
    setVisualHtml(visualArray);
  };

  useEffect(() => {
    // 랜더링 될때
    //  visual.json 데이터 불러들이기 기능실행
    axiosGetData();
    // fetchGetData();
    return () => {};
  }, []);

  return (
    <section className="visual">
      <div className="visual-inner">
        <Swiper
          slidesPerView={2}
          spaceBetween={24}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation]}
          loop={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          navigation={{
            nextEl: ".visual-slide-next",
            prevEl: ".visual-slide-prev",
          }}
          className="visual-slide"
        >
          {visualHtml.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="visual-slide-item">
                  <a href={item.url}>
                    <img
                      src={process.env.PUBLIC_URL + item.file}
                      alt={item.file}
                    />
                  </a>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <button className="visual-slide-prev c-slide-prev"></button>
        <button className="visual-slide-next c-slide-next"></button>
      </div>
    </section>
  );
}
export default Visual;
