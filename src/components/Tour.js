import { Swiper, SwiperSlide } from "swiper/react"

import { Navigation } from 'swiper/modules';
import "../styles/tour.css";
import "../styles/common.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
function Tour(){
    //js 코드 자리
    //JSX 의 요소를 React 에서 참조
    const swiperRef = useRef();
    
    const [htmlTag, setHtmlTag] = useState([]);

    const axiosJsonData = () => {
        axios
        .get("tour.json")
        .then(function(res){
            console.log(res.data);
            let arr = [];
        for(let i = 0; i < res.data.total; i++) {
            const obj = res.data["tour_" + (i+ i)];
            arr[i] = obj;
        }    
        console.log(arr);
        setHtmlTag(arr);
        })
        .catch(function(error){
            console.log(error)
        });
    }
    // fetch("tour.json")
    useEffect(()=> {
        axiosJsonData();
    }, [])
    return (
        <section class="tour">
                <div class="tour-inner">
                    <div class="tour-header">
                        <h2 class="tour-title">투어 특가</h2>
                        <span class="tour-txt">해외여행은 인터파크다</span>
                    </div>
                    <div class="tour-main">
                        <div class="tour-category">
                            <ul class="tour-list">
                                <li>
                                    <button class="tour-cate-bt tour-cate-bt-active">망설이면 품절</button>
                                </li>
                                <li>
                                    <button class="tour-cate-bt">패키지</button>
                                </li>
                                <li>
                                    <button class="tour-cate-bt">국내숙소</button>
                                </li>
                                <li>
                                    <button class="tour-cate-bt">해외숙소</button>
                                </li>
                            </ul>
                        </div>
                        <div class="tour-slide-wrap">
                        {/* <!-- Swiper --> */}
                        <Swiper 
                    slidesPerView={3} 
                    spaceBetween={26} 
                    slidesPerGroup={3} 
                    onSwiper={(swiper)=>{
                        swiperRef.current= swiper;
                    }}
                    modules={[Navigation]} 
                    navigation={{
                        nextEl: ".tour-slide-wrap .slide-next-bt",
                        prevEl: ".tour-slide-wrap .slide-prev-bt",
                    }}
                    className="tour-slide">

                    {
                      htmlTag.map((item, index) => {
                        return(
                          <SwiperSlide key={index}>
                            {
                              (index === htmlTag.length - 1) ? (<a href={item.url}>바로가기</a>) : (
                                <div class="swiper-slide">
                                <div class="tour-slide-item">
                                  <a href={item.url} class="tour-link">
                                    <div class="tour-img">
                                      <img src={item.image} alt={item.desc} />
                                    </div>
                                    <div class="tour-state">${item.state}</div>
                                    <div class="tour-info">
                                      <ul class="tour-good-list">
                                        <li>
                                            <span class="tour-good-info-title">
                                                <div>${item.title}</div>
                                            </span>
                                            <p class="tour-good-info-desc">
                                            ${item.desc}
                                            </p>
                                        </li>
                                        <li>
                                          <span class="tour-good-info-price">
                                          <em>${item.price}</em>
                                          원~
                                          </span>
                                        </li>
                                      </ul>
                                    </div>
                                  </a>
                                </div>
                                </div>
                              )
                            }
                            
                          </SwiperSlide>
                        )
                      })
                    }
                    </Swiper>
                        <button class="slide-prev-bt">
                            <img src="images/slider_arrow.svg" alt=""/>
                        </button>
                        <button class="slide-next-bt">
                            <img src="images/slider_arrow.svg" alt=""/>
                        </button>
                         {/* <!-- //투어 특가 슬라이드 --> */}
                        </div>
                    </div>
                </div>
                <div>
                    <div class="tour-footer">
                        <button class="tour-footer-bt">투어 홈 바로가기
                            <img src="images/icon_arrow.svg" alt=""/>
                        </button>
                    </div>
                </div>
    </section>
    )
}

export default Tour;