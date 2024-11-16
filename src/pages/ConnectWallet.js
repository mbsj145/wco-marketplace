import {React , useState} from 'react';
import { NavLink, useNavigate, Link } from "react-router-dom";
import {Tabs, Tab} from 'react-bootstrap';
import Header from "../components/Header";
import Footer from "../components/Footer";

const ConnectWallet = () => {
    const navigate = useNavigate();
    const [key, setKey] = useState('home');
    return(
    <>
        <Header />

        <section className="banner-inner">
            <div className="container">
                <div className="content">
                    <h1>Connect Wallet</h1>

                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li class="breadcrumb-item active" aria-current="page">Connect Wallet</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </section>

        <section className="activity help-center"> 
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="detail">
                            <h2>Connect your wallet</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                        <div className="box">
                            <img src="./images/metamask.png" alt="" />
                            <h4>Meta Mask</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6 ">
                        <div className="box">
                            <img src="./images/bitski.png" alt="" />
                            <h4>Bitski</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6 ">
                        <div className="box">
                            <img src="./images/fortmatic.png" alt="" />
                            <h4>Fortmatic</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6 ">
                        <div className="box">
                            <img src="./images/wallet-connect.png" alt="" />
                            <h4>Wallet Connect</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6 ">
                        <div className="box">
                            <img src="./images/coinbase-wallet.png" alt="" />
                            <h4>Coinbase Wallet</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6 ">
                        <div className="box">
                            <img src="./images/authereum.png" alt="" />
                            <h4>Authereum</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6 ">
                        <div className="box">
                            <img src="./images/kaikas.png" alt="" />
                            <h4>Kaikas</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6 ">
                        <div className="box">
                            <img src="./images/torus.png" alt="" />
                            <h4>Torus</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </>
    );
};
export default ConnectWallet; 