import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Sell= () => {
    const navigate = useNavigate();

    const [days, setDays] = React.useState(0);
    const [hours, setHours] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);

    const deadline = "July, 10, 2023";

    const getTime = () => {
        const time = Date.parse(deadline) - Date.now();    

        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    };

    React.useEffect(() => {
        const interval = setInterval(() => getTime(deadline), 1000);

        return () => clearInterval(interval);
    }, []);

    var auctionSlider = {
        dots: true,
        infinite: false,
        arrows:false,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1365,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2
              }
            },
            {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1
                }
              }
          ]
    };

    var topSellerSlider = {
        dots: false,
        infinite: false,
        arrows:true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 9,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: 8
              }
            },
            {
              breakpoint: 1199,
              settings: {
                slidesToShow: 6
              }
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 4
              }
            },
            {
                breakpoint: 767,
                settings: {
                  slidesToShow: 3
                }
              },
              {
                breakpoint: 575,
                settings: {
                  slidesToShow: 3
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 2
                }
              },
          ]
    };

    return(
    <>
        <Header />
        <div className='top-wrap'>
            <section className="banner sell">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="banner-content">
                                <h1>Discover, find <span> Sell extraordinary </span> Monster NFTs</h1>

                                <p>Marketplace for monster character cllections non fungible token NFTs</p>

                                <div className="btn-wrap">
                                    <a className="common-btn">
                                        <img src="./images/rocket.png" alt="" />
                                        Explore
                                    </a>

                                    <a className="common-btn white">
                                        <img src="./images/create.png" alt="" />
                                        <img className="white" src="./images/create-white.png" alt="" />
                                        Create
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6">
                            <div className="img-wrap">
                                <img src="./images/banner-graphic.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="auctions picks sell">
                <div className="container">
                    <div className="main-head">
                        <h2>Live Auctions</h2>

                        <a className="gradient-line">
                            Explore more
                        </a>
                    </div>

                    <div className="auction-slider-wrapper">
                        <Slider {...auctionSlider}>

                            <div>
                                <div className="collection-box">
                                    <div className="img-wrap">
                                        <img src="./images/collection-img.png" alt="" />

                                        <div className="likes">
                                            <img src="./images/likes.svg" alt="" />100
                                        </div>
                                        
                                        <a href="#" className="common-btn white">
                                        <img src="./images/bag.png" alt="" />
                                        <img className="white" src="./images/bag-white.png" alt="" />
                                        Place Bid
                                        </a>

                                        <div className="timer">
                                            <img src="./images/axies-small-icon.png" alt="" />
                                            <p id="day">{days}<span>:</span></p>
                                            <p  id="hour">{hours}<span>:</span></p>
                                            <p id="minute">{minutes}<span>:</span></p>
                                            <p id="second">{seconds}</p>
                                        </div>
                                    </div>

                                    <div className="content">
                                        <h3>"Hamlet Contemplates Yorick's...</h3>

                                        <div className="creator-wrap">
                                            <div className="left">
                                                <img src="./images/collection-img.png" alt="" />

                                                <div className="creator-info">
                                                    <span>Creator</span>

                                                    <h4>SalvadorDali</h4>
                                                </div>
                                            </div>

                                            <div className="protocol">
                                                BSC
                                            </div>
                                        </div>

                                        <div className="bid-price">
                                            <div className="left">
                                                <span>Current Bid</span>

                                                <h4>4.89 ETH<span>=$12.246</span></h4>
                                            </div>

                                            <a href="#">
                                                <img src="./images/history-icon.png" alt="" />
                                                View History     
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="collection-box">
                                    <div className="img-wrap">
                                        <img src="./images/collection-img.png" alt="" />

                                        <div className="likes">
                                            <img src="./images/likes.svg" alt="" />100
                                        </div>
                                        
                                        <a href="#" className="common-btn white">
                                        <img src="./images/bag.png" alt="" />
                                        <img className="white" src="./images/bag-white.png" alt="" />
                                        Place Bid
                                        </a>

                                        <div className="timer">
                                            <img src="./images/axies-small-icon.png" alt="" />
                                            <p id="day">{days}<span>:</span></p>
                                            <p  id="hour">{hours}<span>:</span></p>
                                            <p id="minute">{minutes}<span>:</span></p>
                                            <p id="second">{seconds}</p>
                                        </div>
                                    </div>

                                    <div className="content">
                                        <h3>"Hamlet Contemplates Yorick's...</h3>

                                        <div className="creator-wrap">
                                            <div className="left">
                                                <img src="./images/collection-img.png" alt="" />

                                                <div className="creator-info">
                                                    <span>Creator</span>

                                                    <h4>SalvadorDali</h4>
                                                </div>
                                            </div>

                                            <div className="protocol">
                                                BSC
                                            </div>
                                        </div>

                                        <div className="bid-price">
                                            <div className="left">
                                                <span>Current Bid</span>

                                                <h4>4.89 ETH<span>=$12.246</span></h4>
                                            </div>

                                            <a href="#">
                                                <img src="./images/history-icon.png" alt="" />
                                                View History     
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="collection-box">
                                    <div className="img-wrap">
                                        <img src="./images/collection-img.png" alt="" />

                                        <div className="likes">
                                            <img src="./images/likes.svg" alt="" />100
                                        </div>
                                        
                                        <a href="#" className="common-btn white">
                                        <img src="./images/bag.png" alt="" />
                                        <img className="white" src="./images/bag-white.png" alt="" />
                                        Place Bid
                                        </a>

                                        <div className="timer">
                                            <img src="./images/axies-small-icon.png" alt="" />
                                            <p id="day">{days}<span>:</span></p>
                                            <p  id="hour">{hours}<span>:</span></p>
                                            <p id="minute">{minutes}<span>:</span></p>
                                            <p id="second">{seconds}</p>
                                        </div>
                                    </div>

                                    <div className="content">
                                        <h3>"Hamlet Contemplates Yorick's...</h3>

                                        <div className="creator-wrap">
                                            <div className="left">
                                                <img src="./images/collection-img.png" alt="" />

                                                <div className="creator-info">
                                                    <span>Creator</span>

                                                    <h4>SalvadorDali</h4>
                                                </div>
                                            </div>

                                            <div className="protocol">
                                                BSC
                                            </div>
                                        </div>

                                        <div className="bid-price">
                                            <div className="left">
                                                <span>Current Bid</span>

                                                <h4>4.89 ETH<span>=$12.246</span></h4>
                                            </div>

                                            <a href="#">
                                                <img src="./images/history-icon.png" alt="" />
                                                View History     
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="collection-box">
                                    <div className="img-wrap">
                                        <img src="./images/collection-img.png" alt="" />

                                        <div className="likes">
                                            <img src="./images/likes.svg" alt="" />100
                                        </div>
                                        
                                        <a href="#" className="common-btn white">
                                        <img src="./images/bag.png" alt="" />
                                        <img className="white" src="./images/bag-white.png" alt="" />
                                        Place Bid
                                        </a>

                                        <div className="timer">
                                            <img src="./images/axies-small-icon.png" alt="" />
                                            <p id="day">{days}<span>:</span></p>
                                            <p  id="hour">{hours}<span>:</span></p>
                                            <p id="minute">{minutes}<span>:</span></p>
                                            <p id="second">{seconds}</p>
                                        </div>
                                    </div>

                                    <div className="content">
                                        <h3>"Hamlet Contemplates Yorick's...</h3>

                                        <div className="creator-wrap">
                                            <div className="left">
                                                <img src="./images/collection-img.png" alt="" />

                                                <div className="creator-info">
                                                    <span>Creator</span>

                                                    <h4>SalvadorDali</h4>
                                                </div>
                                            </div>

                                            <div className="protocol">
                                                BSC
                                            </div>
                                        </div>

                                        <div className="bid-price">
                                            <div className="left">
                                                <span>Current Bid</span>

                                                <h4>4.89 ETH<span>=$12.246</span></h4>
                                            </div>

                                            <a href="#">
                                                <img src="./images/history-icon.png" alt="" />
                                                View History     
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="collection-box">
                                    <div className="img-wrap">
                                        <img src="./images/collection-img.png" alt="" />

                                        <div className="likes">
                                            <img src="./images/likes.svg" alt="" />100
                                        </div>
                                        
                                        <a href="#" className="common-btn white">
                                        <img src="./images/bag.png" alt="" />
                                        <img className="white" src="./images/bag-white.png" alt="" />
                                        Place Bid
                                        </a>

                                        <div className="timer">
                                            <img src="./images/axies-small-icon.png" alt="" />
                                            <p id="day">{days}<span>:</span></p>
                                            <p  id="hour">{hours}<span>:</span></p>
                                            <p id="minute">{minutes}<span>:</span></p>
                                            <p id="second">{seconds}</p>
                                        </div>
                                    </div>

                                    <div className="content">
                                        <h3>"Hamlet Contemplates Yorick's...</h3>

                                        <div className="creator-wrap">
                                            <div className="left">
                                                <img src="./images/collection-img.png" alt="" />

                                                <div className="creator-info">
                                                    <span>Creator</span>

                                                    <h4>SalvadorDali</h4>
                                                </div>
                                            </div>

                                            <div className="protocol">
                                                BSC
                                            </div>
                                        </div>

                                        <div className="bid-price">
                                            <div className="left">
                                                <span>Current Bid</span>

                                                <h4>4.89 ETH<span>=$12.246</span></h4>
                                            </div>

                                            <a href="#">
                                                <img src="./images/history-icon.png" alt="" />
                                                View History     
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>

                
            </section>
        </div>

        <section className="top-seller slider-wrap">
            <div className="container">
                <div className="main-head">
                    <h2>Top Seller</h2>
                </div>

                <div className="top-seller-wrapper">
                    <Slider {...topSellerSlider}>
                        <div>
                            <div className="seller-details">
                                <div className="img-wrap">
                                    <img src="./images/collection-img.png" alt="" />

                                    <img className="top-seller-mark" src="./images/top-seller.png" alt="" />
                                </div>

                                <div className="seller-info">
                                    <h3>Crispin Berry</h3>

                                    <p>214.2 ETH</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="seller-details">
                                <div className="img-wrap">
                                    <img src="./images/collection-img.png" alt="" />

                                    <img className="top-seller-mark" src="./images/top-seller.png" alt="" />
                                </div>

                                <div className="seller-info">
                                    <h3>Windsor Lane</h3>

                                    <p>120.7 ETH</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="seller-details">
                                <div className="img-wrap">
                                    <img src="./images/collection-img.png" alt="" />

                                    <img className="top-seller-mark" src="./images/top-seller.png" alt="" />
                                </div>

                                <div className="seller-info">
                                    <h3>Blake Banks</h3>

                                    <p>68.2 ETH</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="seller-details">
                                <div className="img-wrap">
                                    <img src="./images/collection-img.png" alt="" />

                                    <img className="top-seller-mark" src="./images/top-seller.png" alt="" />
                                </div>

                                <div className="seller-info">
                                    <h3>Matt Ramos</h3>

                                    <p>38.4 ETH</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="seller-details">
                                <div className="img-wrap">
                                    <img src="./images/collection-img.png" alt="" />

                                    <img className="top-seller-mark" src="./images/top-seller.png" alt="" />
                                </div>

                                <div className="seller-info">
                                    <h3>Crispin Berry</h3>

                                    <p>214.2 ETH</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="seller-details">
                                <div className="img-wrap">
                                    <img src="./images/collection-img.png" alt="" />

                                    <img className="top-seller-mark" src="./images/top-seller.png" alt="" />
                                </div>

                                <div className="seller-info">
                                    <h3>Tommy Alvarez</h3>

                                    <p>170.3 ETH</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="seller-details">
                                <div className="img-wrap">
                                    <img src="./images/collection-img.png" alt="" />

                                    <img className="top-seller-mark" src="./images/top-seller.png" alt="" />
                                </div>

                                <div className="seller-info">
                                    <h3>Andy Hurlbutt</h3>

                                    <p>82.79 ETH</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="seller-details">
                                <div className="img-wrap">
                                    <img src="./images/collection-img.png" alt="" />

                                    <img className="top-seller-mark" src="./images/top-seller.png" alt="" />
                                </div>

                                <div className="seller-info">
                                    <h3>Crispin Berry</h3>

                                    <p>214.2 ETH</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="seller-details">
                                <div className="img-wrap">
                                    <img src="./images/collection-img.png" alt="" />

                                    <img className="top-seller-mark" src="./images/top-seller.png" alt="" />
                                </div>

                                <div className="seller-info">
                                    <h3>Monica Lucas</h3>

                                    <p>52.8 ETH</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="seller-details">
                                <div className="img-wrap">
                                    <img src="./images/collection-img.png" alt="" />

                                    <img className="top-seller-mark" src="./images/top-seller.png" alt="" />
                                </div>

                                <div className="seller-info">
                                    <h3>Harper Wilcher</h3>

                                    <p>29.2 ETH</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="seller-details">
                                <div className="img-wrap">
                                    <img src="./images/collection-img.png" alt="" />

                                    <img className="top-seller-mark" src="./images/top-seller.png" alt="" />
                                </div>

                                <div className="seller-info">
                                    <h3>Harper Wilcher</h3>

                                    <p>29.2 ETH</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="seller-details">
                                <div className="img-wrap">
                                    <img src="./images/collection-img.png" alt="" />

                                    <img className="top-seller-mark" src="./images/top-seller.png" alt="" />
                                </div>

                                <div className="seller-info">
                                    <h3>Harper Wilcher</h3>

                                    <p>29.2 ETH</p>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </section>

        <div className='mid-bg-wrap'>
         <section class="picks selling">
            <div className="container">
                <div className="main-head">
                    <h2>Today's Picks</h2>

                    <a className="gradient-line">
                        Explore more
                    </a>
                </div>

                <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="collection-box">
                            <div className="img-wrap">
                                <img src="./images/collection-img.png" alt="" />

                                <div className="likes">
                                    <img src="./images/likes.svg" alt="" />100
                                </div>
                            </div>

                            <div className="content">
                                <div className="collection-content-head">
                                    <h3>"Hamlet Contemplates Yorick's...</h3>

                                    <div className="protocol">
                                        BSC
                                    </div>
                                </div>
                                

                                <div className="creator-wrap">
                                    <div className="left">
                                        <img src="./images/collection-img.png" alt="" />

                                        <div className="creator-info">
                                            <span>Creator</span>

                                            <h4>SalvadorDali</h4>
                                        </div>
                                    </div>
                                    
                                    <div className="bid-price">
                                        <div className="left">
                                            <span>Current Bid</span>

                                            <h4>4.89 ETH</h4>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className="bid-price">
                                    

                                    <a href="#" className="common-btn">
                                    <img src="./images/bag.png" alt="" />
                                    <img className="white" src="./images/bag-white.png" alt="" />
                                    Place Bid
                                    </a>

                                    <a href="#">
                                        <img src="./images/history-icon.png" alt="" />
                                        View History     
                                    </a>
                                </div>
                            </div>
                        </div>
                     </div>

                     <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="collection-box">
                            <div className="img-wrap">
                                <img src="./images/collection-img.png" alt="" />
                                
                                <div className="coming-soon">
                                    Coming Soon
                                </div>

                                <div className="likes">
                                    <img src="./images/likes.svg" alt="" />100
                                </div>
                            </div>

                            <div className="content">
                                <div className="collection-content-head">
                                    <h3>"Hamlet Contemplates Yorick's...</h3>

                                    <div className="protocol">
                                        BSC
                                    </div>
                                </div>

                                <div className="creator-wrap">
                                    <div className="left">
                                        <img src="./images/collection-img.png" alt="" />

                                        <div className="creator-info">
                                            <span>Creator</span>

                                            <h4>SalvadorDali</h4>
                                        </div>
                                    </div>
                                    
                                    <div className="bid-price">
                                        <div className="left">
                                            <span>Current Bid</span>

                                            <h4>4.89 ETH</h4>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                     </div>

                     <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="collection-box">
                            <div className="img-wrap">
                                <img src="./images/collection-img.png" alt="" />

                                <div className="likes">
                                    <img src="./images/likes.svg" alt="" />100
                                </div>
                            </div>

                            <div className="content">
                                <div className="collection-content-head">
                                    <h3>"Hamlet Contemplates Yorick's...</h3>

                                    <div className="protocol">
                                        BSC
                                    </div>
                                </div>
                                

                                <div className="creator-wrap">
                                    <div className="left">
                                        <img src="./images/collection-img.png" alt="" />

                                        <div className="creator-info">
                                            <span>Creator</span>

                                            <h4>SalvadorDali</h4>
                                        </div>
                                    </div>
                                    
                                    <div className="bid-price">
                                        <div className="left">
                                            <span>Current Bid</span>

                                            <h4>4.89 ETH</h4>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className="bid-price">
                                    

                                    <a href="#" className="common-btn">
                                    <img src="./images/bag.png" alt="" />
                                    <img className="white" src="./images/bag-white.png" alt="" />
                                    Place Bid
                                    </a>

                                    <a href="#">
                                        <img src="./images/history-icon.png" alt="" />
                                        View History     
                                    </a>
                                </div>
                            </div>
                        </div>
                     </div>

                     <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="collection-box">
                            <div className="img-wrap">
                                <img src="./images/collection-img.png" alt="" />

                                <div className="likes">
                                    <img src="./images/likes.svg" alt="" />100
                                </div>
                            </div>

                            <div className="content">
                                <div className="collection-content-head">
                                    <h3>"Hamlet Contemplates Yorick's...</h3>

                                    <div className="protocol">
                                        BSC
                                    </div>
                                </div>
                                

                                <div className="creator-wrap">
                                    <div className="left">
                                        <img src="./images/collection-img.png" alt="" />

                                        <div className="creator-info">
                                            <span>Creator</span>

                                            <h4>SalvadorDali</h4>
                                        </div>
                                    </div>
                                    
                                    <div className="bid-price">
                                        <div className="left">
                                            <span>Current Bid</span>

                                            <h4>4.89 ETH</h4>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className="bid-price">
                                    

                                    <a href="#" className="common-btn">
                                    <img src="./images/bag.png" alt="" />
                                    <img className="white" src="./images/bag-white.png" alt="" />
                                    Place Bid
                                    </a>

                                    <a href="#">
                                        <img src="./images/history-icon.png" alt="" />
                                        View History     
                                    </a>
                                </div>
                            </div>
                        </div>
                     </div>

                     <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="collection-box">
                            <div className="img-wrap">
                                <img src="./images/collection-img.png" alt="" />

                                <div className="likes">
                                    <img src="./images/likes.svg" alt="" />100
                                </div>
                            </div>

                            <div className="content">
                                <div className="collection-content-head">
                                    <h3>"Hamlet Contemplates Yorick's...</h3>

                                    <div className="protocol">
                                        BSC
                                    </div>
                                </div>
                                

                                <div className="creator-wrap">
                                    <div className="left">
                                        <img src="./images/collection-img.png" alt="" />

                                        <div className="creator-info">
                                            <span>Creator</span>

                                            <h4>SalvadorDali</h4>
                                        </div>
                                    </div>
                                    
                                    <div className="bid-price">
                                        <div className="left">
                                            <span>Current Bid</span>

                                            <h4>4.89 ETH</h4>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className="bid-price">
                                    

                                    <a href="#" className="common-btn">
                                    <img src="./images/bag.png" alt="" />
                                    <img className="white" src="./images/bag-white.png" alt="" />
                                    Place Bid
                                    </a>

                                    <a href="#">
                                        <img src="./images/history-icon.png" alt="" />
                                        View History     
                                    </a>
                                </div>
                            </div>
                        </div>
                     </div>

                     <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="collection-box">
                            <div className="img-wrap">
                                <img src="./images/collection-img.png" alt="" />

                                <div className="likes">
                                    <img src="./images/likes.svg" alt="" />100
                                </div>
                            </div>

                            <div className="content">
                                <div className="collection-content-head">
                                    <h3>"Hamlet Contemplates Yorick's...</h3>

                                    <div className="protocol">
                                        BSC
                                    </div>
                                </div>
                                

                                <div className="creator-wrap">
                                    <div className="left">
                                        <img src="./images/collection-img.png" alt="" />

                                        <div className="creator-info">
                                            <span>Creator</span>

                                            <h4>SalvadorDali</h4>
                                        </div>
                                    </div>
                                    
                                    <div className="bid-price">
                                        <div className="left">
                                            <span>Current Bid</span>

                                            <h4>4.89 ETH</h4>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className="bid-price">
                                    

                                    <a href="#" className="common-btn">
                                    <img src="./images/bag.png" alt="" />
                                    <img className="white" src="./images/bag-white.png" alt="" />
                                    Place Bid
                                    </a>

                                    <a href="#">
                                        <img src="./images/history-icon.png" alt="" />
                                        View History     
                                    </a>
                                </div>
                            </div>
                        </div>
                     </div>

                     <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="collection-box">
                            <div className="img-wrap">
                                <img src="./images/collection-img.png" alt="" />

                                <div className="likes">
                                    <img src="./images/likes.svg" alt="" />100
                                </div>
                            </div>

                            <div className="content">
                                <div className="collection-content-head">
                                    <h3>"Hamlet Contemplates Yorick's...</h3>

                                    <div className="protocol">
                                        BSC
                                    </div>
                                </div>
                                

                                <div className="creator-wrap">
                                    <div className="left">
                                        <img src="./images/collection-img.png" alt="" />

                                        <div className="creator-info">
                                            <span>Creator</span>

                                            <h4>SalvadorDali</h4>
                                        </div>
                                    </div>
                                    
                                    <div className="bid-price">
                                        <div className="left">
                                            <span>Current Bid</span>

                                            <h4>4.89 ETH</h4>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className="bid-price">
                                    

                                    <a href="#" className="common-btn">
                                    <img src="./images/bag.png" alt="" />
                                    <img className="white" src="./images/bag-white.png" alt="" />
                                    Place Bid
                                    </a>

                                    <a href="#">
                                        <img src="./images/history-icon.png" alt="" />
                                        View History     
                                    </a>
                                </div>
                            </div>
                        </div>
                     </div>

                     <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="collection-box">
                            <div className="img-wrap">
                                <img src="./images/collection-img.png" alt="" />

                                <div className="likes">
                                    <img src="./images/likes.svg" alt="" />100
                                </div>
                            </div>

                            <div className="content">
                                <div className="collection-content-head">
                                    <h3>"Hamlet Contemplates Yorick's...</h3>

                                    <div className="protocol">
                                        BSC
                                    </div>
                                </div>
                                

                                <div className="creator-wrap">
                                    <div className="left">
                                        <img src="./images/collection-img.png" alt="" />

                                        <div className="creator-info">
                                            <span>Creator</span>

                                            <h4>SalvadorDali</h4>
                                        </div>
                                    </div>
                                    
                                    <div className="bid-price">
                                        <div className="left">
                                            <span>Current Bid</span>

                                            <h4>4.89 ETH</h4>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className="bid-price">
                                    

                                    <a href="#" className="common-btn">
                                    <img src="./images/bag.png" alt="" />
                                    <img className="white" src="./images/bag-white.png" alt="" />
                                    Place Bid
                                    </a>

                                    <a href="#">
                                        <img src="./images/history-icon.png" alt="" />
                                        View History     
                                    </a>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>

                <div className="mt-4 text-center">
                    <a className="common-btn border-white">
                        Load More
                    </a>
                </div>
            </div>
        </section>
        
        <section className="popular-collection sell">
            <div className="container">
                <div className="main-head">
                    <h2>Popular Collection</h2>

                    <a className="gradient-line">
                        Explore more
                    </a>
                </div>

                <div className="row">
                    <div className="col-lg-4">
                        <div className="collection-box">
                            <div className="content">
                                <div className="left">
                                    <div className="img-wrap">
                                        <img src="./images/collection-img.png" alt="" />

                                        <img className="top-seller-mark" src="./images/top-seller.png" alt="" />
                                    </div>

                                    <div className="info">
                                        <h3>Creative Art Collection</h3>

                                        <p><span>Created by</span> Ralph Garraway</p>
                                    </div>
                                </div>
                                
                                <div className="likes">
                                    <img src="./images/likes.svg" alt="" />100
                                </div>
                            </div>

                            <div className="images-wrapper">
                                <img src="./images/collection-img.png" alt="" />

                                <div className="inner-images-wrap">
                                    <img src="./images/collection-img.png" alt="" />

                                    <img src="./images/collection-img.png" alt="" />

                                    <img src="./images/collection-img.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="collection-box">
                            <div className="content">
                                <div className="left">
                                    <div className="img-wrap">
                                        <img src="./images/collection-img.png" alt="" />

                                        <img className="top-seller-mark" src="./images/top-seller.png" alt="" />
                                    </div>

                                    <div className="info">
                                        <h3>Colorful Abstract</h3>

                                        <p><span>Created by</span> Mason Woodward</p>
                                    </div>
                                </div>
                                
                                <div className="likes">
                                    <img src="./images/likes.svg" alt="" />100
                                </div>
                            </div>

                            <div className="images-wrapper">
                                <img src="./images/collection-img.png" alt="" />

                                <div className="inner-images-wrap">
                                    <img src="./images/collection-img.png" alt="" />

                                    <img src="./images/collection-img.png" alt="" />

                                    <img src="./images/collection-img.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="collection-box">
                            <div className="content">
                                <div className="left">
                                    <div className="img-wrap">
                                        <img src="./images/collection-img.png" alt="" />

                                        <img className="top-seller-mark" src="./images/top-seller.png" alt="" />
                                    </div>

                                    <div className="info">
                                        <h3>Modern Art Collection </h3>

                                        <p><span>Created by</span> Freddie Carpenter</p>
                                    </div>
                                </div>
                                
                                <div className="likes">
                                    <img src="./images/likes.svg" alt="" />100
                                </div>
                            </div>

                            <div className="images-wrapper">
                                <img src="./images/collection-img.png" alt="" />

                                <div className="inner-images-wrap">
                                    <img src="./images/collection-img.png" alt="" />

                                    <img src="./images/collection-img.png" alt="" />

                                    <img src="./images/collection-img.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> 

        <section className="services">
            <div className="container">
                <div className="main-head">
                    <h2>Create and sell your NFTs</h2>
                </div>

                <div className="row">
                    <div className="col-lg-3 col-sm-6">
                        <div className="service-box">
                            <img src="./images/setup-wallet.png" alt="" />

                            <h3>Set up your wallet</h3>

                            <p>Once you’ve set up your wallet of choice, connect it to Epsilon by clicking the NFT Marketplacein the top right corner.</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-sm-6">
                        <div className="service-box">
                            <img src="./images/add-nft.png" alt="" />

                            <h3>Create your collection</h3>

                            <p>Click Create and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-sm-6">
                        <div className="service-box">
                            <img src="./images/create-collection.png" alt="" />

                            <h3>Add your NFTs</h3>

                            <p>Upload your work (image, video, audio, or 3D art), add a title and description, and customize your NFTs with properties, stats</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-sm-6">
                        <div className="service-box">
                            <img src="./images/list-for-sale.png" alt="" />

                            <h3>List them for sale</h3>

                            <p>Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
         <Footer /> 
    </>
    );
};
export default Sell;