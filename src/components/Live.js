import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/live.css";
import { useEffect, useRef, useState } from "react";

function Live() {
  // js 코드 자리
  const swiperRef = useRef();

  const numberWithCommas = (str) => {
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getJsonData = () => {
    fetch("json/live.json")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        // console.log("result : ", result);
        let arr = [];
        for (let i = 0; i < result.total; i++) {
          const obj = result["live_" + (i + 1)];
          arr[i] = obj;
        }
        // console.log(arr);
        setHtmlTag(arr);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  let [htmlTag, setHtmlTag] = useState([]);

  useEffect(() => {
    getJsonData();
    return () => {};
  }, []);

  return (
    <section className="live common">
      <div className="live-inner c-inner">
        <div className="live-header c-header">
          <h2 className="live-title c-title">
            <img src="./images/title_live.svg" alt="" />
          </h2>
        </div>
        <div className="live-main c-main">
          <div className="live-slide-wrap">
            <Swiper
              slidesPerView={4}
              slidesPerGroup={4}
              spaceBetween={26}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation]}
              navigation={{
                nextEl: ".live-slide-next",
                prevEl: ".live-slide-prev",
              }}
              className="live-slide"
            >
              {htmlTag.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    {item.live_preparing.preparing_image === "" ? (
                      <div className="live-slide-item">
                        <a href={item.live_info.url} className="live-link">
                          <div className={item.live_info.door}>
                            <img
                              src={item.live_info.image}
                              alt={item.live_info.url}
                            />
                          </div>
                          <ul className="live-info">
                            <li>
                              <i>{item.live_info.state}</i>
                            </li>
                            <li>
                              <span className="live-info-title">
                                {item.live_info.title}
                              </span>
                            </li>
                          </ul>
                          <div className="live-day">
                            <ul>
                              <li>
                                <span className="live-day-date">
                                  {item.live_day.date}
                                </span>
                              </li>
                              <li>
                                <span className="live-day-time">
                                  {item.live_day.time}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </a>
                        <a
                          href={item.live_product.product_url}
                          className="live-product"
                        >
                          <div className={item.live_product.product_class}>
                            <img
                              src={
                                item.live_product.product_image === ""
                                  ? ""
                                  : item.live_product.product_image
                              }
                              alt={item.live_product.product_url}
                            />
                          </div>
                          <ul className="live-product-info">
                            <li>
                              <span className="live-product-title">
                                {item.live_product.product_title}
                              </span>
                            </li>
                            <li>
                              <span className="live-product-discount">
                                <em>
                                  {item.live_product.product_discount === ""
                                    ? ""
                                    : item.live_product.product_discount + "%"}
                                </em>
                              </span>
                              <span className="live-product-price">
                                <em>
                                  {item.live_product.product_price === ""
                                    ? ""
                                    : numberWithCommas(
                                        item.live_product.product_price
                                      )}
                                </em>
                                {item.live_product.product_dollar === ""
                                  ? ""
                                  : item.live_product.product_dollar}
                              </span>
                            </li>
                          </ul>
                        </a>
                      </div>
                    ) : (
                      <div className="live-slide-item live-preparing">
                        <a
                          href={item.live_preparing.preparing_url}
                          className="live-preparing-link"
                        >
                          <ul className="live-preparing-info">
                            <li className="preparing-img">
                              <img
                                src={item.live_preparing.preparing_image}
                                alt={item.live_preparing.preparing_url}
                              />
                            </li>
                            <li>
                              <p className="preparing-txt">
                                {item.live_preparing.preparing_txt}
                              </p>
                            </li>
                            <li>
                              <span className="preparing-btn">
                                {item.live_preparing.preparing_btn}
                              </span>
                            </li>
                          </ul>
                        </a>
                      </div>
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <button className="live-slide-prev c-slide-prev"></button>
          <button className="live-slide-next c-slide-next"></button>
        </div>
        <div className="live-go c-go">
          <button className="go-home">인터파크 라이브 바로가기</button>
        </div>
      </div>
    </section>
  );
}
export default Live;
