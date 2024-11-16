import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import EventBus from 'eventing-bus';
import { web3 } from "../store/web3";
import { connectMetamask, getNetworkSymbol} from "../store/walletConnect";
import { networkType } from "../store/config";

import { logout, setAddress, setNetwork, getNonce, login} from '../store/actions/Auth';

const logo = "/images/logo-white.png";

const Header = (props) => {

    let [login,setLogin] = useState(false);

    const handleWalletChanges = (network) => {
        if(network){
            connectMetamask(network, networkType)
            .then(async ({address}) => {
              if(address && !login){
                  let chain = await web3.eth.getChainId();
                  chain = web3.utils.hexToNumber(chain);
                  chain = Number(chain);
                  props.setAddress({publicAddress:address,chain});
                  props.getNonce({publicAddress:address,chain});
                  setLogin(true);
                //   return EventBus.publish("success", `wallet connect successfuly`); 
              }
            })
            .catch((error) => {
              return EventBus.publish("error", `failed to connect wallet: ${error}`); 
          });
        }
    };

    const handleChainChange = async (chainId) => {
        const networkId = web3.utils.hexToNumber(chainId);
        const networkSymbol = await getNetworkSymbol(networkId.toString());
        if(!["eth","bnb","avax","xdc"].includes(networkSymbol)) return EventBus.publish("error", `Please select eth, bnb, xdc or avax`); 
        if(networkSymbol !== props.network) props.setNetwork(networkSymbol);
        handleWalletChanges();
    };

    const handleWalletChange = async (accounts) => {
        handleWalletChanges();
    };

    const loginWallet = async(nonce) => {
        try {
          const accounts = await web3.eth.getAccounts();
          const address = accounts[0];
          if(address){
            let chain = await web3.eth.getChainId();
            chain = web3.utils.hexToNumber(chain);
            chain = Number(chain);
            const signature = await web3.eth.personal.sign(`eplison marketplace signature ${nonce}`, address);
            if(address && signature) props.login({ address, signature, nonce, chain})
          }
        } catch (error) {
            return EventBus.publish("error", `failed to create signature: ${error}`); 
        }
    }

    useEffect(()=>{
        if(props.nonce && props.isChangeNetwork === true) loginWallet(props.nonce);
    },[props.nonce])

    useEffect(()=>{
        if (typeof window.ethereum !== 'undefined') {
            // Register the event listener when the component mounts
            window.ethereum.on('chainChanged',()=>{
                setLogin(false)
                props.logout();
            });
            // Listen for accounts changed event
            window.ethereum.on('accountsChanged',()=>{
                setLogin(false)
                props.logout();
            });
        }
    },[]);

    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
          if (props.isChangeNetwork === true) {
            handleWalletChanges(props.network);
            setLogin(false);
          } 
        }
      }, [props.isChangeNetwork]);

  return (
    <>
        <header>
            <div className="container">
                <nav className="navbar navbar-expand-xl">
                    <NavLink className="navbar-brand" to="/">
                        {/* <img src={logo} alt="" /> */}
                        Logo
                    </NavLink>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to="/">Home</NavLink>
                            </li>

                            <li className="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Explore
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li> <NavLink class="dropdown-item" to="/explore">Explore</NavLink></li>
                                    <li> <NavLink class="dropdown-item" to="/auctions">Auctions</NavLink></li>
                                    {/* <li> <NavLink class="dropdown-item" to="/itemdetail">Item Details</NavLink></li>
                                    <li> <NavLink class="dropdown-item" to="/drops">Drops</NavLink></li> */}
                                </ul>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/activity">Activity</NavLink>
                            </li>

                            {/* <li className="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Community
                                </a>

                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li> <NavLink class="dropdown-item" to="/blog">Blog</NavLink></li>
                                    <li> <NavLink class="dropdown-item" to="/blogdetail">Blog Details</NavLink></li>
                                    <li> <NavLink class="dropdown-item" to="/helpcenter">Help Center</NavLink></li>
                                </ul>
                            </li> */}
                        {props.isLogin &&
                            <li className="nav-item">
                                <NavLink to="/userprofile">Profile</NavLink>
                            </li>
                        }

                            {/* <li className="nav-item">
                                <NavLink to="/contact">Contact</NavLink>
                            </li> */}
                        </ul>
                    </div>
                    {/* <div className="right">
                        
                    </div> */}

                    <div className="right">
                        <select className="common-btn" onChange={e=>props.setNetwork(e.target.value)} value={props.network}>
                            <option value={"bnb"}>BNB</option>
                            <option value={"eth"}>ETH</option>
                            <option value={"avax"}>AVAX</option>
                            <option value={"xdc"}>XDC</option>
                        </select>

                        <NavLink className="common-btn" onClick={()=>handleWalletChanges(props.network)}>
                            <img src="./images/wallet-icon-white.png" alt="" />
                            {props?.publicAddress ? props.publicAddress.slice(0,6)+"..."+props.publicAddress.slice(38,42) : "Connect Wallet"}
                        </NavLink>
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-bar"></span>
                        <span className="navbar-toggler-bar"></span>
                        <span className="navbar-toggler-bar"></span>
                    </button>
                </nav>
            </div> 
        </header>
        <Outlet />
    </>
  )
}


const mapDispatchToProps = { logout, setAddress, setNetwork,getNonce, login };

const mapStateToProps = ({ Auth }) => {
  let { publicAddress, network, nonce, isLogin,isNonce, isChangeNetwork} = Auth;
  return { publicAddress, network, nonce, isLogin,isNonce, isChangeNetwork }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

