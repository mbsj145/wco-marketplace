import React from 'react';
import { Link } from 'react-router-dom';

const facebook = "/images/facebook.png";
const twitter = "/images/twitter.png";
const instagram = "/images/instagram-white-icon.webp";
const youtube = "/images/youtube.png";
const cifiLogo = "/images/cifi-logo.png";

const Footer= () => (
    <footer>
        <div className="container">
            <div className="inner">
                <div className="footer-about">
                    <a href="#" className="footer-logo">
                        Logo
                        {/* <img src="/images/logo-white.png" alt="" /> */}
                    </a>

                    <p>Explore the realm of exclusive NFTs to own or trade a piece of virtual history using our exceptional NFT marketplace.</p>

                    <ul className="social-icons">
                        <li>
                            <a href="#" target='_blank'>
                                <img src={facebook} alt="" />
                            </a>
                        </li>

                        <li>
                            <a href="#" target='_blank'>
                                <img src={twitter} alt="" />
                            </a>
                        </li>

                        <li>
                            <a href="#" target='_blank'>
                                <img src={instagram} alt="" />
                            </a>
                        </li>

                        <li>
                            <a href="#" target='_blank'>
                                <img src={youtube} alt="" />
                            </a>
                        </li>
                    </ul>
                </div>
{/* 
                <div className="links account">
                    <h3>My Account</h3>

                    <ul>
                        <li><Link to="">Authors</Link></li>
                        <li><a href="#">Collection</a></li>
                        <li><a href="#">Author Profile</a></li>
                        <li><a href="#">Create Collection</a></li>
                    </ul>
                </div> */}

                <div className="links resources">
                    <h3>Resources</h3>

                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/explore">Explore</Link></li>
                      
                    </ul>
                </div>

                <div className="links company">
                    <h3>Resources</h3>
                    <ul>
                        <li><Link to="/auctions">Auctions</Link></li>
                        <li><Link to="/activity">Activity</Link></li>
                    </ul>
                    {/* <ul>
                        <li><Link to={"/contact"}>Contact Us</Link></li>
                    </ul> */}
                </div>

                {/* <div className="subscribe">
                    <h3>Subscribe Us</h3>

                    <form>
                        <input type="email" placeholder='Info@yourgmail.com' />
                        <button type='submit'><img src="/images/send.png" alt="" /></button>
                    </form>
                </div> */}
            </div>
        </div>

        <div className='copyright'>
            <div className='container'>
                {/* <p>Powered by <a href='https://www.circularity.finance/' target='_blank'> <img src={cifiLogo} alt="" /> </a></p> */}
            </div>
        </div>      
    </footer>
);
export default Footer;