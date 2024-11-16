import {React , useState} from 'react';
import { NavLink, useNavigate, Link } from "react-router-dom";
import {Tabs, Tab} from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Author= () => {
    const navigate = useNavigate();
    const [key, setKey] = useState('home');
    return(
    <>  
        <Header />

        <section className="banner-inner">
            <div className="container">
                <div className="content">
                    <h1>Author</h1>

                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li class="breadcrumb-item active" aria-current="page">Author</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </section>

        <section className="profile">
            <div className="container">
                <div className="inner">
                    <div className="inner-wrap">
                        <div className="img-wrap">
                            <img src="./images/collection-img.png" alt="" />
                        </div>

                        <div className="right">
                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="content">
                                        <h2>Trista Francis</h2>

                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecatidignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.</p>

                                        <a className="wallet-address">
                                        <span>DdzFFzCqrhshMSxddasdasdasdad</span> 

                                            <img src="./images/wallet-address-copy.png" alt="" />
                                            
                                        </a>     
                                    </div>
                                </div>

                                <div className="col-lg-5">
                                    <div className="wrap">
                                        <ul className="social-icons">
                                            <li>
                                                <a href="#">
                                                    <img src="./images/facebook-black.png" alt="" />
                                                </a>
                                            </li>

                                            <li>
                                                <a href="#">
                                                    <img src="./images/twitter-black.png" alt="" />
                                                </a>
                                            </li>

                                            <li>
                                                <a href="#">
                                                    <img src="./images/google-black.png" alt="" />
                                                </a>
                                            </li>

                                            <li>
                                                <a href="#">
                                                    <img src="./images/chat-black.png" alt="" />
                                                </a>
                                            </li>
                                        </ul>

                                        <a className="common-btn border-white">
                                            Edit Profile
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="profile-bottom">
                        <nav>
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                <button class="nav-link active" id="nav-all-tab" data-bs-toggle="tab" data-bs-target="#nav-all" type="button" role="tab" aria-controls="nav-all" aria-selected="true">all</button>

                                <button class="nav-link" id="nav-art-tab" data-bs-toggle="tab" data-bs-target="#nav-art" type="button" role="tab" aria-controls="nav-art" aria-selected="false">art</button>

                                <button class="nav-link" id="nav-music-tab" data-bs-toggle="tab" data-bs-target="#nav-music" type="button" role="tab" aria-controls="nav-music" aria-selected="false">music</button>

                                <button class="nav-link" id="nav-collectibles-tab" data-bs-toggle="tab" data-bs-target="#nav-collectibles" type="button" role="tab" aria-controls="nav-collectibles" aria-selected="false">collectibles</button>

                                <button class="nav-link" id="nav-sports-tab" data-bs-toggle="tab" data-bs-target="#nav-sports" type="button" role="tab" aria-controls="nav-sports" aria-selected="false">sports</button>
                            </div>
                        </nav>
                    </div> 
                </div>

                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-all" role="tabpanel" aria-labelledby="nav-all-tab">

                        <div class="picks">
                            <div className="row">
                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            
                                            
                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <div className="coming-soon">
                                                Coming Soon
                                            </div>

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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
                            </div>

                            <div className="mt-4 text-center">
                                <a className="common-btn border-white">
                                    Load More
                                </a>
                            </div> 
                        </div>
                    </div>

                    <div class="tab-pane fade" id="nav-art" role="tabpanel" aria-labelledby="nav-art-tab">
                    <div class="picks">
                            <div className="row">
                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            
                                            
                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <div className="coming-soon">
                                                Coming Soon
                                            </div>

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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
                            </div>

                            <div className="mt-4 text-center">
                                <a className="common-btn border-white">
                                    Load More
                                </a>
                            </div> 
                        </div>
                    </div>

                    <div class="tab-pane fade" id="nav-collection" role="tabpanel" aria-labelledby="nav-music-tab">
                    <div class="picks">
                            <div className="row">
                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            
                                            
                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <div className="coming-soon">
                                                Coming Soon
                                            </div>

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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
                            </div>

                            <div className="mt-4 text-center">
                                <a className="common-btn border-white">
                                    Load More
                                </a>
                            </div> 
                        </div> 
                    </div>

                    <div class="tab-pane fade" id="nav-collectibles" role="tabpanel" aria-labelledby="nav-collectibles-tab">
                    <div class="picks">
                            <div className="row">
                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            
                                            
                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <div className="coming-soon">
                                                Coming Soon
                                            </div>

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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
                            </div>

                            <div className="mt-4 text-center">
                                <a className="common-btn border-white">
                                    Load More
                                </a>
                            </div> 
                        </div>
                    </div>

                    <div class="tab-pane fade" id="nav-sports" role="tabpanel" aria-labelledby="nav-sports-tab">
                    <div class="picks">
                            <div className="row">
                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            
                                            
                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <div className="coming-soon">
                                                Coming Soon
                                            </div>

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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

                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img src="./images/collection-img.png" alt="" />

                                            

                                            <a href="#" className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Place Bid
                                            </a>
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
                            </div>

                            <div className="mt-4 text-center">
                                <a className="common-btn border-white">
                                    Load More
                                </a>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </section>
        

        <Footer />
    </>
    );
};
export default Author;