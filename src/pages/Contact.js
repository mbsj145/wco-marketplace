import {React , useState} from 'react';
import { NavLink, useNavigate, Link } from "react-router-dom";
import {Form, Button} from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
    const navigate = useNavigate();
    const [key, setKey] = useState('home');
    return(
    <>
        <Header />

        <section className="banner-inner">
            <div className="container">
                <div className="content">
                    <h1>Contact</h1>

                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li class="breadcrumb-item active" aria-current="page">Contact</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </section>

        <section className='activity signin'> 
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Drop Us a message</h2>

                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Control type="text" placeholder="Your Full Name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Your Email Addres" />
                            </Form.Group>

                            <Form.Select  className="mb-3" controlId="formBasicSubject">
                                <option>Select Subject</option>
                                <option>Subject 1</option>
                                <option>Subject 2</option>
                                <option>Subject 3</option>
                            </Form.Select>

                            <Form.Group className="mb-3" controlId="formBasicTextarea">
                                <Form.Control as="textarea" placeholder="Message" />
                            </Form.Group>

                            <Button className="submit-btn" variant="primary" type="submit">
                                Send Message
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
export default Contact;