import {React , useState} from 'react';
import { NavLink, useNavigate, Link } from "react-router-dom";
import {Form, Button} from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SignUp = () => {
    const navigate = useNavigate();
    const [key, setKey] = useState('home');
    return(
    <>
        <Header />

        <section className="banner-inner">
            <div className="container">
                <div className="content">
                    <h1>Signup</h1>

                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li class="breadcrumb-item active" aria-current="page">Signup</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </section>

        <section className='activity signin'> 
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Sigup to NFTs</h2>
                        <div className="border-content">
                            <span>Login with Social</span>
                        </div>
                        <div className="social-buttons">
                            <button><img src="./images/google-icon.svg" alt="" /> Google</button>
                            <button><img src="./images/facebook-icon.svg" alt="" /> Facebook</button>
                        </div>
                        <div className="border-content">
                            <span>Or login with email</span>
                        </div>

                        <Form>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Control type="text" placeholder="Your Full Name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Your Email Address" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Set Your Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Check type="checkbox" label="Remember me" />
                                    </div>
                                    <div className="col-md-6 text-end">
                                        <button className="forget-btn">Forgot Password ?</button>
                                    </div>
                                </div>
                            </Form.Group>
                            <Button className="submit-btn" variant="primary" type="submit">
                                SignUp
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </>
    );
};
export default SignUp;