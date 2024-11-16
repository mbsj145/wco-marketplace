import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import EventBus from 'eventing-bus';
import { Tabs, Tab, Placeholder } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { setLoader, updateCollection, updateBackground, updateLogo, getCollectionDetails } from "../store/actions/Auth";

const alternate = "/images/alternate.jpg";
const collectionImage = "/images/collection-img.png";
const editIcon = "/images/edit-icon.png";
const aaa = "/images/auction-img-1.png";

const EditCollection = (props) => {
    const navigate = useNavigate();
    let { tokenAddress, chain, type } = useParams();

    let [profile, setProfile] = useState();
    let [background, setBackground] = useState();
    let [name, setName] = useState("");
    let [desc, setDesc] = useState("");
    let [website, setWebsite] = useState("");
    let [discord, setDiscord] = useState("");
    let [instagram, setInstagram] = useState("");
    let [medium, setMedium] = useState("");
    let [telegram, setTelegram] = useState("");

    let [collection, setCollection] = useState();

    useEffect(() => {
        props.setLoader({message:"Load collection details...",status: true});
        props.getCollectionDetails({ tokenAddress, chain });
    }, [props.chain]);

    useEffect(() => {
        if (Object.keys(props.singleCollectionDetails).length > 0) {
            let { collectionDetail } = props.singleCollectionDetails;
            let {collectionName,collectionDesc,website,discord,instagram,medium,telegram} = collectionDetail;
            setCollection(collectionDetail);
            setName(collectionName ? collectionName : "");
            setDesc(collectionDesc ? collectionDesc : "");
            setWebsite(website ? website : "");
            setDiscord(discord ? discord : "");
            setInstagram(instagram ? instagram : "");
            setMedium(medium ? medium : "" );
            setTelegram(telegram ? telegram : "");
        }
    }, [props.singleCollectionDetails, props.chain]);

    const uplaodLogo = (e) => {
        try {
            let reader = new FileReader();
            reader.onload = async (event) => {
                setProfile(event.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
            setProfile(e.target.files[0]);
            profile = e.target.files[0]
            if (!profile) return EventBus.publish('error', `Please upload logo image`);
            props.setLoader({message:"Update profile image...", status:true});
            const formData = new FormData();
            formData.append('tokenAddress', tokenAddress);
            formData.append('profile', profile);
            props.updateLogo(formData);
        } catch (error) {
            console.log("********************** error", error);
            props.setLoader({ status: false });
            return EventBus.publish('error', error);
        }
    }

    const uplaodBG = (e) => {
        try {
            let reader = new FileReader();
            reader.onload = async (event) => {
                setBackground(event.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
            setBackground(e.target.files[0]);
            background = e.target.files[0]
            if (!background) return EventBus.publish('error', `Please upload background image`);
            props.setLoader({message:"Update background image...", status:true});
            const formData = new FormData();
            formData.append('tokenAddress', tokenAddress);
            formData.append('background', background);
            props.updateBackground(formData);
        } catch (error) {
            console.log("********************** error", error);
            props.setLoader({ status: false });
            return EventBus.publish('error', error);
        }
    }

    const updateDetail = async (e) => {
        try {
            e.preventDefault();
            if (Object.keys(collection).length > 0) {
                props.setLoader({ message: 'Updating collection details...', status: true });
                props.updateCollection({
                    tokenAddress: tokenAddress,
                    collectionName: name ? name : collection.name,
                    collectionDesc: desc ? desc : collection.desc,
                    website: website ? website : collection.website,
                    telegram: telegram ? telegram : collection.telegram,
                    instagram: instagram ? instagram : collection.instagram,
                    medium: medium ? medium : collection.medium,
                    discord: discord ? discord : collection.discord
                });
            } else {
                return EventBus.publish('error', "Could not fetch previous details");
            }
        } catch (error) {
            console.log("********************** error", error);
            props.setLoader({ status: false });
            return EventBus.publish('error', error);
        }
    }

    const handleBgError = () => {
        collection['bgImage'] = collectionImage
        setCollection(...collection, collection['bgImage'] = collectionImage)
    }

    const handleLogoError = () => {
        collection['profileImage'] = alternate
        setCollection(...collection, collection['profileImage'] = alternate)
    }

    useEffect(()=>{
        if(!props.isLogin) return navigate("/");
    },[props.isLogin])

    return (
        <>
            <Header />

            <section className="profile edit-collection">
                <div className="container">
                    <div className="inner">
                        <div className="inner-wrap">
                            <Form className="img-wrap">
                                <img className="bg-image" src={profile ? profile : collection?.['profileImage'] ? collection?.['profileImage'] : collectionImage} onError={() => handleLogoError()} alt="" />
                                <Form.Control type="file" accept="image/*" onChange={uplaodLogo} />
                                <img className="edit-icon" src={editIcon} alt="" />
                            </Form>

                            <Form className="background-img-wrap">
                                <Form.Control type="file" accept="image/*" onChange={uplaodBG} />
                                <img className="edit-icon" src={editIcon} alt="" />
                            </Form>

                            <img className="bg-image" src={background ? background : collection?.['bgImage'] ? collection?.['bgImage'] : collectionImage} onError={() => handleBgError()} alt="" />
                        </div>

                        <div className="profile-bottom">

                        </div>
                    </div>

                    <div className='signin'>
                        <Form onSubmit={updateDetail}>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Control type="text" maxLength="20" onChange={e => setName(e.target.value)} value={name}  placeholder = "Title"/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicTextarea">
                                <Form.Control as="textarea" maxLength="250" onChange={e => setDesc(e.target.value)} value={desc} placeholder = "Description"/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicWebsite">
                                <Form.Label>Links</Form.Label>
                                <Form.Control type="url"
                                onChange={e=>{
                                    let inputValue = e.target.value;
                                    if (inputValue && !inputValue.startsWith('http://') && !inputValue.startsWith('https://')) {
                                      inputValue = 'https://' + inputValue;
                                      setWebsite(inputValue) 
                                    }else{
                                        setWebsite(e.target.value) 
                                    }
                                }}
                                value={website} placeholder= "Website link" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicDiscord">
                                <Form.Control type="url" 
                                 onChange={e=>{
                                    let inputValue = e.target.value;
                                    if (inputValue && !inputValue.startsWith('http://') && !inputValue.startsWith('https://')) {
                                      inputValue = 'https://' + inputValue;
                                      setDiscord(inputValue) 
                                    }else{
                                        setDiscord(e.target.value) 
                                    }
                                }}
                                value={discord} placeholder="Discord id" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicInstagram">
                                <Form.Control type="url" onChange={e=>{
                                    let inputValue = e.target.value;
                                    if (inputValue && !inputValue.startsWith('http://') && !inputValue.startsWith('https://')) {
                                      inputValue = 'https://' + inputValue;
                                      setInstagram(inputValue) 
                                    }else{
                                        setInstagram(e.target.value) 
                                    }
                                }} 
                                value={instagram} placeholder="Instagram handle" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicMedium">
                                <Form.Control type="url"  onChange={e=>{
                                    let inputValue = e.target.value;
                                    if (inputValue && !inputValue.startsWith('http://') && !inputValue.startsWith('https://')) {
                                      inputValue = 'https://' + inputValue;
                                      setMedium(inputValue) 
                                    }else{
                                        setMedium(e.target.value) 
                                    }
                                }} Medium handle
                                value={medium} placeholder="Medium handle" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicTelegram">
                                <Form.Control type="url" onChange={e=>{
                                    let inputValue = e.target.value;
                                    if (inputValue && !inputValue.startsWith('http://') && !inputValue.startsWith('https://')) {
                                      inputValue = 'https://' + inputValue;
                                      setTelegram(inputValue) 
                                    }else{
                                        setTelegram(e.target.value) 
                                    }
                                }}
                                value={telegram} placeholder="Telegram id" />
                            </Form.Group>

                            <Button className="submit-btn" variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Form>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

const mapDispatchToProps = {
    setLoader, updateCollection, updateBackground, updateLogo, getCollectionDetails
};

const mapStateToProps = ({ Auth }) => {
    let { isLogin, chain, publicAddress, singleCollectionDetails } = Auth;
    return { isLogin, chain, publicAddress, singleCollectionDetails }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCollection);