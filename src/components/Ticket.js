
import { BtCate } from "../components/ui/buttons";
import { Swiper, SwiperSlide } from "swiper/react"

import { Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";

import "../styles/ticket.css";
import "../styles/common.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { InnerArea, SectionTag } from "./layout/layout";

function Ticket(){
    //js 코드 자리
    //JSX 의 요소를 React 에서 참조
    const swiperRef = useRef();
    
    const [htmlTag, setHtmlTag] = useState([]);

    const axiosJsonData = () => {
        axios
        .get("ticket.json")
        .then(function(res){
            console.log(res.data);

            const result = res.data;    
            let arr = [];
            for(let i = 0; i < result.total; i++) {
                const obj = res.data["ticket_" + (i+ 1)];
                
                arr[i] = obj;
            }    
            console.log(arr);
            setHtmlTag(arr);
        })
        .catch(function(error){
            console.log(error)
        });
    }
    // axios ("ticket.json")
    useEffect(()=> {
        axiosJsonData();
    }, [])
    return (
        <SectionTag pt={0} pb={90}>
                <InnerArea>
                <div className="ticket-header">
                        <h2 className="ticket-title">티켓 랭킹</h2>
                        <span className="ticket-txt">오늘 뭐볼까? 지금 HOT한 공연</span>
                    </div>
                    <div className="ticket-main">
                        <div className="ticket-category">
                            <ul className="ticket-list">
                                <li>
                                    <BtCate active={true}>뮤지컬</BtCate>
                                </li>
                                <li>
                                    <BtCate>콘서트</BtCate>
                                </li>
                                <li>
                                    <BtCate>스포츠</BtCate>
                                </li>
                                <li>
                                    <BtCate>전시/행사</BtCate>
                                </li>
                                <li>
                                    <BtCate>클래식/무용</BtCate>
                                </li>
                                <li>
                                    <BtCate>아동/가족</BtCate>
                                </li>
                                <li>
                                    <BtCate>연극</BtCate>
                                </li>
                                <li>
                                    <BtCate>레저/캠핑</BtCate>
                                </li>
                            </ul>
                        </div>
                    </div>
                        <div className="ticket-slide-wrap">
                        {/* <!-- Swiper --> */}
                        <Swiper 
                    slidesPerView={4} 
                    spaceBetween={28} 
                    slidesPerGroup={4} 
                    onSwiper={(swiper)=>{
                        swiperRef.current= swiper;
                    }}
                    modules={[Navigation]} 
                    navigation={{
                        nextEl: ".ticket-slide-wrap .slide-next-bt",
                        prevEl: ".ticket-slide-wrap .slide-prev-bt",
                    }}
                    className="ticket-slide">

                    {htmlTag.map((item, index) => {
                        return(
                          <SwiperSlide key={index}>
                            {index === htmlTag.length - 1 ? (
                                <a href={item.url}>바로가기</a>
                                ) : (
                                    <div className="swiper-slide">
                                    <div className="ticket-slide-item">
                                      <a href={item.url} className="ticket-link">
                                        <div className="ticket-img">
                                          <img src={item.image} alt={item.desc}/>
                                          <div className="ticket-number">{item.number}</div>
                                        </div>
                                        <div className="ticket-info">
                                          <ul className="ticket-good-list">
                                            <li>
                                                <span className="ticket-good-info-title">
                                                    <div>{item.title}</div>
                                                </span>
                                                <p className="ticket-good-info-place">
                                                {item.place}
                                                </p>
                                            </li>
                                            <li>
                                              <span className="ticket-good-info-period">
                                                {item.period}
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

                    <div>
                    <div className="ticket-footer">
                        <button className="ticket-footer-bt">투어 홈 바로가기
                            <img src="images/icon_arrow.svg" alt=""/>
                        </button>
                    </div>
                </div>
                </InnerArea>
    </SectionTag>
    )
}

export default Ticket;