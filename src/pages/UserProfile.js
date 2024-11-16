import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Tabs, Tab } from 'react-bootstrap';
import { connect } from "react-redux";
import EventBus from 'eventing-bus';
import { Form, Button } from 'react-bootstrap';
import { CopyToClipboard } from "react-copy-to-clipboard";
import Header from '../components/Header';
import Footer from '../components/Footer';
import SingleCollection from './User/SingleCollection';
import MultipleCollections from './User/MultipleCollections';
import { makeTokens, web3 } from "../store/contract";
import { setLoader, getCollection, getUser, getUserNft, getUserFavItems, addRemoveFavItems } from "../store/actions/Auth";

const alternate = "/images/alternate.jpg";
const facebook = "/images/facebook-black.png";
const twitter = "/images/twitter-black.png";
const discord = "/images/discord.png";
const google = "/images/google-black.png";
const chatBlack = "/images/chat-black.png";
const collectionImage = "/images/collection-img.png";
const search = "/images/search.svg";
const bag = "/images/bag.png";
const bagWhite = "/images/bag-white.png";
const like = "/images/likes.svg";
const history = "/images/history-icon.png";


const UserProfile = (props) => {
    const navigate = useNavigate();
    let [selectCollection, setSelectCollection] = useState("Single");
    let [user, setUser] = useState({});
    let [userNftHolding, setuserNftHolding] = useState([]);
    let [userFavHolding, setuserFavHolding] = useState([]);

    useEffect(() => {
        if(props.isLogin == true){
            props.setLoader({status:true,message:"Load profile"});
            props.getCollection();
            props.getUserNft();
            props.getUser();
            props.getUserFavItems();
        }
    }, [props.isLogin]);

    useEffect(() => {
        if (Object.keys(props.userData).length > 0) setUser(props.userData);
    }, [props.userData]);

    async function copiedAddress() {
        EventBus.publish("success", "Owner Address Copied");
    }

    useEffect(() => {
        if (props.userNfts.length > 0 && props.isLogin ==  true) {
            let userNFTS = props.userNfts.filter(item=>{
                if(item.tokenType == "erc1155"){
                    return item.mintAmount !== 0;
                }else{
                    return item;
                }
            })
            setuserNftHolding(userNFTS);
        }
    }, [props.userNfts, props.isLogin]);

    const handleNftHoldingImageError = (idx) => {
        userNftHolding[idx]['image'] = alternate;
        setuserNftHolding([...userNftHolding]);
    };

    useEffect(() => {
        if (props.userFavitems && props.isLogin == true) setuserFavHolding(props.userFavitems)
    }, [props.userFavitems, props.isLogin])


    const handleNftFavImageError = (idx) => {
        userFavHolding[idx]['nft']['image'] = alternate;
        setuserFavHolding([...userFavHolding]);
    }

    const AddFavItems = (nftId, tokenAddress, chain) => {
        props.addRemoveFavItems({ nftId, tokenAddress, chain });
    }

    if (!props.isLogin) return navigate("/");
    return (
        <>
            <Header />

            <section className="profile">
                <div className="container">
                    {/*  USER */}
                    <div className="inner">
                        <div className="inner-wrap">
                            <div className="img-wrap">
                                <img src={user?.image ? user['image'] : "./images/collection-img.png"} alt="" />
                            </div>

                            <div className="right">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <div className="content">
                                            <h2>{user?.name ? user['name'] : ""}</h2>

                                            <p>{user?.desc ? user['desc'] : ""}</p>

                                            <a className="wallet-address">
                                                <span>{user?.publicAddress ? user['publicAddress'] : ""}</span>
                                                <CopyToClipboard
                                                    text={user['publicAddress']}
                                                    onCopy={copiedAddress}
                                                >
                                                    <img src="./images/wallet-address-copy.png" alt="" />
                                                </CopyToClipboard>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="col-lg-5">
                                        <div className="wrap">
                                            <ul className="social-icons">
                                                <li>
                                                    {user?.facebook &&
                                                        <a href={user['facebook']} target='_blank'>
                                                            <img src={facebook} alt="" />
                                                        </a>
                                                    }
                                                </li>

                                                <li>
                                                    {user?.twitter &&
                                                        <a href={user['twitter']} target='_blank'>
                                                            <img src={twitter} alt="" />
                                                        </a>
                                                    }
                                                </li>

                                                <li>
                                                    {user?.discord &&
                                                        <a href={user['discord']} target='_blank'>
                                                            <img src={discord} alt="" />
                                                        </a>
                                                    }
                                                </li>
                                            </ul>

                                            <NavLink to={"/editprofile"} className="common-btn border-white">
                                                Edit Profile
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="profile-bottom">
                            <nav>
                                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                    <button class="nav-link active" id="nav-favorites-tab" data-bs-toggle="tab" data-bs-target="#nav-favorites" type="button" role="tab" aria-controls="nav-favorites" aria-selected="true">favorites</button>

                                    <button class="nav-link" id="nav-watchlist-tab" data-bs-toggle="tab" data-bs-target="#nav-watchlist" type="button" role="tab" aria-controls="nav-watchlist" aria-selected="false">my nfts</button>
                                </div>
                            </nav>
                        </div>
                    </div>

                    <div class="tab-content" id="nav-tabContent">

                        {/*  FAVORITES */}
                        <div class="tab-pane fade show active" id="nav-favorites" role="tabpanel" aria-labelledby="nav-favorites-tab">

                            <div class="picks">
                                <div className="row">
                                    {userFavHolding && userFavHolding.length > 0 && userFavHolding.map((item, idx) =>

                                        <div className="col-xl-3 col-lg-4 col-md-6">
                                            <div className="collection-box">
                                                <div className="img-wrap">
                                                    <img key={idx} src={item?.['nft']?.['image'] ? item?.['nft']?.['image'] : alternate} onError={() => handleNftFavImageError(idx)} alt="Alternate Image" />

                                                    <Link to={`/itemdetail/${item?.['nft']?.['_id']}`} className="common-btn white">
                                                        <img src={bag} alt="" />
                                                        <img className="white" src={bagWhite} alt="" />
                                                        Detail
                                                    </Link>

                                                    <div className="likes">
                                                        <img src={like} onClick={() => AddFavItems(item['nft']['_id'], item['nft']['tokenAddress'], item['nft']['chain'])} alt="" /> {item?.['nft']?.['totalFav'] ? item?.['nft']?.['totalFav'] : 0}
                                                    </div>
                                                </div>

                                                <div className="content">
                                                    <h3>{item?.['nft']?.['title'] ? item?.['nft']?.['title'] : "-"}</h3>

                                                    <div className="creator-wrap">

                                                        <div className="protocol">
                                                            {item?.nft?.chain == 11155111 && "ETH"}
                                                            {item?.nft?.chain == 1 && "ETH"}
                                                            {item?.nft?.chain == 56 && "BSC"}
                                                            {item?.nft?.chain == 97 && "BSC"}
                                                            {item?.nft?.chain == 50 && "XDC"}
                                                            {item?.nft?.chain == 51 && "XDC"}
                                                            {item?.nft?.chain == 43114 && "AVAX"}
                                                            {item?.nft?.chain == 43113 && "AVAX"}
                                                        </div>
                                                    </div>

                                                    <div className="bid-price">
                                                        <div className="left">
                                                            <span>Price</span>
                                                            <h4>{item?.nft?.price}
                                                                {item?.nft?.chain == 11155111 && " ETH"}
                                                                {item?.nft?.chain == 1 && " ETH"}
                                                                {item?.nft?.chain == 56 && " BSC"}
                                                                {item?.nft?.chain == 97 && " BSC"}
                                                                {item?.nft?.chain == 50 && " XDC"}
                                                                {item?.nft?.chain == 51 && " XDC"}
                                                                {item?.nft?.chain == 43114 && " AVAX"}
                                                                {item?.nft?.chain == 43113 && " AVAX"}
                                                            </h4>
                                                        </div>

                                                        {item?.nft?.tokenType == "erc1155" ?
                                                            <a href="#">
                                                                Mint Amount  {item?.nft?.mintAmount}
                                                            </a>
                                                            :
                                                            <a href="#">
                                                                {/* <img src={history} alt="" /> */}
                                                                Token Id {item?.nft?.nftId}
                                                            </a>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* <div className="mt-4 text-center">
                                    <a className="common-btn border-white">
                                        Load More
                                    </a>
                                </div> */}
                            </div>
                        </div>
                        {/*  My NFTS */}
                        <div class="tab-pane fade" id="nav-watchlist" role="tabpanel" aria-labelledby="nav-watchlist-tab">
                            <div class="picks">
                                <div className="row">
                                    {userNftHolding && userNftHolding.length > 0 && userNftHolding.map((item, idx) =>
                                        <div className="col-xl-3 col-lg-4 col-md-6">
                                            <div className="collection-box">
                                                <div className="img-wrap">
                                                    <img key={idx} src={item?.['image'] ? item?.['image'] : alternate} onError={() => handleNftHoldingImageError(idx)} alt="Alternate Image" />

                                                    <Link to={`/itemdetail/${item['_id']}`} className="common-btn white">
                                                        <img src={bag} alt="" />
                                                        <img className="white" src={bagWhite} alt="" />
                                                        Detail
                                                    </Link>

                                                    <div className="likes">
                                                        <img src={like} onClick={() => AddFavItems(item['_id'], item['tokenAddress'], item['chain'])} alt="" /> {item['totalFav'] ? item['totalFav'] : 0}
                                                    </div>
                                                </div>

                                                <div className="content">
                                                    <h3>{item['title'] ? item['title'] : "-"}</h3>

                                                    <div className="creator-wrap">
                                                        <div className="left">
                                                            <img src={item['users']['image'] ? item['users']['image'] : collectionImage} alt="" />

                                                            <div className="creator-info">
                                                                <span>Creator</span>

                                                                <h4>{item['users'] ? item['users']['name'] : "-"}</h4>
                                                            </div>
                                                        </div>

                                                        <div className="protocol">
                                                            {item?.chain == 11155111 && "ETH"}
                                                            {item?.chain == 1 && "ETH"}
                                                            {item?.chain == 56 && "BSC"}
                                                            {item?.chain == 97 && "BSC"}
                                                            {item?.chain == 50 && "XDC"}
                                                            {item?.chain == 51 && "XDC"}
                                                            {item?.chain == 43114 && "AVAX"}
                                                            {item?.chain == 43113 && "AVAX"}
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

const mapDispatchToProps = { setLoader, getCollection, getUser, getUserNft, getUserFavItems, addRemoveFavItems };

const mapStateToProps = ({ Auth }) => {
    let { isLogin, chain, publicAddress, userCollections, userData, userNfts, userFavitems } = Auth;
    return { isLogin, chain, publicAddress, userCollections, userData, userNfts, userFavitems }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);