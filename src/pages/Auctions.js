import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Slider from "react-slick";
import Countdown, { zeroPad } from 'react-countdown';
import { setLoader, getAllNfts, getAuctions, addRemoveFavItems } from "../store/actions/Auth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const like = "/images/likes.svg";
const alternate = "/images/alternate.jpg";

const Auctions = (props) => {
    const navigate = useNavigate();

    let [countDown, setCountDown] = useState(true);
    const [itemPerRow, setItemPerRow] = useState(10);
    const [next, setNext] = useState(itemPerRow);
    const [auctionsData, setAuctionsData] = useState([]);

    React.useEffect(() => {
        props.setLoader({message:"Load auctions...",status:true});
        props.getAuctions({ chain: props.chain });
    }, [props.chain]);

    useEffect(() => {
        if (props.setAuctions.length > 0) {
            setAuctionsData(props.setAuctions);
        }
    }, [props.setAuctions]);


    const AddFavItems = (nftId, tokenAddress, chain) => {
        props.addRemoveFavItems({ nftId, tokenAddress, chain });
    }

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

    const handleImageError = (idx) => {
        auctionsData[idx]['image'] = alternate;
        setAuctionsData([...auctionsData]);
    };

    const handleUserImageError = (idx) => {
        auctionsData[idx]['users']['image'] = alternate;
        setAuctionsData([...auctionsData]);
    };

    return (
        <>
            <Header />

            <section className="banner-inner">
                <div className="container">
                    <div className="content">
                        <h1>Auctions</h1>

                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li class="breadcrumb-item"><Link to="/explore">Explore</Link></li>
                                <li class="breadcrumb-item active" aria-current="page">Auctions</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>

            <section class="auctions-main picks sell">
                <div className="container">
                    <div className="main-head justify-content-center">
                        <h2>Live Auctions</h2>
                    </div>


                    <div className="row">
                        {auctionsData.length > 0 && auctionsData.slice(0, next).map((item, idx) =>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <div className="collection-box">
                                    <div className="img-wrap">
                                        <img key={idx} src={item?.['image'] ? item?.['image'] : alternate} onError={() => handleImageError(idx)} alt="Alternate Image" />

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
                                                <img key={idx} src={item?.['users']?.['image'] ? item?.['users']?.['image'] : alternate} onError={() => handleUserImageError(idx)} alt="Alternate Image" />

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
                        {next < auctionsData?.length && (
                            <a className="common-btn border-white" onClick={handleMoreImage}>
                                Load More
                            </a>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

const mapDispatchToProps = { setLoader, getAuctions, addRemoveFavItems };

const mapStateToProps = ({ Auth }) => {
    let { isLogin, chain, publicAddress, setAuctions, setAllNfts } = Auth;
    return { isLogin, chain, publicAddress, setAuctions, setAllNfts }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auctions);