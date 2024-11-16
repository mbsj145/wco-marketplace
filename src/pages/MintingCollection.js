import React,{useEffect, useState} from 'react';
import { NavLink,Link, useNavigate,useParams } from "react-router-dom";
import { connect } from "react-redux";
import EventBus from 'eventing-bus';
import {Form, Button} from 'react-bootstrap';
import { CopyToClipboard } from "react-copy-to-clipboard";
import Header from '../components/Header';
import Footer from '../components/Footer';
import {makeTokens,web3} from "../store/contract";
import {setLoader,getSingleCollection,setSingleCollection , mintNFT721,mintNFT1155} from "../store/actions/Auth";
import ProgressBar from "@ramonak/react-progress-bar";

/********* import images ********/
const userImage = `/images/collection-img.png`;
const walletAddressCopy = `/images/wallet-address-copy.png`;
const faceBookPage = `/images/facebook-black.png`;
const collectionImage = `/images/img.png`;
const twitter = `/images/twitter-black.png`;
const googleBlack = `/images/google-black.png`;
const chatBlack = `/images/chat-black.png`;
const share = `/images/share.svg`;
const opetion = `/images/option.svg`;
const incrementicon = `/images/increment.png`;
const decrementicon = `/images/decrement.png`;

const MintingCollection = (props) => {
    let navigate = useNavigate();
    let [count, setCount] = useState(1);
    let [collection, setCollection] = useState();
    let [maxSupply, setMaxSupply] = useState(0);
    let [totalMint, setTotalMint] = useState(0);
    let [price, setPrice] = useState(0);
    let [token, setToken] = useState();
    let {chain,tokenAddress} = useParams();

    useEffect(()=>{
        props.setLoader({message:"Load minting engine",status:true});
        props.setSingleCollection({});
        props.getSingleCollection({chain,tokenAddress});
    },[tokenAddress]);

    const makeContract = async (contractAddress,type) => {
        let {ERC721ABI,ERC1155ABI} = await makeTokens();
        let Token = new web3.eth.Contract(type == "erc721" ? ERC721ABI : ERC1155ABI,contractAddress);
        if(type == "erc721" ) {
            let totalMint = await Token.methods.totalSupply().call();
            let maxSupply= await Token.methods.maxSupply().call();
            let price = await Token.methods.priceRecipient().call();
            if(maxSupply) setMaxSupply(maxSupply);
            if(totalMint) setTotalMint(totalMint);
            price = await web3.utils.fromWei(price.toString(),'ether');
            setPrice(price);
            setToken(Token);
        }else if(type == "erc1155" ) {
            let totalMint = await Token.methods.totalSupply(1).call();
            let maxSupply= await Token.methods.maxSupply().call();
            let price = await Token.methods.priceRecipient().call();
            if(maxSupply) setMaxSupply(maxSupply);
            if(totalMint) setTotalMint(totalMint);
            price = await web3.utils.fromWei(price.toString(),'ether');
            setPrice(price);
            setToken(Token);
        }
    }

    const mintNFT = async () => {
        try {
            if(props.singleCollection.tokenType == "erc721") {
                let nftIdPrevious =  await token.methods.walletOfOwner(props.publicAddress).call();
                props.setLoader({status:true, message:"Mint nft..."});
                let calculatePrice = Number(price) * Number(count)
                let wPrice = await web3.utils.toWei(calculatePrice.toString(), 'ether');
                web3.eth.sendTransaction({
                    from: props.publicAddress,
                    to: tokenAddress,
                    value: wPrice,
                    gas:5000000,
                    data: token.methods.mintNFT(props.publicAddress,count).encodeABI(),
                  }).on('transactionHash', (hash) => console.log(`************ tx =`, hash))
                    .on('receipt', async receipt => {
                    let nftIdNew =  await token.methods.walletOfOwner(props.publicAddress).call();
                    let filteredArray = [];
                    if(nftIdPrevious.length > 0) filteredArray = nftIdNew.filter((item) => !nftIdPrevious.includes(item));
                    else filteredArray = nftIdNew;
                    makeContract(tokenAddress,props.singleCollection.tokenType);
                    props.mintNFT721({tokenAddress,count:filteredArray,price});
                    }).on('error', e => {
                        console.log("**************** error",e)
                      props.setLoader({status:false});
                      EventBus.publish('error', `Unable to Upload NFT ${e}`);
                });
            }
            else if(props.singleCollection.tokenType == "erc1155"){
                props.setLoader({status:true, message:"Mint nft..."});
                let calculatePrice = Number(price) * Number(count)
                let wPrice = await web3.utils.toWei(calculatePrice.toString(), 'ether');
                web3.eth.sendTransaction({
                    from: props.publicAddress,
                    to: tokenAddress,
                    value: wPrice,
                    gas:5000000,
                    data: token.methods.mintNFT(props.publicAddress,1,count).encodeABI(),
                  }).on('transactionHash', (hash) => console.log(`************ tx =`, hash))
                    .on('receipt', async receipt => {
                    makeContract(tokenAddress,props.singleCollection.tokenType);
                    props.mintNFT1155({tokenAddress,mintAmount:count,price});
                    }).on('error', e => {
                        console.log("**************** error",e)
                      props.setLoader({status:false});
                      EventBus.publish('error', `Unable to Upload NFT ${e}`);
                });
            }
           } catch (error) {
                props.setLoader({status:false});
                return EventBus.publish('error', error);
           }
    }

    useEffect(()=>{
        if(Object.keys(props.singleCollection).length > 0){
            makeContract(props.singleCollection.tokenAddress,props.singleCollection.tokenType)
            setCollection(props.singleCollection);
        }
    },[props.singleCollection])

    async function copiedAddress() {
        EventBus.publish("success", "Collection Address Copied");
    }

    function incrementCount() {
        let totalcount = count + 1;
        if(totalcount > 5) return EventBus.publish("error", "You can mint 5 NFT");
        if(totalcount <= 0) setCount(1);
        else setCount(totalcount);
    }
    
    function decrementCount() {
        let totalcount = count - 1;
        if(totalcount <= 0) setCount(1);
        else setCount(totalcount);
    }

    function maxNFT(){
        totalMint = Number(totalMint);
        maxSupply = Number(maxSupply);
        if(maxSupply - totalMint > 5) setCount(5);
        else if(maxSupply - totalMint < 5 && maxSupply - totalMint > 0) setCount(maxSupply - totalMint);
        else if(maxSupply - totalMint <= 0) return EventBus.publish("error", "All Nft Minted"); 
    }

    return(
    <>  
        <Header />

        <section className="banner-inner">
            <div className="container">
                <div className="content">
                    <h1>{collection?.collectionName ? collection['collectionName'] :"Loading" }</h1>

                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li class="breadcrumb-item"><Link to="/collection/:chain/:tokenAddress">Collection</Link></li>
                            <li class="breadcrumb-item active" aria-current="page">{collection?.collectionName ? collection['collectionName'] :"Loading" }</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </section>
{/* 
        <section className="profile">
            <div className="container">
                <div className="inner">
                    <div className="inner-wrap">
                        <div className="img-wrap">
                            <img src={userImage} alt="" />
                        </div>

                        <div className="right">
                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="content">
                                        <h2>{collection?.collectionName ? collection['collectionName'] :"Loading" }</h2>

                                        <p>{collection?.users?.name ? collection['users']['name'] :"Loading" }</p>

                                        <a className="wallet-address">
                                        <span>{collection?.tokenAddress ? collection['tokenAddress']: "Loading" }</span> 
                                            <CopyToClipboard
                                                text={collection?.tokenAddress ? collection['tokenAddress'] : ""}
                                                onCopy={copiedAddress}
                                                >
                                                <img src={walletAddressCopy} alt="" />
                                            </CopyToClipboard>
                                        </a>     
                                    </div>
                                </div>

                                <div className="col-lg-5">
                                    <div className="wrap">
                                        <ul className="social-icons">
                                            <li>
                                                {collection?.website && collection?.website !== undefined &&
                                                    <a href={collection?.website}>
                                                        <img src={faceBookPage} alt="" />
                                                    </a>
                                                }
                                            </li>

                                            <li>
                                            {collection?.discord && collection?.discord !== undefined &&
                                                <a href={collection?.discord}>
                                                    <img src={twitter} alt="" />
                                                </a>
                                            }
                                            </li>

                                            <li>
                                                {collection?.instagram && collection?.instagram !== undefined &&
                                                    <a href={collection?.instagram}>
                                                        <img src={googleBlack} alt="" />
                                                    </a>
                                                }
                                            </li>

                                            <li>
                                                {collection?.medium && collection?.medium !== undefined &&
                                                    <a href={collection?.medium}>
                                                        <img src={chatBlack} alt="" />
                                                    </a>
                                                }
                                            </li>

                                            <li>
                                                {collection?.telegram && collection?.telegram !== undefined &&
                                                    <a href={collection?.telegram}>
                                                        <img src={chatBlack} alt="" />
                                                    </a>
                                                }
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="profile-bottom">
                        
                    </div> 
                </div>
            </div>
        </section>
         */}
        <section className='item-detail minting-collection'> 
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 ">
                        <div className="main-img-wrap">
                         <img src={collection?.profileImage ? collection['profileImage'] : collectionImage} alt="" />
                        </div>
                    </div>
                    <div className="col-lg-6 ps-xl-2">
                        <h1>“ {collection?.collectionName ? collection['collectionName'] :"Loading"} ”</h1>
                        <div className="item-interaction">
                            <div className="item-views">
                                <span>
                                {collection?.chain == 11155111 &&  "Ethereum" } 
                                {collection?.chain == 1 &&  "Ethereum" } 
                                {collection?.chain == 56 &&  "Binance" } 
                                {collection?.chain == 97 &&  "Binance" } 
                                {collection?.chain == 50 &&  "XDC" } 
                                {collection?.chain == 51 &&  "XDC" } 
                                {collection?.chain == 43114 &&  "AVAX" } 
                                {collection?.chain == 43113 &&  "AVAX" } 
                                </span>
                                <span>{collection?.tokenType ? collection['tokenType'].toUpperCase():"Loading"}</span>
                            </div>
                            {/* <div className="share-option">
                                <button><img src={share} alt="" /></button>
                                <button><img src={opetion} alt="" /></button>
                            </div> */}
                        </div>
                        <p>{collection?.collectionDesc ? collection['collectionDesc']:"Loading"}</p>

                        {/* <a className="see-more" href="#">See more</a> */}

                        <div className="progress-bar-wrap">
                            <div className="progressbar-head">
                                <span><b>{((Number(totalMint)/Number(maxSupply))*100).toFixed(2)} %</b> Minted</span>

                                <span>{totalMint}/{maxSupply}</span>                       
                            </div>
                            <ProgressBar className="progress-bar" completed={(Number(totalMint)/Number(maxSupply))*100} maxCompleted={100} />
                        </div>

                        <div className="public-stage-wrapper">
                            <h3>
                                Public Stage                 
                            </h3>

                            <Form className="inner">
                                <div className="limit-wrap">
                                    <div className="info">
                                        <p>

                                            {collection?.chain == 11155111 &&  `${price} ETH` } 
                                            {collection?.chain == 1 &&  `${price} ETH` } 
                                            {collection?.chain == 56 &&  `${price} BNB` } 
                                            {collection?.chain == 97 &&  `${price} BNB` } 
                                            {collection?.chain == 50 &&  `${price} XDC` } 
                                            {collection?.chain == 51 &&  `${price} XDC` } 
                                            {collection?.chain == 43114 &&  `${price} AVAX` } 
                                            {collection?.chain == 43113 &&  `${price} AVAX` } 

                                        </p>

                                        <span>Limit 5 per wallet</span>
                                    </div>

                                    <Form.Group className="form-group">
                                        <img className="increment" onClick={decrementCount} src={decrementicon} alt="" />

                                        <Form.Control type="number" value={count} />

                                        <img  className="decrement" onClick={incrementCount} src={incrementicon} alt="" />
                                    </Form.Group>

                                    <a className="common-btn white" onClick={maxNFT}>Max</a>
                                </div>

                                <a className="common-btn" onClick={mintNFT}>Mint</a>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </>
    );
};

const mapDispatchToProps = { setLoader, getSingleCollection,setSingleCollection, mintNFT721,mintNFT1155 };

const mapStateToProps = ({ Auth }) => {
  let { isLogin, chain, publicAddress, singleCollection} = Auth;
  return { isLogin, chain, publicAddress, singleCollection }
}

export default connect(mapStateToProps, mapDispatchToProps)(MintingCollection);