import { React, useEffect, useState } from 'react';
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { connect } from "react-redux";
import EventBus from 'eventing-bus';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CreateIPFS, CreateIPFSMetadata } from "../store/ipfs";
import { setLoader, createNFT } from "../store/actions/Auth";
import { makeTokens, web3 } from "../store/contract";

const CreateItem = (props) => {
    const navigate = useNavigate();
    const [preview, setPreview] = useState("");
    const [method, setMethod] = useState("fixed");
    const [file, setFile] = useState("");
    const [collection, setCollection] = useState("abstraction");
    const [price, setPrice] = useState("");
    const [royality, setRoyality] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const changeRoyality = async (e) => {
        setRoyality();
        let percentage = parseInt(e.target.value);
        if (percentage < 1) {
            setRoyality(1)
            return EventBus.publish('error', `Minimum royality percentage is 1`);
        } else if (percentage > 5) {
            setRoyality(5)
            return EventBus.publish('error', `Maximum royality percentage is 5`);
        } else if (percentage >= 1 || percentage <= 5) {
            setRoyality(percentage)
        }
    }

    const uploadImage = async (e) => {
        if (e.target.files.length == 0) return;
        let files = e.target.files[0].type;
        if (files.split('/')[0] !== 'image') return EventBus.publish('error', `Please upload image only in jpeg, png, gif`);
        let reader = new FileReader();
        reader.onload = async (event) => {
            setPreview(event.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
        setFile(e.target.files[0]);
    };

    const submit = async (e) => {
        try {
            e.preventDefault();
            if (!file) return EventBus.publish('error', "Please upload nft");
            if (file == undefined) return EventBus.publish("error", `Please upload nft`);
            if (!price) return EventBus.publish('error', "Please set price");
            if (price < 0) return EventBus.publish('error', "Price cannot be a negative value");
            if (!royality) return EventBus.publish('error', "Please set royality");
            if (!title) return EventBus.publish('error', "Please set title");
            if (!title.replace(/\s/g, '').length) {
                EventBus.publish("error", `Please enter title`);
                return;
            }
            if (!title.match(/[a-zA-Z]/)) {
                EventBus.publish("error", `Title must contain alphabets`);
                return;
            }
            if (!desc) return EventBus.publish('error', "Please set Description");
            if (!desc.replace(/\s/g, '').length) {
                EventBus.publish("error", `Please enter Description`);
                return;
            }
            if (!desc.match(/[a-zA-Z]/)) {
                EventBus.publish("error", `Description must contain alphabets`);
                return;
            }

            props.setLoader({ status: true, message: "Nft creating..." });
            let url = await CreateIPFS(file);
            let metadata = await CreateIPFSMetadata(JSON.stringify({ image: url, title: title, description: desc, collection: collection }));
            props.setLoader({ status: true, message: "Uploading nft..." });
            let { TokenAddress, Token } = await makeTokens();
            let wPrice = await web3.utils.toWei(price.toString(), 'ether');
            web3.eth.sendTransaction({
                from: props.publicAddress,
                to: TokenAddress,
                value: 0,
                gas: 5000000,
                data: Token.methods.createToken(metadata, wPrice, royality).encodeABI(),
            }).on('transactionHash', (hash) => console.log(`************ tx =`, hash))
                .on('receipt', async receipt => {
                    let nftId = await Token.methods.walletOfOwner(props.publicAddress).call();
                    nftId = nftId[nftId.length - 1];
                    props.createNFT({ tokenAddress: TokenAddress, nftId, price, title: title, desc: desc, image: url, metadataUri: metadata, chain: props.chain, collectionType: collection })
                    setFile("")
                    setCollection("abstraction")
                    setPreview("")
                    setPrice("")
                    setRoyality("")
                    setTitle("")
                    setDesc("")

                }).on('error', e => {
                    props.setLoader({ status: false });
                    EventBus.publish('error', `Unable to Upload NFT ${e}`);
                });
        } catch (error) {
            console.log("*********** error", error)
            props.setLoader({ status: false });
            return EventBus.publish('error', error);
        }
    };

    useEffect(() => {
        if (!props.isLogin) return navigate("/");
    }, [props.isLogin])

    return (
        <>
            <Header />

            <section className="banner-inner">
                <div className="container">
                    <div className="content">
                        <h1>Create Item</h1>

                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li class="breadcrumb-item active" aria-current="page">Create Item</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>

            <section className="create-item-wrapper picks selling">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-5">
                            <h3>Preview item</h3>

                            <div className="collection-box">
                                <div className="img-wrap">
                                    <img src={preview ? preview : "./images/collection-img.png"} alt="Preview" />
                                </div>

                                <div className="content">
                                    <div className="collection-content-head">
                                        <h3>{title}</h3>
                                        <div className="protocol">
                                            {
                                                props.chain == "97" || props.chain == "56" ? "BSC" :
                                                    props.chain == "1" || props.chain == "11155111" ? "ETH" :
                                                        props.chain == "43114" || props.chain == "43113" ? "AVAX" :
                                                            props.chain == "51" || props.chain == "50" ? "XDC" : "-"
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-9 col-lg-8 col-md-7">
                            <div className="signin">
                                <Form onSubmit={submit}>
                                    <Form.Group className="mb-3" controlId="formBasicFame">
                                        <label>Upload file</label>

                                        <div className="upload-file">
                                            <span>PNG, JPG, GIF . Max 200mb.</span>

                                            <Form.Control type="file" onChange={uploadImage} accept=".png, .jpg, .jpeg, .gif" />

                                            <button className="common-btn border-white">Upload File</button>
                                        </div>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <label>Price</label>
                                        <Form.Control type="number" placeholder="Enter price for one item (ETH)" onChange={e => setPrice(e.target.value)} value={price} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <label>Title</label>
                                        <Form.Control type="text" placeholder="Item Name" onChange={e => setTitle(e.target.value)} value={title} maxLength={20} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicTextarea">
                                        <label>Description</label>
                                        <Form.Control as="textarea" placeholder="e.g. “This is very limited item”" onChange={e => setDesc(e.target.value)} value={desc} maxLength={300} />
                                    </Form.Group>

                                    <div className="row">
                                        <div className="col-lg-4">
                                            <Form.Group className="mb-3" controlId="formBasicName">
                                                <label>Royalties</label>
                                                <Form.Control type="text" placeholder="5%" onChange={changeRoyality} value={royality} />
                                            </Form.Group>
                                        </div>

                                        <div className="col-lg-4">
                                            <Form.Group className="mb-3" controlId="formBasicName">
                                                <label>Collection</label>
                                                <Form.Select className="mb-3" controlId="formBasicSubject" onChange={e => setCollection(e.target.value)} value={collection}>
                                                    <option value="abstraction">Abstraction</option>
                                                    <option value="art">Art</option>
                                                    <option value="music">Music</option>
                                                    <option value="domain name">Domain Names</option>
                                                    <option value="virtual world">Virtual World</option>
                                                    <option value="trading cards">Trading Cards</option>
                                                    <option value="sports">Sports</option>
                                                    <option value="utility">Utility</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="btn-wrap">
                                        <div></div>
                                        <Button type='submit' className="active"> Create Item </Button>
                                        <div></div>
                                    </div>
                                </Form>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

const mapDispatchToProps = { setLoader, createNFT };

const mapStateToProps = ({ Auth }) => {
    let { isLogin, network, chain, publicAddress } = Auth;
    return { isLogin, network, chain, publicAddress }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateItem);

