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

const PublicCollection = (props) => {
    const navigate = useNavigate();
    const [collections, setCollections] = useState([]);
    const [itemPerRow, setItemPerRow] = useState(10);
    const [next, setNext] = useState(itemPerRow);

    useEffect(() => {
        props.getAllCollection({chain: props.chain});
    }, [props.chain]);

    useEffect(()=>{
        if(props.collections.length > 0) setCollections(props.collections);
    },[props.collections])

    const handleCollectionImageError = (idx) => {
        collections[idx]['profileImage'] = alternate;
        setCollections([...collections]);
    }

    const handleCollectionUserImageError = (idx) => {
        collections[idx]['users']['image'] = alternate;
        setCollections([...collections]);
    }

    const handleMoreImage = () => {
        setNext(next + itemPerRow);
    };

    return(
    <>
        <Header />

        <section className="banner-inner">
            <div className="container">
                <div className="content">
                    <h1>Collection</h1>

                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li class="breadcrumb-item active" aria-current="page">Collection</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </section>

        <section className="popular-collection sell public-collection">
            <div className="container">
                {collections.length > 0 &&
                <div className="row">
                {collections.slice(0, next).map((item, idx)=>
                    <Link to={`/collection/${item['chain']}/${item['tokenAddress']}`} className="col-lg-4">
                            <div className="collection-box">
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

                                <div className="img-wrap">
                                <img key={idx}  src={item['profileImage'] ? item['profileImage'] : alternate } onError={() => handleCollectionImageError(idx)} />
                            </div>
                            </div>
                    </Link>
                 )}
                </div>
                 }

                <div className="mt-4 text-center">
                     {next < collections?.length && (
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

const mapDispatchToProps = { setLoader, getAllNfts, getAuctions, addRemoveFavItems, getAllCollection };

const mapStateToProps = ({ Auth }) => {
    let { isLogin, chain, publicAddress, setAuctions, setAllNfts, collections } = Auth;
    return { isLogin, chain, publicAddress, setAuctions, setAllNfts, collections }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicCollection);