import React from 'react';
import { NavLink, useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Drops = () => {
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


    return(
    <>
        <Header />

        <section className="banner-inner">
            <div className="container">
                <div className="content">
                    <h1>Drops</h1>

                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li class="breadcrumb-item"><Link to="/explore">Explore</Link></li>
                            <li class="breadcrumb-item active" aria-current="page">Drops</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </section>

        <section class="picks selling">
            <div className="container">

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
                                        Minting
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
                                        Minting
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
                                        Minting
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
                                        Minting
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
                                        Minting
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
                                        Minting
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
                                        Minting
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
                                        Minting
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
                </div>

                <div className="mt-4 text-center">
                    <a className="common-btn border-white">
                        Load More
                    </a>
                </div>
            </div>
        </section>
        
        <Footer />
    </>
    );
};
export default Drops;