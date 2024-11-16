import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import EventBus from 'eventing-bus';
import moment from 'moment';
import { Form, Button } from 'react-bootstrap';
import { CopyToClipboard } from "react-copy-to-clipboard";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { makeTokens, web3 } from "../store/contract";
import { setLoader, getCollection, getUser, getCollectionDetails, addRemoveFavItems } from "../store/actions/Auth";

const alternate = "/images/alternate.jpg";
const facebook = "/images/facebook-black.png";
const twitter = "/images/twitter-black.png";
const google = "/images/google-black.png";
const chatBlack = "/images/chat-black.png";
const telegram = "/images/telegram.png";
const discord = "/images/discord.png";
const medium = "/images/medium.png";
const instagram = "/images/instagram.png";
const website = "/images/website.png";
const collectionImage = "/images/collection-img.png";
const search = "/images/search.svg";
const bag = "/images/bag.png";
const bagWhite = "/images/bag-white.png";
const like = "/images/likes.svg";
const history = "/images/history-icon.png";

const Collection = (props) => {
    let navigate = useNavigate();
    let { tokenAddress, chain } = useParams();
    let [maxSupply, setMaxSupply] = useState(0);
    let [totalMint, setTotalMint] = useState(0);
    let [price, setPrice] = useState(0);
    let [order, setOrder] = useState("asc");
    let [filter, setFilter] = useState("");
    let [handleChange, setHandleChange] = useState("");
    let [collection, setCollection] = useState();
    let [nfts, setNfts] = useState([]);

    useEffect(() => {
        props.setLoader({status:true,message:"Load collection"});
        props.getCollectionDetails({ tokenAddress, chain });
    }, [props.chain])

    const makeContract = async (contractAddress, type) => {
        let { ERC721ABI, ERC1155ABI } = await makeTokens();
        let Token = new web3.eth.Contract(type == "erc721" ? ERC721ABI : ERC1155ABI, contractAddress);
        if (type == "erc721") {
            let totalMint = await Token.methods.totalSupply().call();
            let maxSupply = await Token.methods.maxSupply().call();
            let price = await Token.methods.priceRecipient().call();
            setMaxSupply(maxSupply);
            setTotalMint(totalMint);
            price = await web3.utils.fromWei(price.toString(), 'ether');
            setPrice(price);
        } else if (type == "erc1155") {
            let totalMint = await Token.methods.totalSupply(1).call();
            let maxSupply = await Token.methods.maxSupply().call();
            let price = await Token.methods.priceRecipient().call();
            setMaxSupply(maxSupply);
            setTotalMint(totalMint);
            price = await web3.utils.fromWei(price.toString(), 'ether');
            setPrice(price);
        }
    }

    useEffect(() => {
        if (Object.keys(props.singleCollectionDetails).length > 0) {
            let { collectionDetail, nfts } = props.singleCollectionDetails;
            setCollection(collectionDetail);
            if (collectionDetail.tokenType == "erc1155" && nfts.length > 0) {
                nfts = nfts.filter(item => item['mintAmount'] !== 0)
                setNfts(nfts);
            } else {
                setNfts(nfts);
            }
            makeContract(collectionDetail.tokenAddress, collectionDetail.tokenType);
        }
    }, [props.singleCollectionDetails,props.chain])

    const handleImageError = (idx) => {
        nfts[idx]['image'] = alternate;
        setNfts([...nfts]);
    };

    const handleUserImageError = (idx) => {
        nfts[idx]['users']['image'] = alternate;
        setNfts([...nfts]);
    };

    const AddFavItems = (nftId) => {
        props.addRemoveFavItems({ nftId, tokenAddress, chain });
    }

    const filterNft = async (e) => {
        e.preventDefault();
        setFilter(handleChange);
    }

    return (
        <>
            <Header />

            <section className="profile collection">
                <div className="container">
                    <div className="inner">
                        <div className="inner-wrap">
                            <div className="img-wrap">
                                <img src={collection && collection['profileImage'] ? collection['profileImage'] : collectionImage} alt="" />
                            </div>

                            <div className="right">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <div className="content">
                                            <h2>{collection && collection['collectionName'] ? collection['collectionName'] : ""}</h2>
                                            <p>{collection && collection['collectionDesc'] ? collection['collectionDesc'] : ""}</p>
                                            {/* <Link className="minting-btn" to={`/mintingcollection/${chain}/${tokenAddress}`}>
                                                <span></span>
                                                Minting Now
                                            </Link> */}
                                        </div>
                                    </div>

                                    <div className="col-lg-5">
                                        <div className="wrap">
                                            <ul className="social-icons">
                                                <li>
                                                {collection && collection['website'] && collection['website'] !== "undefined"  &&
                                                    <a href={collection['website']}>
                                                        <img src={website} alt="" />
                                                    </a>
                                                }
                                                </li>

                                                <li>

                                                {collection && collection['discord'] && collection['discord'] !== "undefined" &&
                                                    <a href={collection['discord']}>
                                                        <img src={discord} alt="" />
                                                    </a>
                                                }

                                                </li>

                                                <li>

                                                {collection && collection['instagram'] && collection['instagram'] !== "undefined" &&
                                                    <a href={collection['instagram']}>
                                                        <img src={instagram} alt="" />
                                                    </a>
                                                }

                                                </li>

                                                <li>

                                                {collection && collection['medium'] && collection['medium'] !== "undefined" &&
                                                    <a href={collection['medium']}>
                                                        <img src={medium} alt="" />
                                                    </a>
                                                }

                                                </li>
                                                <li>

                                                {collection && collection['telegram'] && collection['telegram'] !== "undefined" &&
                                                    <a href={collection['telegram']}>
                                                        <img src={telegram} alt="" />
                                                    </a>
                                                }
                                                </li>
                                            </ul>
                                            {/* {collection && collection?.users?.publicAddress == props.publicAddress.toLowerCase() &&
                                                <NavLink to={`/editcollection/${chain}/${tokenAddress}`} className="common-btn border-white">
                                                    Edit Collection
                                                </NavLink>
                                            } */}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="profile-bottom">
                            {/* <nav>
                            <ul>
                                <li>
                                    <p>3,108 ETH</p>
                                    <span>Total volume</span>
                                </li>

                                <li>
                                    <p>0.0324 ETH</p>
                                    <span>floor price</span>
                                </li>

                                <li>
                                    <p>0.0336WETH</p>
                                    <span>best offer</span>
                                </li>

                                <li>
                                    <p>7%</p>
                                    <span>listed</span>
                                </li>

                                <li>
                                    <p>45,685</p>
                                    <span>owners</span>
                                </li>

                                <li>
                                    <p>57%</p>
                                    <span>unique owners</span>
                                </li>
                            </ul>
                        </nav> */}
                        </div>
                    </div>

                    <div className="collection-info-wrapper">
                        <div className="tags-wrapper">
                            <div className="tag">
                                <p>Items <b>{totalMint}</b> of <b>{maxSupply}</b></p>
                            </div>

                            <div className="tag">
                                <p>Created <b>{collection && collection['createdAt'] ? moment(collection['createdAt']).format("MMMM-DD-YYYY") : "-"}</b></p>
                            </div>

                            <div className="tag">
                                <p>Creator earnings <b>{(Number(price) * Number(totalMint)).toFixed(4)}</b></p>
                            </div>

                            <div className="tag">
                                <p>Chain
                                    <b>
                                        {collection?.chain == 11155111 && "Ethereum"}
                                        {collection?.chain == 1 && "Ethereum"}
                                        {collection?.chain == 56 && "Binance"}
                                        {collection?.chain == 97 && "Binance"}
                                        {collection?.chain == 50 && "XDC"}
                                        {collection?.chain == 51 && "XDC"}
                                        {collection?.chain == 43114 && "AVAX"}
                                        {collection?.chain == 43113 && "AVAX"}
                                    </b>
                                </p>
                            </div>

                            <div className="tag">
                                <p>Category <b>{collection && collection['collectionType'] ? collection['collectionType'] : "-"}</b></p>
                            </div>
                        </div>

                        <form className="activity" onSubmit={filterNft}>
                            <div className="form-group">
                                <input type="search" placeholder='Enter your word art' onChange={e => setHandleChange(e.target.value)} />
                                <button onClick={filterNft}><img src={search} alt="" /></button>
                            </div>

                            <div className="form-group">
                                <select onChange={e => setOrder(e.target.value)} value={order}>
                                    <option value={"asc"}>Asc</option>
                                    <option value={"desc"}>Desc</option>
                                </select>
                            </div>
                        </form>
                    </div>

                    <div class="picks">
                        <div className="row">
                            {nfts.length > 0 && nfts.filter((a) => a.title?.toString().includes(filter)).sort((a, b) => order == "asc" ? a.nftId - b.nftId : b.nftId - a.nftId).map((item, idx) =>
                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="collection-box">
                                        <div className="img-wrap">
                                            <img key={idx} src={item?.['image'] ? item?.['image'] : alternate} onError={() => handleImageError(idx)} alt="Alternate Image" />


                                            <Link to={`/buy-nft/${item['_id']}`} className="common-btn white">
                                                <img src={bag} alt="" />
                                                <img className="white" src={bagWhite} alt="" />
                                                Detail
                                            </Link>

                                            <div className="likes">
                                                <img src={like} onClick={() => AddFavItems(item['_id'])} alt="" />{item['totalFav'] ? item['totalFav'] : 0}
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

                        {/* <div className="mt-4 text-center">
                        <a className="common-btn border-white">
                            Load More
                        </a>
                    </div>  */}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};
const mapDispatchToProps = { setLoader, getCollection, getUser, getCollectionDetails, addRemoveFavItems };

const mapStateToProps = ({ Auth }) => {
    let { isLogin, chain, publicAddress, singleCollectionDetails } = Auth;
    return { isLogin, chain, publicAddress, singleCollectionDetails }
}

export default connect(mapStateToProps, mapDispatchToProps)(Collection);