import { BtCate } from "../components/ui/buttons";
import { Swiper, SwiperSlide } from "swiper/react"

import { Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";

import "../styles/book.css";
import "../styles/common.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { InnerArea, SectionTag } from "./layout/layout";

function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function Book(){
    //js 코드 자리
    //JSX 의 요소를 React 에서 참조
    const swiperRef = useRef();
    
    const [htmlTag, setHtmlTag] = useState([]);

    const axiosJsonData = () => {
        axios
        .get("book.json")
        .then(function(res){
            console.log(res.data);

            const result = res.data;    
            let arr = [];
            for(let i = 0; i < result.total; i++) {
                const obj = res.data["book_" + (i+ 1)];
                
                arr[i] = obj;
            }    
            console.log(arr);
            setHtmlTag(arr);
        })
        .catch(function(error){
            console.log(error)
        });
    }
    // axios ("book.json")
    useEffect(()=> {
        axiosJsonData();
    }, [])
    return (
        <SectionTag pt={0} pb={90}>
                <InnerArea>
                <div className="book-header">
                        <h2 className="book-title">오늘의 도서</h2>
                        <span className="book-txt">지금 읽기 딱 좋은 책, 놓치지 마세요!</span>
                    </div>
                    <div className="book-main">
                        <div className="book-category">
                            <ul className="book-list">
                                <li>
                                    <BtCate active={true}>MD's Pick</BtCate>
                                </li>
                                <li>
                                    <BtCate>베스트셀러</BtCate>
                                </li>
                                <li>
                                    <BtCate>신간추천</BtCate>
                                </li>
                                <li>
                                    <BtCate>특가할인</BtCate>
                                </li>
                            </ul>
                        </div>
                        <div className="book-slide-wrap">
                        {/* <!-- Swiper --> */}
                        <Swiper 
                    slidesPerView={5} 
                    spaceBetween={28} 
                    slidesPerGroup={5} 
                    onSwiper={(swiper)=>{
                        swiperRef.current= swiper;
                    }}
                    modules={[Navigation]} 
                    navigation={{
                        nextEl: ".book-slide-wrap .slide-next-bt",
                        prevEl: ".book-slide-wrap .slide-prev-bt",
                    }}
                    className="book-slide">

                    {htmlTag.map((item, index) => {
                        return(
                          <SwiperSlide key={index}>
                            {index === htmlTag.length - 1 ? (
                                <a href={item.url}>바로가기</a>
                                ) : (
                                    <div className="swiper-slide">
                                        <div className="book-slide-item">
                                          <a href={item.url} class="book-link">
                                            <div className="book-img">
                                              <img src={item.image} alt={item.desc} />
                                            </div>
                                            <div className="book-info">
                                              <ul className="book-good-list">
                                                <li>
                                                    <p className="book-good-info-desc">
                                                    {item.desc}
                                                    </p>
                                                </li>
                                                <li>
                                                  <span className="book-good-info-price">
                                                  <em>{numberWithCommas(item.price)}</em>
                                                  원
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
                         {/* <!-- //오늘의 도서 슬라이드 --> */}
                        </div>
                    </div>

                    <div>
                    <div className="book-footer">
                        <button className="book-footer-bt">투어 홈 바로가기
                            <img src="images/icon_arrow.svg" alt=""/>
                        </button>
                    </div>
                </div>
                </InnerArea>
    </SectionTag>
    )
}

export default Book;