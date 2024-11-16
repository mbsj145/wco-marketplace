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
import { setLoader, getAllCollection, getExplore, addRemoveFavItems, getCategory } from "../store/actions/Auth";

const alternate = "/images/alternate.jpg";
const facebook = "/images/facebook-black.png";
const twitter = "/images/twitter-black.png";
const google = "/images/google-black.png";
const chatBlack = "/images/chat-black.png";
const collectionImage = "/images/collection-img.png";
const search = "/images/search.svg";
const bag = "/images/bag.png";
const bagWhite = "/images/bag-white.png";
const like = "/images/likes.svg";
const history = "/images/history-icon.png";


const Explore = (props) => {
    const navigate = useNavigate();
    const [status, setStatus] = useState();
    const [itemPerRow, setItemPerRow] = useState(10);
    const [next, setNext] = useState(itemPerRow);
    const [setFound, setNotFound] = useState(false);

    const [items, setItems] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        status: [],
        categories: [],
        collection: [],
    });

    // Function to handle checkbox change and filter items
    const handleCheckboxChange = (event) => {
        const { name, value, checked } = event.target;
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            [name]: checked
                ? [...prevOptions[name], value]
                : prevOptions[name].filter((item) => item !== value),
        }));
    };

    useEffect(() => {
        props.setLoader({message:"Load explore...",status:true});
        props.getAllCollection({ chain: props.chain });
        props.getExplore({ chain: props.chain });
        props.getCategory();
    }, [props.chain]);

    useEffect(() => {
        if (props.explore.length > 0) setItems(props.explore);
    }, [props.explore]);

    const applyFilters = () => {
        const filtered = props.explore.filter((item) => {
            return (
                (!filterOptions.status.length ||
                    filterOptions.status.includes(item.status)) &&
                (!filterOptions.categories.length ||
                    filterOptions.categories.includes(item.collectionType)) &&
                (!filterOptions.collection.length ||
                    filterOptions.collection.includes(item.collections._id))
            );
        });
        if (filtered.length == 0) {
            setNext(0)
            setNotFound(true);
        }
        else {
            setNotFound(false);
            setNext(itemPerRow);
        }
        setItems(filtered);
    };

    const handleMoreImage = () => {
        setNext(next + itemPerRow);
    };

    const AddFavItems = (nftId) => {
        props.addRemoveFavItems({ nftId })
    }

    const handleImageError = (idx) => {
        items[idx]['image'] = alternate;
        setItems([...items]);
    };

    const handleUserImageError = (idx) => {
        items[idx]['users']['image'] = alternate;
        setItems([...items]);
    };

    return (
        <>
            <Header />

            <section className="banner-inner">
                <div className="container">
                    <div className="content">
                        <h1>Explore</h1>

                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li class="breadcrumb-item active" aria-current="page">Explore</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>

            <section className="explore">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4">
                            <div className="sidebar">
                                <div class="accordion" id="accordionPanelsStayOpenExample">
                                    <div class="accordion-item">
                                        <h3 class="accordion-header" id="panelsStayOpen-headingOne">
                                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-Status" aria-expanded="true" aria-controls="panelsStayOpen-Status">
                                                Status
                                            </button>
                                        </h3>

                                        <div id="panelsStayOpen-Status" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                            <ul>
                                                <li>
                                                    <input type="checkbox" id="buy"
                                                        name="status"
                                                        value="buy"
                                                        checked={filterOptions.status.includes('buy')}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <label for="buy">Buy Now</label>
                                                </li>

                                                <li>
                                                    <input type="checkbox" id="auctions"
                                                        name="status"
                                                        value="auction"
                                                        checked={filterOptions.status.includes('auction')}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <label for="auctions">On Auctions</label>
                                                </li>

                                                {/* <li>
                                                    <input type="checkbox" id="offers"
                                                        name="status"
                                                        value="offers"
                                                        checked={filterOptions.status.includes('offers')}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <label for="offers">Has Offers</label>
                                                </li> */}
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="accordion-item">
                                        <h3 class="accordion-header" id="panelsStayOpen-headingTwo">
                                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-Categories" aria-expanded="true" aria-controls="panelsStayOpen-Categories">
                                                Categories
                                            </button>
                                        </h3>

                                        <div id="panelsStayOpen-Categories" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo">
                                            <ul>
                                                {props.category && props.category.length > 0 && props.category.map(item=>
                                                    <li>
                                                        <input type="checkbox" id={item['category'].toLowerCase()}
                                                            name="categories"
                                                            value={item['category'].toLowerCase()}
                                                            checked={filterOptions.categories.includes(item['category'].toLowerCase())}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                        <label for={item['category'].toLowerCase()}>{item['category']}</label>
                                                    </li>
                                                )}

                                                {/* <li>
                                                    <input type="checkbox" id="trading cards"
                                                        name="categories"
                                                        value="trading cards"
                                                        checked={filterOptions.categories.includes('trading cards')}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <label for="trading cards">Trading Cards</label>
                                                </li>

                                                <li>
                                                    <input type="checkbox" id="partners"
                                                        name="categories"
                                                        value="partners"
                                                        checked={filterOptions.categories.includes('partners')}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <label for="partners">Partners</label>
                                                </li> */}

                                                {/* <li>
                                                    <input type="checkbox" id="domain name"
                                                        name="categories"
                                                        value="domain name"
                                                        checked={filterOptions.categories.includes('domain name')}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <label for="domain name">Domain Names</label>
                                                </li>

                                                <li>
                                                    <input type="checkbox" id="virtual world"
                                                        name="categories"
                                                        value="virtual world"
                                                        checked={filterOptions.categories.includes('virtual world')}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <label for="virtual world">Virtual Worlds</label>
                                                </li>

                                                <li>
                                                    <input type="checkbox" id="trading cards"
                                                        name="categories"
                                                        value="trading cards"
                                                        checked={filterOptions.categories.includes('trading cards')}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <label for="trading cards">Trading Cards</label>
                                                </li>

                                                <li>
                                                    <input type="checkbox" id="sports"
                                                        name="categories"
                                                        value="sports"
                                                        checked={filterOptions.categories.includes('sports')}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <label for="sports">Sports</label>
                                                </li>

                                                <li>
                                                    <input type="checkbox" id="utility"
                                                        name="categories"
                                                        value="utility"
                                                        checked={filterOptions.categories.includes('utility')}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <label for="utility">Utility</label>
                                                </li> */}
                                            </ul>
                                        </div>
                                    </div>
                                    {/* 
                                <div class="accordion-item">
                                    <h3 class="accordion-header" id="panelsStayOpen-headingThree">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-Chains" aria-expanded="true" aria-controls="panelsStayOpen-Chains">
                                            Chains
                                        </button>
                                    </h3>
                                    
                                    <div id="panelsStayOpen-Chains" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingThree">
                                        <ul>
                                            <li>
                                                <input type="checkbox" id="eth" />
                                                <label for="eth">Ethereum</label>
                                            </li>

                                            <li>
                                                <input type="checkbox" id="polygon" />
                                                <label for="polygon">Polygon</label>
                                            </li>

                                            <li>
                                                <input type="checkbox" id="klaytn" />
                                                <label for="klaytn">Klaytn</label>
                                            </li>
                                        </ul>
                                    </div>
                                </div> */}

                                    <div class="accordion-item">
                                        <h3 class="accordion-header" id="panelsStayOpen-headingFour">
                                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-Collections" aria-expanded="true" aria-controls="panelsStayOpen-Collections">
                                                Collections
                                            </button>
                                        </h3>

                                        <div id="panelsStayOpen-Collections" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingFour">
                                            <ul>
                                                {props.collections && props.collections.length > 0 && props.collections.map(item =>
                                                    item._id &&
                                                    <li key={item._id}>
                                                        <input
                                                            type="checkbox"
                                                            id={item._id}
                                                            name="collection"
                                                            value={item._id}
                                                            // checked={selectedCollection.includes(item.collectionName)}
                                                            // onChange={handleCheckboxChangeCollection}
                                                            checked={filterOptions.collection.includes(item._id)}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                        <label htmlFor={item._id}>{item.collectionName}</label>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-center">
                                        <button className="common-btn border-white" onClick={() => applyFilters()}>
                                            Filter
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-9 col-lg-8">
                            <div class="picks">
                                <div className="row">
                                    {
                                        !setFound ?
                                            items && items.length > 0 && items.slice(0, next).map((item, idx) =>
                                                <div className="col-xl-4 col-md-6">
                                                    <div className="collection-box">
                                                        <div className="img-wrap">
                                                            <img key={idx} src={item?.['image'] ? item?.['image'] : alternate} onError={() => handleImageError(idx)} alt="Alternate Image" />

                                                            <Link to={`/itemdetail/${item['_id']}`} className="common-btn white">
                                                                <img src={bag} alt="" />
                                                                <img className="white" src={bagWhite} alt="" />
                                                                Detail
                                                            </Link>

                                                            <div className="likes">
                                                                <img src={like} onClick={() => AddFavItems(item['_id'])} />{item['totalFav'] ? item['totalFav'] : 0}
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
                                            ) :
                                            <div className="text-center">
                                                <h2> Not Found </h2>
                                            </div>
                                    }
                                </div>

                                <div className="mt-4 text-center">
                                    {next < items?.length && (
                                        <a className="common-btn border-white" onClick={handleMoreImage}>
                                            Load More
                                        </a>
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

const mapDispatchToProps = { setLoader, getAllCollection, getExplore, addRemoveFavItems, getCategory };

const mapStateToProps = ({ Auth }) => {
    let { isLogin, chain, publicAddress, singleCollectionDetails, collections, explore, category } = Auth;
    return { isLogin, chain, publicAddress, singleCollectionDetails, collections, explore, category }
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore);