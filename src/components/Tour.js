
import { BtCate } from "../components/ui/buttons";
import { Swiper, SwiperSlide } from "swiper/react"

import { Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";

import "../styles/tour.css";
import "../styles/common.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { InnerArea, SectionTag } from "./layout/layout";

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

            const result = res.data;    
            let arr = [];
            for(let i = 0; i < result.total; i++) {
                const obj = res.data["tour_" + (i+ 1)];
                
                arr[i] = obj;
            }    
            console.log(arr);
            setHtmlTag(arr);
        })
        .catch(function(error){
            console.log(error)
        });
    }
    // axios ("tour.json")
    useEffect(()=> {
        axiosJsonData();
    }, [])
    return (
        <SectionTag pt={0} pb={90}>
                <InnerArea>
                    <div className="tour-header">
                        <h2 className="tour-title">투어 특가</h2>
                        <span className="tour-txt">해외여행은 인터파크다</span>
                    </div>
                    <div className="tour-main">
                        <div className="tour-category">
                            <ul className="tour-list">
                                <li>
                                    <BtCate active={true}>망설이면 품절</BtCate>
                                </li>
                                <li>
                                    <BtCate>패키지</BtCate>
                                </li>
                                <li>
                                    <BtCate>국내숙소</BtCate>
                                </li>
                                <li>
                                    <BtCate>해외숙소</BtCate>
                                </li>
                            </ul>
                        </div>
                        <div className="tour-slide-wrap">
                        {/* <!-- Swiper --> */}
                        <Swiper 
                    slidesPerView={3} 
                    spaceBetween={28} 
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

                    {htmlTag.map((item, index) => {
                        return(
                          <SwiperSlide key={index}>
                            {index === htmlTag.length - 1 ? (
                                <a href={item.url}>바로가기</a>
                                ) : (
                                <div className="swiper-slide">
                                    <div className="tour-slide-item">
                                  <a href={item.url} className="tour-link">
                                    <div className="tour-img">
                                      <img src={item.image} alt={item.desc} />
                                    </div>
                                    <div className="tour-state">{item.state}</div>
                                    <div className="tour-info">
                                      <ul className="tour-good-list">
                                        <li>
                                            <span className="tour-good-info-title">
                                                <div>{item.title}</div>
                                            </span>
                                            <p className="tour-good-info-desc">
                                            {item.desc}
                                            </p>
                                        </li>
                                        <li>
                                          <span className="tour-good-info-price">
                                          <em>{item.price}</em>
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
                        );
                      })}
                    </Swiper>

                        <button className="slide-prev-bt">
                            <img src="images/slider_arrow.svg" alt=""/>
                        </button>
                        <button className="slide-next-bt">
                            <img src="images/slider_arrow.svg" alt=""/>
                        </button>
                         {/* <!-- //투어 특가 슬라이드 --> */}
                        </div>
                    </div>

                    <div>
                    <div className="tour-footer">
                        <button className="tour-footer-bt">투어 홈 바로가기
                            <img src="images/icon_arrow.svg" alt=""/>
                        </button>
                    </div>
                </div>
                </InnerArea>
    </SectionTag>
    )
}

export default Tour;