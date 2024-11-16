import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams, Link } from "react-router-dom";
import {Tabs, Tab, Form, Modal, Button} from 'react-bootstrap';
import { connect } from "react-redux";
import moment from 'moment';
import Countdown,{zeroPad} from 'react-countdown';
import EventBus from 'eventing-bus';
import {makeTokens,web3} from "../store/contract"
import Header from '../components/Header';
import Footer from '../components/Footer';
import { networkType } from "../store/config";
import {getSingleNft, setLoader, listNft,unListNft, transferNft, createAuction, getBids, placeBid, endAuction} from "../store/actions/Auth"

const image = "/images/img.png";
const views = "/images/views.svg";
const likes = "/images/likes.svg";
const share = "/images/share.svg";
const bid = "/images/bid-icon.svg";
const option = "/images/option.svg";
const bidProfile = "/images/bid-profile.png";
const alternate = "/images/alternate.jpg";
const incrementicon = `/images/increment.png`;
const decrementicon = `/images/decrement.png`;


const ItemDetail= (props) => {
    const navigate = useNavigate();
    let [auctionTime, setAuctionTime] = useState();
    let [startTime, setStartTime] = useState();
    let [countDown, setCountDown] = useState(true);
    let [startcountDown, setStartCountDown] = useState(true);
    let [lastbid, setLastbid] = useState();
    let [receiverAddress,setReceiverAddress] = useState();
    let [amount, setAmount] = useState(1);
    let [price, setPrice] = useState();
    let [userNftHolding, setuserNftHolding] = useState({});
    const [imageError, setImageError] = useState(false);
    const {id} = useParams();
    const [key, setKey] = useState('home');

    const [transferModal, setTransferModal] = useState(false);
    const handleClose = () => setTransferModal(false);
    const handleShow = () => setTransferModal(true);

    const [auctionModal, setAuctionModal] = useState(false);
    const handleClose1 = () => setAuctionModal(false);
    const handleShow1 = () => setAuctionModal(true);
    // const [show, setShow] = useState(false);

    useEffect(()=>{
        props.setLoader({status:true, message:"Load nft detail..."});
        props.getSingleNft({id})
    },[])
    
    useEffect(()=>{
        if(Object.keys(props.singleNft).length > 0) {
            setPrice(props.singleNft.price ? props.singleNft.price : 0)
            setuserNftHolding(props.singleNft);
            setLastbid(props.singleNft.price);
            props.getBids({nftObjId:id});
            setCountDown(true);
            handleClose();
            handleClose1();
        }
    },[props.singleNft]);

    const handleImageError = () => {
        setImageError(true);
    };

    function incrementCount() {
        let totalcount = amount + 1;
        if(totalcount > userNftHolding.mintAmount) return EventBus.publish("error", `You can add ${userNftHolding.mintAmount} NFT`);
        if(totalcount <= 0) setAmount(1);
        else setAmount(totalcount);
    }
    
    function decrementCount() {
        let totalcount = amount - 1;
        if(totalcount <= 0) setAmount(1);
        else setAmount(totalcount);
    }

    const handlePriceChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 7) {
          setPrice(inputValue);
        }
    };

    const listNft = async () =>{
        try {
            if(!props.isLogin) return EventBus.publish('error',`Please connect wallet to perform action`);
            if(!price) return EventBus.publish('error',`Please set price`);
            let {_id,tokenAddress,nftId,tokenType,users} = userNftHolding;

            if(!props.publicAddress) return EventBus.publish('error',`Please connect wallet`);

            if(tokenType == "erc1155") {
                if(userNftHolding.mintAmount == 0 ) return EventBus.publish('error',`You have insufficient amount of tokens`); 
            }

            let {MarketplaceAddress,MarketplaceToken,ERC721ABI,ERC1155ABI} = await makeTokens();
            let Token = new web3.eth.Contract(tokenType == "erc721" ? ERC721ABI : ERC1155ABI,tokenAddress);
            props.setLoader({ message: 'Approve for list nft...', status: true });
            price = await web3.utils.toWei(price.toString(),"ether");
            web3.eth.sendTransaction({
                from: props.publicAddress,
                to: tokenAddress,
                value: 0,
                gas:5000000,
                data: tokenType == "erc721" ? 
                Token.methods.approve(MarketplaceAddress,nftId).encodeABI()
                :
                Token.methods.setApprovalForAll(MarketplaceAddress,true).encodeABI(),
              }).on('transactionHash', (hash) => console.log(`************ tx =`, hash))
                .on('receipt', async receipt => {
                props.setLoader({ message: 'List nft...', status: true });
                web3.eth.sendTransaction({
                    from: props.publicAddress,
                    to: MarketplaceAddress,
                    value: 0,
                    gas:5000000,
                    data: MarketplaceToken.methods.createMarketItem(tokenAddress,nftId,price,amount,tokenType,users.publicAddress).encodeABI(),
                  }).on('transactionHash', (hash) => console.log(`************ tx =`, hash))
                    .on('receipt', async receipt => {
                    setPrice("");
                    price = await web3.utils.fromWei(price.toString(),"ether");
                    props.listNft({nftObjId:_id,price,listAmount:amount})
                    }).on('error', e => {
                      setPrice("");
                      console.log("**************** e",e)
                      props.setLoader({status:false});
                      EventBus.publish('error', ` ${e}`);
                });
                }).on('error', e => {
                  setPrice("");
                  console.log("**************** e",e)
                  props.setLoader({status:false});
                  EventBus.publish('error', ` ${e}`);
            });
        } catch (error) {
            console.log("********************** error",error);
            props.setLoader({status:false});
            return EventBus.publish('error', error);
        }
    }

    const unListNft = async () =>{
        try {
            let {_id,tokenAddress,nftId,tokenType,listAmount,users} = userNftHolding;
            if(!props.isLogin) return EventBus.publish('error',`Please connect wallet to perform action`);
            if(!props.publicAddress) return EventBus.publish('error',`Please connect wallet`);
            
            props.setLoader({ message: 'Unlist nft...', status: true });
            let {MarketplaceAddress,MarketplaceToken,ERC721ABI,ERC1155ABI} = await makeTokens();
                web3.eth.sendTransaction({
                    from: props.publicAddress,
                    to: MarketplaceAddress,
                    value: 0,
                    gas:5000000,
                    data: MarketplaceToken.methods.unListItems(tokenAddress,nftId,users.publicAddress).encodeABI(),
                  }).on('transactionHash', (hash) => console.log(`************ tx =`, hash))
                    .on('receipt', async receipt => {
                    props.unListNft({nftObjId:_id})
                    }).on('error', e => {
                      props.setLoader({status:false});
                      EventBus.publish('error', `${e}`);
                });
        } catch (error) {
            console.log("********************** error",error);
            props.setLoader({status:false});
            return EventBus.publish('error', error);
        }
    }

    const buyNft = async () => {
        try {
            if(!props.isLogin) return EventBus.publish('error',`Please connect wallet to perform action`);
            // if(!receiverAddress) return EventBus.publish('error',`Invalid Receiver Address`);
            let getBalance = await web3.eth.getBalance(props.publicAddress);
            let balanceInEther = await web3.utils.fromWei(getBalance.toString(), 'ether');

            let {_id,price,tokenAddress,nftId,tokenType,listAmount,users} = userNftHolding;

            if(!props.publicAddress) return EventBus.publish('error',`Please connect wallet`);

            let {MarketplaceAddress,MarketplaceToken,ERC721ABI,ERC1155ABI} = await makeTokens();

            if(Number(balanceInEther) < Number(price)) return EventBus.publish('error',`Insufficient Balance`); 
            price = await web3.utils.toWei(price.toString(), 'ether');
            props.setLoader({ message: 'Buy nft...', status: true });
                web3.eth.sendTransaction({
                    from: props.publicAddress,
                    to: MarketplaceAddress,
                    value: price,
                    gas:5000000,
                    data: MarketplaceToken.methods.createMarketSale(tokenAddress,nftId,users.publicAddress).encodeABI(),
                  }).on('transactionHash', (hash) => console.log(`************ tx =`, hash))
                    .on('receipt', async receipt => {
                        props.transferNft({nftObjId:_id,receiverAddress:props.publicAddress,mintAmount:listAmount})
                    }).on('error', e => {
                      props.setLoader({status:false});
                      EventBus.publish('error', `${e}`);
                });
        } catch (error) {
            console.log("********************** error",error);
            props.setLoader({status:false});
            return EventBus.publish('error', error);
        }
    }

    const transferNft = async(e) => {
        try {
            e.preventDefault()
            if(!props.isLogin) return EventBus.publish('error',`Please connect wallet to perform action`);
            if(!receiverAddress) return EventBus.publish('error',`Invalid Receiver Address`);
            let {_id,price,tokenAddress,nftId,tokenType,listAmount,users} = userNftHolding;

            if(!props.publicAddress) return EventBus.publish('error',`Please connect wallet`);

            if(tokenType == "erc1155") {
                if(userNftHolding.mintAmount == 0 ) return EventBus.publish('error',`You have insufficient amount of tokens`); 
            }
            if(users.publicAddress.toLowerCase() == receiverAddress.toLowerCase()) return EventBus.publish('error',`NFT can't be transfer with the owner address`); 

            let {MarketplaceAddress,MarketplaceToken,ERC721ABI,ERC1155ABI} = await makeTokens();
            let Token = new web3.eth.Contract(tokenType == "erc721" ? ERC721ABI : ERC1155ABI,tokenAddress);
            props.setLoader({ message: 'Transfer nft...', status: true });
                web3.eth.sendTransaction({
                    from: props.publicAddress,
                    to: tokenAddress,
                    value: 0,
                    gas:5000000,
                    data: tokenType == "erc721" ? 
                    Token.methods.transferFrom(props.publicAddress,receiverAddress,nftId).encodeABI()
                    :
                    Token.methods.safeTransferFrom(props.publicAddress,receiverAddress,nftId,amount,"0x").encodeABI(),
                }).on('transactionHash', (hash) => console.log(`************ tx =`, hash))
                    .on('receipt', async receipt => {
                    props.transferNft({nftObjId:_id,receiverAddress,mintAmount:amount});
                    handleClose();
                    }).on('error', e => {
                      props.setLoader({status:false});
                      EventBus.publish('error', `${e}`);
                });
        } catch (error) {
            console.log("********************** error",error);
            props.setLoader({status:false});
            return EventBus.publish('error', error);
        }
    }

    const createAuction = async (e) => {
        try {
            e.preventDefault();
            if(!props.isLogin) return EventBus.publish('error',`Please connect wallet to perform action`);
            if(!auctionTime) return EventBus.publish('error',`Please set auction time`);
            const inputAuctionTime = new Date(auctionTime);
            const inputStartTime = new Date(startTime);
            const currentDateTime = new Date();
            if (inputAuctionTime <= currentDateTime) return EventBus.publish('error',`Auction time must be grather then current time`);
            if (inputAuctionTime <= inputStartTime) return EventBus.publish('error',`Auction end time must be grather then start time`);
            console.log("******************** inputStartTime",inputStartTime)
            console.log("******************** inputAuctionTime",inputAuctionTime)
            const timestamp = Date.parse(auctionTime) / 1000;
            const timestampstartTime = Date.parse(startTime) / 1000;
            if(!price) return EventBus.publish('error',`Please set price`);
            if(!props.publicAddress) return EventBus.publish('error',`Please connect wallet`);

            let getBalance = await web3.eth.getBalance(props.publicAddress);
            let balanceInEther = await web3.utils.fromWei(getBalance.toString(), 'ether');

            // if(Number(balanceInEther) < Number(price)) return EventBus.publish('error',`Insufficient Balance`); 

            let {_id,tokenAddress,nftId,tokenType,users} = userNftHolding;
            
            if(tokenType == "erc1155") {
                if(userNftHolding.mintAmount == 0 ) return EventBus.publish('error',`You have insufficient amount of tokens`); 
            }

            let {MarketplaceAddress,MarketplaceToken,ERC721ABI,ERC1155ABI} = await makeTokens();
            let Token = new web3.eth.Contract(tokenType == "erc721" ? ERC721ABI : ERC1155ABI,tokenAddress);
            price = await web3.utils.toWei(price.toString(),"ether");
            props.setLoader({ message: 'Approve for auction...', status: true });

            web3.eth.sendTransaction({
                from: props.publicAddress,
                to: tokenAddress,
                value: 0,
                gas:5000000,
                data: tokenType == "erc721" ? 
                Token.methods.approve(MarketplaceAddress,nftId).encodeABI()
                :
                Token.methods.setApprovalForAll(MarketplaceAddress,true).encodeABI(),
              }).on('transactionHash', (hash) => console.log(`************ tx =`, hash))
                .on('receipt', async receipt => {
                props.setLoader({ message: 'Auction setup...', status: true });
                web3.eth.sendTransaction({
                    from: props.publicAddress,
                    to: MarketplaceAddress,
                    value: 0,
                    data: MarketplaceToken.methods.createAuction(tokenAddress,nftId,amount,price,timestamp,tokenType,users.publicAddress).encodeABI(),
                  }).on('transactionHash', (hash) => console.log(`************ tx =`, hash))
                    .on('receipt', async receipt => {
                    console.log("******************** receipt",receipt);
                    setPrice("");
                    price = await web3.utils.fromWei(price.toString(),"ether");
                    props.createAuction({nftObjId:_id,price,bidAmount:amount,bidTime:timestamp,startTime:timestampstartTime})
                    }).on('error', e => {
                      setPrice("");
                      handleClose()
                      handleClose1()
                      props.setLoader({status:false});
                      EventBus.publish('error', `${e}`);
                });
                }).on('error', e => {
                  setPrice("");
                  console.log("**************** e",e)
                  props.setLoader({status:false});
                  EventBus.publish('error', `${e}`);
            });
        } catch (error) {
            console.log("********************** error",error);
            props.setLoader({status:false});
            return EventBus.publish('error', error);
        }
    }
    
    const endAuction = async () => {
        try {
            let {_id,tokenAddress,nftId,tokenType,users} = userNftHolding;
            
            if(!props.isLogin) return EventBus.publish('error',`Please connect wallet to perform action`);
            if(!props.publicAddress) return EventBus.publish('error',`Please connect wallet`);

            if(users.publicAddress.toLowerCase() != props.publicAddress.toLowerCase()) return EventBus.publish('error',`Only owner can end auction`); 

            let {MarketplaceAddress,MarketplaceToken,ERC721ABI,ERC1155ABI} = await makeTokens();
            props.setLoader({ message: 'End auction ...', status: true });
                web3.eth.sendTransaction({
                    from: props.publicAddress,
                    to: MarketplaceAddress,
                    value: 0,
                    gas:5000000,
                    data: MarketplaceToken.methods.endAuction(tokenAddress,nftId,users.publicAddress).encodeABI(),
                  }).on('transactionHash', (hash) => console.log(`************ tx =`, hash))
                    .on('receipt', async receipt => {
                    setPrice("");
                    props.endAuction({nftObjId:_id})
                    }).on('error', e => {
                      setPrice("");
                      console.log("**************** e",e)
                      props.setLoader({status:false});
                      EventBus.publish('error', `${e}`);
                });
        } catch (error) {
            console.log("********************** error",error);
            props.setLoader({status:false});
            return EventBus.publish('error', error);
        }
    }

    const placeBid = async () => {
        try {
            let {_id,tokenAddress,nftId,tokenType,users} = userNftHolding;
            if(!props.isLogin) return EventBus.publish('error',`Please connect wallet to perform action`);
            if(!props.publicAddress) return EventBus.publish('error',`Please connect wallet`);

            let {MarketplaceAddress,MarketplaceToken,ERC721ABI,ERC1155ABI} = await makeTokens();
            if(users.publicAddress.toLowerCase() == props.publicAddress.toLowerCase()) return EventBus.publish('error',`owner can't be place auction`); 
            if(Number(price) <= Number(lastbid)) return EventBus.publish('error',`Price must be grather then last bid`); 
            price = await web3.utils.toWei(price.toString(),"ether");
            let balanceInEther = await web3.eth.getBalance(props.publicAddress);
            if(Number(balanceInEther) < Number(price)) return EventBus.publish('error',`Insufficient Balance`); 

            props.setLoader({ message: 'Place bid ...', status: true });
                web3.eth.sendTransaction({
                    from: props.publicAddress,
                    to: MarketplaceAddress,
                    value: price,
                    gas:5000000,
                    data: MarketplaceToken.methods.placeBid(tokenAddress,nftId,users.publicAddress).encodeABI(),
                  }).on('transactionHash', (hash) => console.log(`************ tx =`, hash))
                    .on('receipt', async receipt => {
                    console.log("******************** receipt",receipt);
                    setPrice("");
                    price = await web3.utils.fromWei(price.toString(),"ether");
                    props.placeBid({nftObjId:_id,price,bidderAddress:props.publicAddress})
                    }).on('error', e => {
                      setPrice("");
                      console.log("**************** e",e)
                      props.setLoader({status:false});
                      EventBus.publish('error', `${e}`);
                });
        } catch (error) {
            console.log("********************** error",error);
            props.setLoader({status:false});
            return EventBus.publish('error', error);
        }
    }

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            setCountDown(false);
        } else {
          // Render a countdown
          return <>{zeroPad(days)}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</>;
          
        }
    };

    const rendererStartTime = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            setStartCountDown(false);
          return <>{zeroPad(days)}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</>;
        } else {
          // Render a countdown
          return <>{zeroPad(days)}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</>;
          
        }
    };

    return(
    <>  
        <Header />

        <section className="banner-inner">
            <div className="container">
                <div className="content">
                    <h1>Item Details</h1>

                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li class="breadcrumb-item"><Link to="/explore">Explore</Link></li>
                            <li class="breadcrumb-item active" aria-current="page">Item Details</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </section>
         
        <section className='item-detail'> 
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="main-img-wrap">
                         <img src={imageError ? alternate : userNftHolding?.image} onError={handleImageError} alt="" />
                        </div>
                        {userNftHolding && userNftHolding.attributes && userNftHolding.attributes.length > 0 &&
                        <div>
                               <h3> NFT Properties</h3>
                                {userNftHolding.attributes.map(obj => 
                                        Object.entries(obj).map(([key, value]) =>
                                            <p key={key}>
                                                {key}: {value}{' '}
                                            </p>
                                        )
                                )}
                        </div>
                        }
                    </div>
                    <div className="col-xl-6">
                        <h1>{userNftHolding?.title ? userNftHolding?.title : "-"}</h1>
                        <div className="item-interaction">
                            <div className="item-views">
                                {/* <span><img src={views} alt="" /> 225</span> */}
                                <span><img src={likes} alt="" />{userNftHolding?.totalFav ? userNftHolding?.totalFav : 0}</span>
                            </div>
                            {/* <div className="share-option">
                                <button><img src={share} alt="" /></button>
                                <button><img src={option} alt="" /></button>
                            </div> */}
                        </div>
                        <p>{userNftHolding?.desc ? userNftHolding?.desc : "-"}</p>
                        {
                        //  userNftHolding?.isMarketItem == true 
                        //  ? 
                         userNftHolding?.status == "auction" ?
                            <div className="price">
                                <div className="price-card">
                                    <h5>Current Bid</h5>
                                    <span><b>{userNftHolding?.price ? userNftHolding.price : 0 }
                                        { userNftHolding?.chain == 11155111 &&  " ETH" } 
                                        { userNftHolding?.chain == 1 &&  " ETH" } 
                                        { userNftHolding?.chain == 56 &&  " BSC" } 
                                        { userNftHolding?.chain == 97 &&  " BSC" } 
                                        { userNftHolding?.chain == 50 &&  " XDC" } 
                                        { userNftHolding?.chain == 51 &&  " XDC" } 
                                        { userNftHolding?.chain == 43114 &&  " AVAX" } 
                                        { userNftHolding?.chain == 43113 &&  " AVAX" } 
                                    </b></span>
                                </div>
                                <div className="price-card">
                                    <h5>Countdown</h5>
                                    {/* {countDown == true && <span><b><Countdown date={Date.now() + 30000000000000} renderer={renderer} /> </b></span> } */}
                                    {/* {countDown == true && <span><b>{userNftHolding?.bidTime ? <Countdown date={Date.now() + parseInt((Number(userNftHolding.bidTime) * 1000) - Date.now())} renderer={renderer} /> : "00 : 00 : 00 : 00" } </b></span> } */}
                                    {
                                    startcountDown == true ?
                                    countDown == true &&
                                    userNftHolding &&
                                    <span><b> 
                                        {userNftHolding?.startTime ? <Countdown date={Date.now() + parseInt((Number(userNftHolding.startTime) * 1000) - Date.now())} renderer={rendererStartTime} /> : "00 : 00 : 00 : 00" }
                                    </b></span> 
                                    :
                                    countDown == true &&
                                    userNftHolding &&
                                    <span><b>
                                        {userNftHolding?.bidTime ? <Countdown date={Date.now() + parseInt((Number(userNftHolding.bidTime) * 1000) - Date.now())} renderer={renderer} /> : "00 : 00 : 00 : 00" } 
                                    </b></span>
                                    }
                                    {countDown == false && <span><b>Auction Ended</b></span> }
                                </div>
                            </div>
                        :
                            <div className="price">
                                <div className="price-card">
                                    <h5>Current Price</h5>
                                    <span><b>{userNftHolding?.price }
                                        { userNftHolding?.chain == 11155111 &&  " ETH" } 
                                        { userNftHolding?.chain == 1 &&  " ETH" } 
                                        { userNftHolding?.chain == 56 &&  " BSC" } 
                                        { userNftHolding?.chain == 97 &&  " BSC" } 
                                        { userNftHolding?.chain == 50 &&  " XDC" } 
                                        { userNftHolding?.chain == 51 &&  " XDC" } 
                                        { userNftHolding?.chain == 43114 &&  " AVAX" } 
                                        { userNftHolding?.chain == 43113 &&  " AVAX" } 
                                    </b></span>
                                </div>
                            </div>
                        //  :
                        
                        }

                        {/* set price */}
                        {userNftHolding.isMarketItem == true && userNftHolding.status == "auction" &&
                        <div className="price">
                            <div className="price-card">
                                <h5>Set Price</h5>
                                <input type="number" placeholder="set price 0.01" onChange={handlePriceChange} value={price} maxLength={5}/>
                            </div>
                         </div>
                        }
                          {userNftHolding.isMarketItem !== true && userNftHolding.status == "buy" &&
                            <div className="price">
                                <div className="price-card">
                                    <h5>Set Price</h5>
                                    <input type="number" placeholder="set price 0.01" onChange={handlePriceChange} value={price} maxLength={5}/>
                                </div>
                            </div>
                            }
                        {/* {userNftHolding?.status == "auction" &&
                            <div className="price">
                                <div className="price-card">
                                    <h5>Set Price</h5>
                                    <input type="number" placeholder="set price 0.01" onChange={handlePriceChange} value={price} maxLength={5}/>
                                </div>
                            </div>
                        } */}

                        {userNftHolding?.tokenType == "erc1155" &&  userNftHolding?.isMarketItem == false && userNftHolding?.mintAmount !== 0 &&
                            <div className="public-stage-wrapper">
                                <Form className="inner">
                                    <div className="limit-wrap">
                                        <div className="info">
                                            <p>

                                                {userNftHolding?.chain == 11155111 &&  `${userNftHolding?.price } ETH` } 
                                                {userNftHolding?.chain == 1 &&  `${userNftHolding?.price } ETH` } 
                                                {userNftHolding?.chain == 56 &&  `${userNftHolding?.price } BNB` } 
                                                {userNftHolding?.chain == 97 &&  `${userNftHolding?.price } BNB` } 
                                                {userNftHolding?.chain == 50 &&  `${userNftHolding?.price } XDC` } 
                                                {userNftHolding?.chain == 51 &&  `${userNftHolding?.price } XDC` } 
                                                {userNftHolding?.chain == 43114 &&  `${userNftHolding?.price } AVAX` } 
                                                {userNftHolding?.chain == 43113 &&  `${userNftHolding?.price } AVAX` } 

                                            </p>

                                            <span>Set Amount</span>
                                        </div>

                                        <Form.Group className="form-group">
                                            <img className="increment" onClick={decrementCount} src={decrementicon} alt="" />

                                            <Form.Control type="number" value={amount} />

                                            <img  className="decrement" onClick={incrementCount} src={incrementicon} alt="" />
                                        </Form.Group>

                                        {/* <a className="common-btn white" onClick={maxNFT}>Max</a> */}
                                    </div>
                                    {/* <a className="common-btn" onClick={mintNFT}>Mint</a> */}
                                </Form>
                            </div>
                        }
                        {userNftHolding?.status == "auction" &&
                            <div className="tabs-wrapper">
                            <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            >
                                <Tab eventKey="home" title="Bid History">
                                    {props.setBids.length > 0 ?
                                    props.setBids.map(item=>
                                    <ul className='bid-list'>
                                        <li>
                                            <div className="col-left">
                                                <div className="thumbnail">
                                                    <img src={item['image'] ? item['image'] : bidProfile} alt="" />
                                                </div>
                                                <div>
                                                    <h5>{item['name'] ? item['name'] : "-"}<span>place a bid</span></h5>
                                                    <span className='hours'>{moment(new Date(item['createdAt']), "YYYYMMDD").fromNow()}</span>
                                                </div>
                                            </div>
                                            <div className="col-right">
                                                <span><b>
                                                    {item?.chain == 11155111 &&  `${item?.price } ETH` } 
                                                    {item?.chain == 1 &&  `${item?.price } ETH` } 
                                                    {item?.chain == 56 &&  `${item?.price } BNB` } 
                                                    {item?.chain == 97 &&  `${item?.price } BNB` } 
                                                    {item?.chain == 50 &&  `${item?.price } XDC` } 
                                                    {item?.chain == 51 &&  `${item?.price } XDC` } 
                                                    {item?.chain == 43114 &&  `${item?.price } AVAX` } 
                                                    {item?.chain == 43113 &&  `${item?.price } AVAX` } 
                                                    </b></span>
                                            </div>
                                        </li>
                                    </ul>
                                    )
                                    :
                                    <ul className='bid-list'>
                                        <li>
                                            <div style={{color:"white"}}>
                                                <span><b> No Bids </b> </span>
                                            </div>
                                        </li>
                                    </ul>
                                    }
                                </Tab>
                            </Tabs>
                            </div>
                        }
                    {
                        // &&  userNftHolding?.users?.role == "user"
                    startcountDown == false && countDown== false && 
                    userNftHolding?.status == "auction" 
                        ? 
                            countDown == false 
                            ?
                            props.publicAddress && userNftHolding?.users?.publicAddress.toLowerCase() == props.publicAddress.toLowerCase() &&
                            <button className='bid-btn' onClick={endAuction}><img src={bid} alt="" />Auction Ended</button>
                            :
                            props.publicAddress && userNftHolding?.users?.publicAddress.toLowerCase() !== props.publicAddress.toLowerCase() &&
                            <button className='bid-btn' onClick={placeBid}><img src={bid} alt="" />Place a bid</button>
                        :
                        props.publicAddress && userNftHolding?.users?.publicAddress.toLowerCase() == props.publicAddress.toLowerCase() 
                        ?
                            userNftHolding?.isMarketItem == true
                                ?
                                <button className='bid-btn' onClick={unListNft}><img src={bid} alt="" />Unlist Nft</button>
                                :
                                userNftHolding?.tokenType == "erc1155" &&  userNftHolding?.isMarketItem == false && userNftHolding?.mintAmount !== 0 ?
                                <>
                                    <button className='bid-btn' onClick={listNft}><img src={bid} alt="" />List Nft</button>
                                    <button className='bid-btn' onClick={handleShow}><img src={bid} alt="" />Transfer NFT</button>
                                    <button className='bid-btn' onClick={handleShow1}><img src={bid} alt="" />Auction NFT</button>
                                </>
                                :
                                userNftHolding?.tokenType == "erc721" &&  userNftHolding?.isMarketItem == false &&
                                <>
                                    <button className='bid-btn' onClick={listNft}><img src={bid} alt="" />List Nft</button>
                                    <button className='bid-btn' onClick={handleShow}><img src={bid} alt="" />Transfer NFT</button>
                                    <button className='bid-btn' onClick={handleShow1}><img src={bid} alt="" />Auction NFT</button>
                                </>
                        :
                            userNftHolding?.isMarketItem == true 
                                ?
                                    <button className='bid-btn' onClick={buyNft}><img src={bid} alt=""/>Buy</button>
                                :
                                    <button className='bid-btn'><img src={bid} alt="" disable/>Not Listed</button>
                    }
                    </div>
                </div>
            </div>
        </section>

        <Footer />

        <Modal className="common-modal signin" show={transferModal} onHide={handleClose}>
            <Modal.Header closeButton>
                Receiver Address
            </Modal.Header>

            <form onSubmit={transferNft}>
                <div class="mb-3">
                    <input placeholder="Wallet Address" type="text" id="formBasicAddress" class="form-control" onChange={e=>setReceiverAddress(e.target.value)} value={receiverAddress}/>
                </div>

                <div>
                    <button className="common-btn" onClick={transferNft}>Transfer</button>
                </div>
            </form>
        </Modal>

        <Modal className="common-modal signin" show={auctionModal} onHide={handleClose1}>
            <Modal.Header closeButton>
                Set Time and Date
            </Modal.Header>
            
            <form onSubmit={createAuction}>
                <div class="mb-3">
                    <span>Start Time</span>
                    <input placeholder="Date and Time" type="datetime-local" id="formBasicTime" class="form-control" onChange={e=>setStartTime(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <span>End Time</span>
                    <input placeholder="Date and Time" type="datetime-local" id="formBasicTime" class="form-control" onChange={e=>setAuctionTime(e.target.value)}/>
                </div>

                <div>
                    <button className="common-btn" onClick={createAuction}>Set Auction</button>
                </div>
            </form>
        </Modal>
    </>
    );
};

const mapDispatchToProps = { getSingleNft, setLoader, listNft, unListNft, transferNft, createAuction, getBids, placeBid, endAuction };

const mapStateToProps = ({ Auth }) => {
  let { isLogin, singleNft,publicAddress,setBids,} = Auth;
  console.log("************** singleNft",singleNft);
  return { isLogin, singleNft,publicAddress,setBids }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);

