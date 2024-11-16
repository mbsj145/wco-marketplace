import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Slider from "react-slick";
import Countdown, { zeroPad } from 'react-countdown';
import { setLoader, getAllNfts, getAuctions, addRemoveFavItems, getAllCollection } from "../store/actions/Auth";
// Import css files
import Header from "../components/Header";
import Footer from "../components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const alternate = "/images/alternate.jpg";
const like = "/images/likes.svg";

const Home = (props) => {
    const navigate = useNavigate();
    let [countDown, setCountDown] = useState(true);
    const [itemPerRow, setItemPerRow] = useState(4);
    const [nftData, setNftData] = useState([]);
    const [collections, setCollections] = useState([]);
    const [auctionsData, setAuctionsData] = useState([]);
    const [next, setNext] = useState(itemPerRow);

    React.useEffect(() => {
        props.getAllNfts({ chain: props.chain });
        props.getAuctions({ chain: props.chain });
        props.getAllCollection({chain: props.chain});
    }, [props.chain]);

    useEffect(() => {
        if (props.setAuctions && props.setAuctions.length > 0) {
            setAuctionsData(props.setAuctions);
        }else{
            setAuctionsData([]);
        }
    }, [props.setAuctions]);

    useEffect(() => {
        if (props.setAllNfts && props.setAllNfts.length > 0) {
            setNftData(props.setAllNfts);
        }else {
            setNftData([])
        }
    }, [props.setAllNfts]);

    useEffect(()=>{
        if(props.collections && props.collections.length > 0){
            setCollections(props.collections);
        }else {
            setCollections([])
        }
    },[props.collections])

    const AddFavItems = (nftId, tokenAddress, chain) => {
        props.addRemoveFavItems({ nftId, tokenAddress, chain });
    }

    var auctionSlider = {
        slidesToShow: 6,
        slidesToScroll: 1,
        speed: 1000,
        autoplaySpeed: 3000,
        dots: true,
        infinite: false,
        arrows: true,
        draggable:true,
        responsive: [
            {
                breakpoint: 1700,
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3,
                }
            },

            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            },

            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            setCountDown(false);
        } else {
            // Render a countdown
            return <>
                <img src="./images/axies-small-icon.png" alt="" />
                <p id="day">{zeroPad(days)}<span>:</span></p><p id="hour">{zeroPad(hours)}<span>:</span></p><p id="minutes">{zeroPad(minutes)}<span>:</span></p><p id="second">{zeroPad(seconds)}</p></>;

        }
    };

    const handleMoreImage = () => {
        setNext(next + itemPerRow);
    };

    const handleAuctionImageError = (idx) => {
        auctionsData[idx]['image'] = alternate;
        setAuctionsData([...auctionsData]);
    };

    const handleAuctionUserImageError = (idx) => {
        auctionsData[idx]['users']['image'] = alternate;
        setAuctionsData([...auctionsData]);
    };

    const handleNftImageError = (idx) => {
        nftData[idx]['image'] = alternate;
        setNftData([...nftData]);
    };

    const handleNftUserImageError = (idx) => {
        nftData[idx]['users']['image'] = alternate;
        setNftData([...nftData]);
    };

    const handleCollectionImageError = (idx) => {
        collections[idx]['profileImage'] = alternate;
        setCollections([...collections]);
    }

    const handleCollectionUserImageError = (idx) => {
        collections[idx]['users']['image'] = alternate;
        setCollections([...collections]);
    }

    return (
        <>
            <Header />

            <div className='top-wrap'>
                <section className="banner">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6">
                                <div className="banner-content">
                                    <h1>Empower Your Inner <span>Calisthenics Beast</span> with NFT Art</h1>

                                    <p>Experience the thrill of owning and trading digital assets that capture the essence of calisthenics, the ultimate form of fitness and art. You can find rare and exclusive digital collectibles from the best athletes and artists in the space</p>

                                    <div className="btn-wrap">
                                        <Link to="/explore" className="common-btn">
                                            <img src="./images/rocket.png" alt="" />
                                            Explore
                                        </Link>
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

                <section className="services text-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="service-box">
                                    <img src="./images/setup-wallet.png" alt="" />

                                    <h3>Set up your wallet</h3>

                                    <p>Once you’ve set up your wallet of choice, connect it to LOGO by clicking the NFT Marketplacein the top right corner.</p>
                                </div>
                            </div>

                            {/* <div className="col-lg-3">
                                <div className="service-box">
                                    <img src="./images/add-nft.png" alt="" />

                                    <h3>Create your collection</h3>

                                    <p>Click Create and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.</p>
                                </div>
                            </div> */}

                            {/* <div className="col-lg-3">
                                <div className="service-box">
                                    <img src="./images/create-collection.png" alt="" />

                                    <h3>Add your NFTs</h3>

                                    <p>Upload your work (image, video, audio, or 3D art), add a title and description, and customize your NFTs with properties, stats</p>
                                </div>
                            </div> */}

                            <div className="col-lg-3">
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
            

            <section className="auctions picks">
                <div className="container">
                    <div className="main-head">
                        <h2>Live Auctions</h2>

                        <Link to={"/auctions"} className="gradient-line">
                            Explore more
                        </Link>
                    </div>
                </div>
                {auctionsData && auctionsData.length > 0 &&
                    <div className="auction-slider-wrapper">
                        <Slider {...auctionSlider}>
                            {auctionsData.map((item, idx) =>
                                <div>
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img key={idx} src={item?.['image'] ? item?.['image'] : alternate} onError={() => handleAuctionImageError(idx)} alt="Alternate Image" />

                                            <div className="likes">
                                                <img src={like} onClick={() => AddFavItems(item['_id'], item['tokenAddress'], item['chain'])} alt="" />{item['totalFav'] ? item['totalFav'] : 0}
                                            </div>

                                            <Link to={`/itemdetail/${item['_id']}`} className="common-btn white">
                                                <img src="./images/bag.png" alt="" />
                                                <img className="white" src="./images/bag-white.png" alt="" />
                                                Detail
                                            </Link>

                                            <div className="timer">
                                                {parseInt(item.bidTime) > parseInt(Date.parse(new Date()) / 1000) ? <Countdown date={Date.now() + parseInt((Number(item.bidTime) * 1000) - Date.now())} renderer={renderer} /> :
                                                    <>
                                                        <img src="./images/axies-small-icon.png" alt="" />
                                                        <p id="day">00<span>:</span></p>
                                                        <p id="hour">00<span>:</span></p>
                                                        <p id="minute">00<span>:</span></p>
                                                        <p id="second">00</p>
                                                    </>
                                                }
                                            </div>
                                        </div>

                                        <div className="content">
                                            <h3>{item['title'] ? item['title'] : "-"}</h3>

                                            <div className="creator-wrap">
                                                <div className="left">
                                                    <img key={idx} src={item?.['users']?.['image'] ? item?.['users']?.['image'] : alternate} onError={() => handleAuctionUserImageError(idx)} alt="Alternate Image" />

                                                    <div className="creator-info">
                                                        <span>Creator</span>

                                                        <h4>{(item?.['users']?.['name']) ? (item?.['users']?.['name']) : (item?.['users']?.['publicAddress'].slice(0, 6) + "..." + item?.['users']?.['publicAddress'].slice(38, 42))}</h4>
                                                    </div>
                                                </div>

                                                <div className="protocol">
                                                    {item?.chain == 11155111 && " ETH"}
                                                    {item?.chain == 1 && " ETH"}
                                                    {item?.chain == 56 && " BSC"}
                                                    {item?.chain == 97 && " BSC"}
                                                    {item?.chain == 50 && " XDC"}
                                                    {item?.chain == 51 && " XDC"}
                                                    {item?.chain == 43114 && " AVAX"}
                                                    {item?.chain == 43113 && " AVAX"}
                                                </div>
                                            </div>

                                            <div className="bid-price">
                                                <div className="left">
                                                    <span>Price </span>
                                                    {/* <span>Current Bid</span> */}

                                                    <h4>{item?.price}
                                                        {item?.chain == 11155111 && " ETH"}
                                                        {item?.chain == 1 && " ETH"}
                                                        {item?.chain == 56 && " BSC"}
                                                        {item?.chain == 97 && " BSC"}
                                                        {item?.chain == 50 && " XDC"}
                                                        {item?.chain == 51 && " XDC"}
                                                        {item?.chain == 43114 && " AVAX"}
                                                        {item?.chain == 43113 && " AVAX"}
                                                    </h4>
                                                    {/* <h4>4.89 ETH<span>=$12.246</span></h4> */}
                                                </div>
                                                {item?.tokenType == "erc1155" ?
                                                    <a href="#">
                                                        Mint Amount  {item?.mintAmount}
                                                    </a>
                                                    :
                                                    <a href="#">
                                                        {/* <img src={history} alt="" /> */}
                                                        Token Id {item?.nftId}
                                                    </a>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Slider>
                    </div>
                }
            </section>

            <div className='mid-bg-wrap'>
            <section className="popular-collection">
            <div className="container">
                <div className="main-head">
                    <h2>Popular Collection</h2>

                    <Link to={"/publiccollection"} className="gradient-line">
                        Explore more
                    </Link>
                </div>
                {collections && collections.length > 0 &&
                <div className="row">
                {collections.sort((a, b) => {
                        const dateA = new Date(a.createdAt);
                        const dateB = new Date(b.createdAt);
                        return dateB - dateA;
                }).slice(0,3).map((item, idx)=>
                    <Link to={`/collection/${item['chain']}/${item['tokenAddress']}`} className="col-lg-4">
                        <div className="collection-box">
                            <div className="img-wrap">
                                <img key={idx}  src={item['profileImage'] ? item['profileImage'] : alternate } onError={() => handleCollectionImageError(idx)} />
                            </div>

                            <div className="content">
                                <div className="left">
                                    <div className="img-wrap">
                                        <img key={idx} src={item?.users?.image ? item.users.image : alternate} onError={() => handleCollectionUserImageError(idx)} alt="" />

                                        <img className="top-seller-mark" src="./images/top-seller.png" alt="" />
                                    </div>

                                    <div className="info">
                                        <h3>{item['collectionName'] ? item['collectionName'] : ""}</h3>

                                        <p><span>Created by </span>{item?.users?.name ? item.users.name : ""}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                 </Link>
                )}
                </div>
                }
            </div>
        </section>

            {/* <section className="top-seller">
            <div className="container">
                <div className="main-head">
                    <h2>Top Seller</h2>
                </div>

                <div className="top-seller-wrapper">
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
            </div>
        </section> */}

            <section class="picks">
                <div className="container">
                    <div className="main-head">
                        <h2>Today's Picks</h2>

                        <Link to={"/explore"} className="gradient-line">
                            Explore more
                        </Link>
                    </div>
                    <div className="row">
                        {nftData && nftData.length > 0 && nftData.slice(0, next).map((item, idx) =>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <div className="collection-box">
                                    <div className="img-wrap">
                                        <img key={idx} src={item?.['image'] ? item?.['image'] : alternate} onError={() => handleNftImageError(idx)} alt="Alternate Image" />

                                        <div className="likes">
                                            <img src={like} onClick={() => AddFavItems(item['_id'], item['tokenAddress'], item['chain'])} alt="" />{item['totalFav'] ? item['totalFav'] : 0}
                                        </div>

                                        <Link to={`/itemdetail/${item['_id']}`} className="common-btn white">
                                            <img src="./images/bag.png" alt="" />
                                            <img className="white" src="./images/bag-white.png" alt="" />
                                            Detail
                                        </Link>
                                        {item['status'] == "auction" &&
                                            <div className="timer">
                                                {parseInt(item.bidTime) > parseInt(Date.parse(new Date()) / 1000) ? <Countdown date={Date.now() + parseInt((Number(item.bidTime) * 1000) - Date.now())} renderer={renderer} /> :
                                                    <>
                                                        <img src="./images/axies-small-icon.png" alt="" />
                                                        <p id="day">00<span>:</span></p>
                                                        <p id="hour">00<span>:</span></p>
                                                        <p id="minute">00<span>:</span></p>
                                                        <p id="second">00</p>
                                                    </>
                                                }
                                            </div>
                                        }
                                    </div>

                                    <div className="content">
                                        <h3>{item['title'] ? item['title'] : "-"}</h3>

                                        <div className="creator-wrap">
                                            <div className="left">
                                                <img key={idx} src={item?.['users']?.['image'] ? item?.['users']?.['image'] : alternate} onError={() => handleNftUserImageError(idx)} alt="Alternate Image" />

                                                <div className="creator-info">
                                                    <span>Creator</span>

                                                    <h4>{(item?.['users']?.['name']) ? (item?.['users']?.['name']) : (item?.['users']?.['publicAddress'].slice(0, 6) + "..." + item?.['users']?.['publicAddress'].slice(38, 42))}</h4>
                                                </div>
                                            </div>

                                            <div className="protocol">
                                                {item?.chain == 11155111 && " ETH"}
                                                {item?.chain == 1 && " ETH"}
                                                {item?.chain == 56 && " BSC"}
                                                {item?.chain == 97 && " BSC"}
                                                {item?.chain == 50 && " XDC"}
                                                {item?.chain == 51 && " XDC"}
                                                {item?.chain == 43114 && " AVAX"}
                                                {item?.chain == 43113 && " AVAX"}
                                            </div>
                                        </div>

                                        <div className="bid-price">
                                            <div className="left">
                                                <span>Price </span>
                                                {/* <span>Current Bid</span> */}

                                                <h4>{item?.price}
                                                    {item?.chain == 11155111 && " ETH"}
                                                    {item?.chain == 1 && " ETH"}
                                                    {item?.chain == 56 && " BSC"}
                                                    {item?.chain == 97 && " BSC"}
                                                    {item?.chain == 50 && " XDC"}
                                                    {item?.chain == 51 && " XDC"}
                                                    {item?.chain == 43114 && " AVAX"}
                                                    {item?.chain == 43113 && " AVAX"}
                                                </h4>
                                                {/* <h4>4.89 ETH<span>=$12.246</span></h4> */}
                                            </div>
                                            {item?.tokenType == "erc1155" ?
                                                <a href="#">
                                                    Mint Amount  {item?.mintAmount}
                                                </a>
                                                :
                                                <a href="#">
                                                    {/* <img src={history} alt="" /> */}
                                                    Token Id {item?.nftId}
                                                </a>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 text-center">
                        {next < nftData?.length && (
                            <a className="common-btn border-white" onClick={handleMoreImage}>
                                Load More
                            </a>
                        )}
                    </div>
                </div>
            </section>
            </div>
            

            <Footer />
        </>
    );
};
const mapDispatchToProps = { setLoader, getAllNfts, getAuctions, addRemoveFavItems, getAllCollection };

const mapStateToProps = ({ Auth }) => {
    let { isLogin, chain, publicAddress, setAuctions, setAllNfts, collections } = Auth;
    return { isLogin, chain, publicAddress, setAuctions, setAllNfts, collections }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);