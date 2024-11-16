import {React , useState} from 'react';
import { NavLink, useNavigate, Link } from "react-router-dom";
import {Tabs, Tab} from 'react-bootstrap';
import Header from "../components/Header";
import Footer from "../components/Footer";

const HelpCenter = () => {
    const navigate = useNavigate();
    const [key, setKey] = useState('home');
    return(
    <>
        <Header />

        <section className="banner-inner">
            <div className="container">
                <div className="content">
                    <h1>Help Center</h1>

                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li class="breadcrumb-item active" aria-current="page">Help Center</li>
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
                            <h2>How can we help you?</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.</p>
                            <form>
                                <div className="form-group">
                                    <input type="text" placeholder='Type your question here' />
                                    <button><img src="./images/search.svg" alt="" /></button>
                                </div>
                            </form>
                            <p>Or choose a categories to quickly find the help you need</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                        <div className="box">
                            <img src="./images/get-started.svg" alt="" />
                            <h4>Getting Started</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                        <div className="box">
                            <img src="./images/creating.svg" alt="" />
                            <h4>Creating</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                        <div className="box">
                            <img src="./images/buying.svg" alt="" />
                            <h4>Buying</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                        <div className="box">
                            <img src="./images/selling.svg" alt="" />
                            <h4>Selling</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                        <div className="box">
                            <img src="./images/partners.svg" alt="" />
                            <h4>Partners</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                        <div className="box">
                            <img src="./images/developers.svg" alt="" />
                            <h4>Developers</h4>
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
export default HelpCenter; 