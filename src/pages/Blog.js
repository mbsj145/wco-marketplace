import {React , useState} from 'react';
import { NavLink, useNavigate, Link } from "react-router-dom";
import {Tabs, Tab} from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Blog= () => {
    const navigate = useNavigate();
    const [key, setKey] = useState('home');
    return(
    <>  
        <Header />

        <section className="banner-inner">
            <div className="container">
                <div className="content">
                    <h1>blog</h1>

                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li class="breadcrumb-item active" aria-current="page">Blog</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </section>

        <section class="blogs-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-xl-4 col-md-6">
                        <div className="collection-box">
                            <div className="img-wrap">
                                <img src="./images/collection-img.png" alt="" />
                            </div>

                            <div className="content">
                                <div className="creator-wrap">
                                    <div className="left">
                                        <img src="./images/collection-img.png" alt="" />

                                        <div className="creator-info">
                                            <span>Creator</span>

                                            <h4>SalvadorDali</h4>
                                        </div>
                                    </div>

                                    <div className="date">
                                        Feb 19, 2021
                                    </div>
                                </div>

                                <h3>"Hamlet Contemplates Yorick's...</h3>

                                <p>Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...</p>

                                <a href="#" className="common-btn border-white">Read More</a>
                            </div>
                        </div>
                     </div>

                     <div className="col-xl-4 col-md-6">
                        <div className="collection-box">
                            <div className="img-wrap">
                                <img src="./images/collection-img.png" alt="" />
                            </div>

                            <div className="content">
                                <div className="creator-wrap">
                                    <div className="left">
                                        <img src="./images/collection-img.png" alt="" />

                                        <div className="creator-info">
                                            <span>Creator</span>

                                            <h4>SalvadorDali</h4>
                                        </div>
                                    </div>

                                    <div className="date">
                                        Feb 19, 2021
                                    </div>
                                </div>

                                <h3>"Hamlet Contemplates Yorick's...</h3>

                                <p>Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...</p>

                                <a href="#" className="common-btn border-white">Read More</a>
                            </div>
                        </div>
                     </div>

                     <div className="col-xl-4 col-md-6">
                        <div className="collection-box">
                            <div className="img-wrap">
                                <img src="./images/collection-img.png" alt="" />
                            </div>

                            <div className="content">
                                <div className="creator-wrap">
                                    <div className="left">
                                        <img src="./images/collection-img.png" alt="" />

                                        <div className="creator-info">
                                            <span>Creator</span>

                                            <h4>SalvadorDali</h4>
                                        </div>
                                    </div>

                                    <div className="date">
                                        Feb 19, 2021
                                    </div>
                                </div>

                                <h3>"Hamlet Contemplates Yorick's...</h3>

                                <p>Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...</p>

                                <a href="#" className="common-btn border-white">Read More</a>
                            </div>
                        </div>
                     </div>

                     <div className="col-xl-4 col-md-6">
                        <div className="collection-box">
                            <div className="img-wrap">
                                <img src="./images/collection-img.png" alt="" />
                            </div>

                            <div className="content">
                                <div className="creator-wrap">
                                    <div className="left">
                                        <img src="./images/collection-img.png" alt="" />

                                        <div className="creator-info">
                                            <span>Creator</span>

                                            <h4>SalvadorDali</h4>
                                        </div>
                                    </div>

                                    <div className="date">
                                        Feb 19, 2021
                                    </div>
                                </div>

                                <h3>"Hamlet Contemplates Yorick's...</h3>

                                <p>Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...</p>

                                <a href="#" className="common-btn border-white">Read More</a>
                            </div>
                        </div>
                     </div>

                     <div className="col-xl-4 col-md-6">
                        <div className="collection-box">
                            <div className="img-wrap">
                                <img src="./images/collection-img.png" alt="" />
                            </div>

                            <div className="content">
                                <div className="creator-wrap">
                                    <div className="left">
                                        <img src="./images/collection-img.png" alt="" />

                                        <div className="creator-info">
                                            <span>Creator</span>

                                            <h4>SalvadorDali</h4>
                                        </div>
                                    </div>

                                    <div className="date">
                                        Feb 19, 2021
                                    </div>
                                </div>

                                <h3>"Hamlet Contemplates Yorick's...</h3>

                                <p>Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...</p>

                                <a href="#" className="common-btn border-white">Read More</a>
                            </div>
                        </div>
                     </div>

                     <div className="col-xl-4 col-md-6">
                        <div className="collection-box">
                            <div className="img-wrap">
                                <img src="./images/collection-img.png" alt="" />
                            </div>

                            <div className="content">
                                <div className="creator-wrap">
                                    <div className="left">
                                        <img src="./images/collection-img.png" alt="" />

                                        <div className="creator-info">
                                            <span>Creator</span>

                                            <h4>SalvadorDali</h4>
                                        </div>
                                    </div>

                                    <div className="date">
                                        Feb 19, 2021
                                    </div>
                                </div>

                                <h3>"Hamlet Contemplates Yorick's...</h3>

                                <p>Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...</p>

                                <a href="#" className="common-btn border-white">Read More</a>
                            </div>
                        </div>
                     </div>
                </div>

                <div className="mt-4 text-center">
                    <a className="common-btn border-white">
                        Load More
                    </a>
                </div>
            </div>
        </section>

        <Footer />
    </>
    );
};
export default Blog;