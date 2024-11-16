import {React , useState} from 'react';
import { NavLink, useNavigate, Link } from "react-router-dom";
import {Tabs, Tab} from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogDetail = () => {
    return(
    <>
        <Header />

        <section className="banner-inner">
            <div className="container">
                <div className="content">
                    <h1>Blog Details</h1>

                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li class="breadcrumb-item active" aria-current="page">Blog Details</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </section>

        <section className='blog-detail'> 
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <h2>I Believe everyone can be a designer as long they love to create design</h2>
                        <div className="designer-interview">
                            <div className="title-row">
                                <div className="col-left">
                                    <h5>DESIGNER INTERVIEW</h5>
                                    <span>AUGUST CHAPTER</span>
                                </div>
                                <div className="col-right">
                                    <ul>
                                        <li>
                                            <h5>WRITER</h5>
                                            <span>DWINAWAN</span>
                                        </li>
                                        <li>
                                            <h5>DATE</h5>
                                            <span>AUGUST 11, 2021</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="detail-row">
                                <div className="thumbnail">
                                    <img src="./images/designer-img.png" alt="" />
                                </div>
                            </div>
                            <div className="detail-row">
                                <h3>What is the most fun thing to become a designer?</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Cupidatat non
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                                <div className="detail-row-inner">
                                    <img src="./images/designer-img.png" alt="" />
                                    <img src="./images/designer-img.png" alt="" />
                                </div>
                            </div>
                            <div className="detail-row">
                                <h3>How is your daily routine?</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Cupidatat non
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                                    <img src="./images/designer-img2.png" alt="" />
                            </div>
                            <div className="detail-row">
                                <h3>Middle Post Heading</h3>
                                <p>Middle Post Heading<br/>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ,<br/>
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                                <div className="social-links">
                                    <div className="tags">
                                        <h5>Tags:</h5>
                                        <ul>
                                            <li>Bitcoin, </li>
                                            <li>Token, </li>
                                            <li>Wallet</li>
                                        </ul>
                                    </div>
                                    <div className="share">
                                        <h5>Share:</h5>
                                        <ul>
                                            <li><img src="./images/facebook.svg" alt="" /></li>
                                            <li><img src="./images/twitter.svg" alt="" /></li>
                                            <li><img src="./images/twitch.svg" alt="" /></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="comment">
                                <h3>Leave a comment</h3>
                                <form>
                                    <div className="form-group">
                                        <input type="text" placeholder='Name' />
                                        <input type="text" placeholder='Email *' />
                                    </div>
                                    <textarea placeholder='Message'></textarea>
                                    <button type='submit'>Send comment</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 ps-5">
                        <div className="post">
                            <h3>Recent post</h3>
                            <ul>
                                <li>
                                    <div className="thumbnail">
                                        <img src="./images/post.png" alt="" />
                                    </div>
                                    <div className="content">
                                        <h5>6 Make Mobile Website Faster</h5>
                                        <div>
                                            <p>Lorem ipsum dolor sit amer....</p>
                                            <span>August 10, 2021</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="thumbnail">
                                        <img src="./images/post.png" alt="" />
                                    </div>
                                    <div className="content">
                                        <h5>Experts Web Design Tips</h5>
                                        <div>
                                            <p>Lorem ipsum dolor sit amer....</p>
                                            <span>August 22, 2021</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="thumbnail">
                                        <img src="./images/post.png" alt="" />
                                    </div>
                                    <div className="content">
                                        <h5>Importance Of Web Design</h5>
                                        <div>
                                            <p>Lorem ipsum dolor sit amer....</p>
                                            <span>August 20, 2021</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="thumbnail">
                                        <img src="./images/post.png" alt="" />
                                    </div>
                                    <div className="content">
                                        <h5>Avoid These Erros In UI Design</h5>
                                        <div>
                                            <p>Lorem ipsum dolor sit amer....</p>
                                            <span>August 12, 2021</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="tag">
                            <h3>Popular Tag</h3>
                            <ul>
                                <li>Bitcoin</li>
                                <li>NFT</li>
                                <li>Bids</li>
                                <li>Digital</li>
                                <li>Arts</li>
                                <li>Marketplace</li>
                                <li>Token</li>
                                <li>Wallet</li>
                                <li>Crypto</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </>
    );
};
export default BlogDetail;