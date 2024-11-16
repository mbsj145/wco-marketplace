import {React , useEffect, useState} from 'react';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {Form, Button} from 'react-bootstrap';
import { connect } from "react-redux";
import EventBus from 'eventing-bus';
import SingleCollection from './User/SingleCollection';
import MultipleCollections from './User/MultipleCollections';
import {makeTokens,web3} from "../store/contract";
import {setLoader, updateUser, updateUserImage,getUser } from "../store/actions/Auth";
import Header from '../components/Header';
import Footer from '../components/Footer';

const EditProfile = (props) => {
    const navigate = useNavigate();
    const [preview, setPreview] = useState(props.userData.image);
    const [name, setname] = useState(props.userData.name);
    const [desc, setdesc] = useState(props.userData.desc);
    const [facebook, setfacebook] = useState(props.userData.facebook);
    const [discord, setdiscord] = useState(props.userData.discord);
    const [twitter, settwitter] = useState(props.userData.twitter);

    const submitUser = () => {
        try {
            if (!name) return EventBus.publish('error', `Please add name`);
            if (!name.replace(/\s/g, '').length) {
                EventBus.publish("error", `Please enter name`);
                return;
            }
            if (!name.match(/[a-zA-Z]/)) {
                EventBus.publish("error", `Name must contain alphabets`);
                return;
            }
            if (!desc) return EventBus.publish('error', `Please add description`);
            if (!desc.replace(/\s/g, '').length) {
                EventBus.publish("error", `Please enter description`);
                return;
            }
            if (!desc.match(/[a-zA-Z]/)) {
                EventBus.publish("error", `Description must contain alphabets`);
                return;
            }
            if(facebook){
                if (!facebook.split("https://")[1].replace(/\s/g, '').length) {
                    EventBus.publish("error", `Please enter facebook address`);
                    return;
                }
                if (!facebook.split("https://")[1].match(/[a-zA-Z]/)) {
                    EventBus.publish("error", `Facebook must contain alphabets`);
                    return;
                }
            }
            if(discord){
                if (!discord.split("https://")[1].replace(/\s/g, '').length) {
                    EventBus.publish("error", `Please enter discord address`);
                    return;
                }
                if (!discord.split("https://")[1].match(/[a-zA-Z]/)) {
                    EventBus.publish("error", `Discord must contain alphabets`);
                    return;
                }
            }
            if(twitter){
                if (!twitter.split("https://")[1].replace(/\s/g, '').length) {
                    EventBus.publish("error", `Please enter twitter address`);
                    return;
                }
                if (!twitter.split("https://")[1].match(/[a-zA-Z]/)) {
                    EventBus.publish("error", `Twitter must contain alphabets`);
                    return;
                }
            }
            props.setLoader({message:"User profile updating...", status:true});
            props.updateUser({name,desc,facebook,discord,twitter});
        } catch (error) {
            return EventBus.publish("error", error);
        }
    }

    const uploadImage = async (e) => {
        try {
            if(e.target.files.length == 0) return;
            let files = e.target.files[0].type;
            if (files.split('/')[0] !== 'image') return EventBus.publish('error', `Please upload image only in jpeg, png, gif`);
            let reader = new FileReader();
            reader.onload = async (event) => {
                setPreview(event.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
            props.setLoader({message:"Update profile image...", status:true});
            let Userfiles = e.target.files[0];
            let formData = new FormData();
            formData.append('user', e.target.files[0]);
            props.updateUserImage(formData);
        } catch (error) {
            return EventBus.publish("error", error);
        }
    };

    useEffect(()=>{
        props.getUser();
    },[]);

    useEffect(()=>{
        if(Object.keys(props.userData).length > 0){
            setPreview(props.userData.image);
            setname(props.userData.name);
            setdesc(props.userData.desc);
            setfacebook(props.userData.facebook);
            setdiscord(props.userData.discord);
            settwitter(props.userData.twitter);
        }
    },[props.userData]);

    useEffect(()=>{
        if(!props.isLogin) return navigate("/");
    },[props.isLogin])
   
    return(
    <>
        <Header />
        <section className='signin edit-profile'> 
            <div className="container">
                <div className='text-right mb-4'>
                    <NavLink to={"/userprofile"} className="common-btn border-white">
                        Back
                    </NavLink>
                </div>
                <div className="row">
                    <div className="col-md-5">
                        <Form className="img-wrap">
                            <img src={preview ? preview : "./images/img.png"} alt="" />
                            <img className="edit-icon" src={"./images/edit-icon.png"} alt="" />
                            <Form.Control type="file" onChange={(e)=>uploadImage(e)} accept="image/*"/>
                        </Form>
                    </div>
                    
                    <div className="col-lg-6 col-md-7">
                        <h2>Edit profile</h2>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Control type="text" placeholder="Name" onChange={e=>setname(e.target.value)} value={name} maxLength={20}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicTextarea">
                                <Form.Control as="textarea" placeholder="Description" onChange={e=>setdesc(e.target.value)} value={desc} maxLength={300}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicSocialLink1">
                                <Form.Control type="text" placeholder="Facebook Link" onChange={e=>{
                                        let inputValue = e.target.value;
                                        if (inputValue && !inputValue.startsWith('http://') && !inputValue.startsWith('https://')) {
                                          inputValue = 'https://' + inputValue;
                                          setfacebook(inputValue) 
                                        }else{
                                          setfacebook(e.target.value) 
                                        }
                                }} value={facebook}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicSocialLink2">
                                <Form.Control type="text" placeholder="Discord Link" onChange={e=>{
                                        let inputValue = e.target.value;
                                        if (inputValue && !inputValue.startsWith('http://') && !inputValue.startsWith('https://')) {
                                          inputValue = 'https://' + inputValue;
                                          setdiscord(inputValue) 
                                        }else{
                                          setdiscord(e.target.value) 
                                        }
                                }} value={discord}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicSocialLink3">
                                <Form.Control type="text" placeholder="Twitter Link" onChange={e=>{
                                        let inputValue = e.target.value;
                                        if (inputValue && !inputValue.startsWith('http://') && !inputValue.startsWith('https://')) {
                                          inputValue = 'https://' + inputValue;
                                          settwitter(inputValue) 
                                        }else{
                                          settwitter(e.target.value) 
                                        }
                                }} value={twitter}/>
                            </Form.Group>

                            <Button className="submit-btn" variant="primary" onClick={submitUser}>
                                Save Changes
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
const mapDispatchToProps = { setLoader,updateUser,updateUserImage,getUser };

const mapStateToProps = ({ Auth }) => {
  let { isLogin, userData} = Auth;
  return { isLogin, userData }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);