import moment from 'moment';
import EventBus from 'eventing-bus';
import { connect } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Tabs, Tab } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { makeTokens, web3 } from "../store/contract";
import { NavLink, Link, useNavigate, useParams } from "react-router-dom";
import { setLoader, getAllActivity, getNftActivity } from "../store/actions/Auth";

const alternate = "/images/alternate.jpg";

const Activity = (props) => {
    const navigate = useNavigate();
    let [loading, setLoading] = useState(true);
    let [filter, setFilter] = useState("");
    let [status, setStatus] = useState("");
    const [key, setKey] = useState('home');
    const [itemPerRow, setItemPerRow] = useState(10);
    const [next, setNext] = useState(itemPerRow);
    const [generalActivity, setGeneralActivity] = useState([]);


    useEffect(() => {
        props.setLoader({ message: 'Loading Activity...', status: true });
        props.getAllActivity({chain:props.chain});
    }, [props.isLogin]);

    useEffect(() => {
        if (props.allActivity && props.allActivity.length > 0) {
            setGeneralActivity(props.allActivity);
            props.setLoader({ status: false });
            setLoading(false)
        }

    }, [props.allActivity]);

    const handleImageError = (idx) => {
        generalActivity[idx]['image'] = alternate;
        setGeneralActivity([...generalActivity]);
    };

    const handleMoreImage = () => {
        setNext(next + itemPerRow);
    };

    const callFilter=(value)=>{
        let filterValue = props.allActivity.filter((a) => {
            if (value) {
                return a.nft?.title?.toString().includes(value)
            }
            else {
                return a
            }
        });
        setGeneralActivity(filterValue);
        setNext(10);
    }

    const callFilterbyStatus=(status)=>{
        let filterValue = props.allActivity.filter((a) => {
            if (status) {
                return a.status?.toString() === status
            }
            else {
                return a
            }
        });
        setGeneralActivity(filterValue);
        setNext(10);
    }
    return (
        <>
            <Header />

            <section className="banner-inner">
                <div className="container">
                    <div className="content">
                        <h1>Activity</h1>

                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><Link to={`/`}>Home</Link></li>
                                <li class="breadcrumb-item active" aria-current="page">Activity</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>

            <section className='activity'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            {
                                loading == false ?
                                  generalActivity.length > 0 && generalActivity.sort((a, b) => a.createdAt - b.createdAt).slice(0, next).map((item, idx) =>
                                    <div className="activity-card">
                                        {item?.['isCollection'] == false?
                                        <Link to={`/itemdetail/${item?.['nft']?.['_id']}`}>
                                            <div className="col-left">
                                                <div className="thumbnail">
                                                    <img key={idx} src={item?.['nft']?.['image'] ? item?.['nft']?.['image'] : alternate} onError={() => handleImageError(idx)} alt="Alternate Image" />
                                                </div>
                                                <div>
                                                    <h5>Title: {item?.['nft']?.['title']}</h5>
                                                    <h5><span>Id: #{item?.['nft']?.['nftId']}</span></h5>
                                                    <p>{(item?.['user']?.['name']) ? (item?.['user']?.['name']) : (item?.['user']?.['publicAddress'].slice(0, 6) + "..." + item?.['user']?.['publicAddress'].slice(38, 42))}</p>
                                                    <p>proceeded for <span>{item?.['status'] == "transfer" ? "Sale" : item?.['status']}</span></p>
                                                    <p>At {moment(item?.['createdAt']).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
                                                </div>
                                            </div>
                                        </Link>

                                        :

                                         <Link to={`/collection/${item['chain']}/${item?.['collectionAddress']}`}>
                                            <div className="col-left">
                                                <div className="thumbnail">
                                                    <img key={idx} src={item?.['collectionImage'] ? item?.['collectionImage'] : alternate} onError={() => handleImageError(idx)} alt="Alternate Image" />
                                                </div>
                                                <div>
                                                    <h5>Title: {item?.['collectionName']}</h5>
                                                    {/* <h5><span>Id: #{item?.['nft']?.['nftId']}</span></h5> */}
                                                    <p>{(item?.['user']?.['name']) ? (item?.['user']?.['name']) : (item?.['user']?.['publicAddress'].slice(0, 6) + "..." + item?.['user']?.['publicAddress'].slice(38, 42))}</p>
                                                    <p>proceeded for <span>{item?.['status'] == "transfer" ? "Sale" : item?.['status']}</span></p>
                                                    <p>At {moment(item?.['createdAt']).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
                                                </div>
                                            </div>
                                        </Link>

                                        }
                                        {/* <div className="col-right">
                                            <div className="bullet">
                                                <img src="./images/users.svg" alt="" />
                                            </div>
                                        </div> */}
                                    </div>
                                )
                                :
                                <div className="activity-card">
                                    <h5>Not Found</h5>
                                </div>
                            }
                             <div className="mt-4 text-center">
                                    {next < generalActivity?.length && (
                                        <a className="load-more-btn" onClick={handleMoreImage}>
                                            Load More
                                        </a>
                                    )}
                                </div>
                            {/* <button className="load-more-btn">Load More</button> */}
                        </div>
                        <div className="col-md-4 ps-5">
                            <div className="form-group">
                                <input type="text" placeholder='Enter your word art' onChange={e => callFilter(e.target.value)} />
                                <button><img src="./images/search.svg" alt="" /></button>
                            </div>
                            <div className="filter">
                                <h3>Filter</h3>
                                <ul>
                                    <li onClick={e => callFilterbyStatus("list")}><img src="./images/sort-descending.png" alt="" />Listings</li>
                                    <li onClick={e => callFilterbyStatus("unlist")}><img src="./images/sort-descending.png" alt="" />Unlisted</li>
                                    <li onClick={e => callFilterbyStatus("transfer")}><img src="./images/sort-descending.png" alt="" />Sales</li>
                                    <li onClick={e => callFilterbyStatus("bid")}><img src="./images/sort-descending.png" alt="" />Bids</li>
                                    <li onClick={e => callFilterbyStatus("auction")}><img src="./images/sort-descending.png" alt="" />Auctions</li>
                                    <li onClick={e => callFilterbyStatus("Create NFT")}><img src="./images/sort-descending.png" alt="" /> Create NFT</li>
                                    <li onClick={e => callFilterbyStatus("Mint")}><img src="./images/sort-descending.png" alt="" /> Mint</li>
                                    <li onClick={e => callFilterbyStatus("Create Collection")}><img src="./images/sort-descending.png" alt="" /> Create Collection</li>
                                   
                                </ul>
                                <button className='clear-filter-btn' onClick={e => callFilterbyStatus("")}>Clear Filter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

const mapDispatchToProps = {
    setLoader, getAllActivity, getNftActivity
};

const mapStateToProps = ({ Auth }) => {
    let { isLogin, chain, publicAddress, allActivity, nftActivity } = Auth;
    return { isLogin, chain, publicAddress, allActivity, nftActivity }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity);