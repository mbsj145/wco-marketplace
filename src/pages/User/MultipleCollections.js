import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { Tabs, Tab } from 'react-bootstrap';
import { connect } from "react-redux";
import EventBus from 'eventing-bus';
import { Form, Button } from 'react-bootstrap';
import { makeTokens, web3 } from "../../store/contract";
import { setLoader, createCollection } from "../../store/actions/Auth";
import { ApiUrl } from "../../store/config";

const MultipleCollection = (props) => {
    const navigate = useNavigate();
    let [profile, setProfile] = useState();
    let [background, setBackground] = useState();
    let [name, setName] = useState();
    let [url, setUrl] = useState();
    let [desc, setDesc] = useState();
    let [website, setWebsite] = useState();
    let [discord, setDiscord] = useState();
    let [instagram, setInstagram] = useState();
    let [medium, setMedium] = useState();
    let [telegram, setTelegram] = useState();
    let [royality, setRoyality] = useState();
    let [collectionSymbol, setCollectionSymbol] = useState();
    let [totalSypply, setTotalSypply] = useState(1);
    let [collectionType, setCollectionType] = useState("abstraction");
    let [collectionPrice, setCollectionPrice] = useState();
    let [copies, setCopies] = useState(1);


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

    async function getIPFSDataWithPinata(url) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await fetch(`${ApiUrl}/nft/validateURI`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Set the content type to JSON if you're sending JSON data
                    },
                    body: JSON.stringify({ url }), // Convert your data to JSON format if needed
                });
                if (parseInt(data.status) == 200) {
                    return resolve(true);
                }
                else return resolve(false);
            } catch (e) {
                return resolve(false);
            }
        });
    }

    const getIPFSData = (Uri) => {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await fetch(`${Uri}`);
                if (parseInt(data.status) == 200) {
                    data = await data.json();
                    return resolve(true);
                }
                if (parseInt(data.status) == 404) {
                    data = await fetch(`${Uri}`);
                    if (parseInt(data.status) == 200) {
                        return resolve(true);
                    } else {
                        return resolve(false);
                    }
                }
            } catch (e) {
                return resolve(false);
            }
        });
    }

    const createNFT = async () => {
        try {
            if (!profile) return EventBus.publish('error', `Please upload logo image`);
            if (profile == undefined) return EventBus.publish("error", `Please upload logo image`);
            if (!background) return EventBus.publish('error', `Please upload background image`);
            if (background == undefined) return EventBus.publish("error", `Please upload background image`);
            if (!name) return EventBus.publish('error', `Please add name`);
            if (!name.replace(/\s/g, '').length) {
                EventBus.publish("error", `Please enter name`);
                return;
            }
            if (!name.match(/[a-zA-Z]/)) {
                EventBus.publish("error", `Name must contain alphabets`);
                return;
            }

            if (!collectionSymbol) return EventBus.publish('error', `Please add symbol`);
            if (!collectionSymbol.replace(/\s/g, '').length) {
                EventBus.publish("error", `Please enter collection symbol`);
                return;
            }
            if (!collectionSymbol.match(/[a-zA-Z]/)) {
                EventBus.publish("error", `Collection symbol must contain alphabets`);
                return;
            }
            // if(!totalSypply) return EventBus.publish('error', `Please add totalSupply`); 
            // if(totalSypply > 20) return EventBus.publish('error', `You can set maximum 20 supply`);
            if (!desc) return EventBus.publish('error', `Please add description`);
            if (!desc.replace(/\s/g, '').length) {
                EventBus.publish("error", `Please enter collection description`);
                return;
            }
            if (!desc.match(/[a-zA-Z]/)) {
                EventBus.publish("error", `Collection description must contain alphabets`);
                return;
            }
            if (!royality) return EventBus.publish('error', `Please add royality fee`);
            if (!collectionType) return EventBus.publish('error', `Please add Category`);
            if (!collectionPrice) return EventBus.publish('error', `Please set collections price`);
            if (collectionPrice < 0) return EventBus.publish('error', "Collection price cannot be a negative value");

            if (!url) return EventBus.publish('error', `Please add base uri`);
            // if(url && !url.endsWith("/")) url = url + "/";
            let checkUrl;
            if (url.split("/")[2] == 'gateway.pinata.cloud') {
                checkUrl = await getIPFSDataWithPinata(url);
            } else {
                checkUrl = await getIPFSData(url);
            }
            if (checkUrl == false) return EventBus.publish('error', `Invalid url`);
            let price = await web3.utils.toWei(collectionPrice.toString(), 'ether');

            props.setLoader({ message: 'Collections deploying...', status: true });

            let { ERC1155ABI, ERC1155BYTECODE } = await makeTokens();

            let from = (await web3.currentProvider.enable())[0];
            let contract = new web3.eth.Contract(ERC1155ABI);
            let deploy = await contract.deploy({
                data: ERC1155BYTECODE,
                arguments: [name, collectionSymbol, url, royality, price, copies, totalSypply],
                gas: 5000000,
            });

            await deploy
                .send({ from })
                .on("transactionHash", (hash) =>
                    console.log(`************** deploy contract hash = ${hash}`)
                )
                .on("receipt", async (receipt) => {
                    const formData = new FormData();
                    formData.append('profile', profile);
                    formData.append('background', background);
                    formData.append('collectionName', name);
                    formData.append('baseUri', url);
                    formData.append('collectionDesc', desc);
                    formData.append('discord', discord);
                    formData.append('instagram', instagram);
                    formData.append('telegram', telegram);
                    formData.append('royality', royality);
                    formData.append('medium', medium);
                    formData.append('website', website);
                    formData.append('collectionSymbol', collectionSymbol);
                    formData.append('totalSypply', totalSypply);
                    formData.append('collectionType', collectionType);
                    formData.append('tokenType', "erc1155");
                    formData.append('tokenAddress', receipt['contractAddress']);
                    formData.append('collectionPrice', collectionPrice);
                    formData.append('numberOfCopies', copies);
                    formData.append('chain', props.chain);
                    props.createCollection(formData);
                    // props.setLoader({ message: 'Collections Deploying Please Wait...', status: false });
                })
        } catch (error) {
            props.setLoader({ status: false });
            console.log("*************** error", error);
            return EventBus.publish('error', error);
        }
    }

    useEffect(() => {
        if (!props.isLogin) return navigate("/");
    }, [props.isLogin])

    return (
        <>
            <h2>Logo image</h2>

            <p>This image will also be used for navigation. 350 x 350 recommended.</p>

            <Form.Group className="form-group" controlId="formBasicFame">

                <div className="upload-file">
                    <span>Drag and drop file here</span>

                    <Form.Control type="file" onChange={e => setProfile(e.target.files[0])} accept=".png, .jpg, .jpeg, .gif" />

                    <button className="common-btn border-white">Choose File</button>
                </div>

                <span>Files supported: PNG, JPEG or JPG. Max 200mb.</span>
            </Form.Group>

            <h2>Banner image</h2>

            <p>This image will appear at the top of your collection page. Avoid including too much text in this banner image, as the dimensions change on different devices. 1400 x 400 recommended.</p>

            <Form.Group className="form-group" controlId="formBasicFame">

                <div className="upload-file">
                    <span>Drag and drop file here</span>

                    <Form.Control type="file" onChange={e => setBackground(e.target.files[0])} accept=".png, .jpg, .jpeg, .gif" />

                    <button className="common-btn border-white">Choose File</button>
                </div>

                <span>Files supported: PNG, JPEG or JPG. Max 200mb.</span>
            </Form.Group>

            <Form.Group className="form-group" controlId="Name">
                <label>Name</label>
                <Form.Control type="text" placeholder="Item Example “ MARS Stones”" onChange={e => setName(e.target.value)} maxLength={20} />
            </Form.Group>

            <Form.Group className="form-group" controlId="Name">
                <label>Symbol</label>
                <Form.Control type="text" placeholder="Item Example “ MARS Stones”" onChange={e => setCollectionSymbol(e.target.value)} maxLength={20} />
            </Form.Group>

            {/* <Form.Group className="form-group" controlId="Name">
                                    <label>Total Supply</label>
                                    <Form.Control type="number" placeholder="10" onChange={e=>setTotalSypply(e.target.value)}/>
                                </Form.Group> */}

            <Form.Group className="form-group" controlId="Name">
                <label>Total Supply (ERC1155)</label>
                <Form.Control type="number" placeholder="1000" onChange={e => setCopies(e.target.value)} />
            </Form.Group>

            <Form.Group className="form-group" controlId="URL">
                <label>URL</label>
                <p>Example: https://example.com/1</p>
                <Form.Control type="url" placeholder="https://marketplace.com/collection/mars-stones" onChange={e => {
                    let inputValue = e.target.value;
                    if (inputValue && !inputValue.startsWith('https://')) {
                        inputValue = 'https://' + inputValue;
                        setUrl(inputValue)
                    } else {
                        setUrl(e.target.value)
                    }
                }} value={url} />
            </Form.Group>

            <Form.Group className="form-group" controlId="Desc">
                <label>Description</label>
                <p>Markdown syntax is supported. 0 of 1000 characters used.</p>
                <Form.Control as="textarea" onChange={e => setDesc(e.target.value)} maxLength={1000} />
            </Form.Group>

            <Form.Group className="form-group" controlId="Category">
                <label>Category</label>
                <p>Adding a category will help make your item discoverable on Marketplace.</p>
                <Form.Select className="mb-3" controlId="formBasicSubject" onChange={e => setCollectionType(e.target.value)} value={collectionType}>
                    <option value="abstraction">Abstraction</option>
                    <option value="art">Art</option>
                    <option value="music">Music</option>
                    <option value="domain name">Domain Names</option>
                    <option value="virtual world">Virtual World</option>
                    <option value="trading cards">Trading Cards</option>
                    <option value="sports">Sports</option>
                    <option value="utility">Utility</option>
                </Form.Select>
                {/* <Button className="common-btn border-white">Add category</Button> */}
            </Form.Group>

            <Form.Group className="form-group" controlId="Links">
                <label>Links</label>
                <Form.Control className="mb-3" type="text" placeholder="Website" onChange={e => setWebsite(e.target.value)} />
                <Form.Control className="mb-3" type="text" placeholder="Discord id" onChange={e => setDiscord(e.target.value)} />
                <Form.Control className="mb-3" type="text" placeholder="Instagram handle" onChange={e => setInstagram(e.target.value)} />
                <Form.Control className="mb-3" type="text" placeholder="Medium handle" onChange={e => setMedium(e.target.value)} />
                <Form.Control className="mb-3" type="text" placeholder="Telegram id" onChange={e => setTelegram(e.target.value)} />
            </Form.Group>

            <Form.Group className="form-group" controlId="Royalties">
                <label>Royalties</label>
                {/* <p>Collect a fee when a user re-sells an item you originally created. This is deducted from the final sale price and paid monthly to a payout address of your choosing. <a href="">Learn more about royalties.</a></p> */}
                <Form.Control type="number" placeholder="Percentage Fee (example 1 %)" onChange={changeRoyality} value={royality} />
            </Form.Group>

            <Form.Group className="form-group" controlId="Royalties">
                <label>Price</label>
                {/* <p>Collect a fee when a user re-sells an item you originally created. This is deducted from the final sale price and paid monthly to a payout address of your choosing. <a href="">Learn more about royalties.</a></p> */}
                <Form.Control type="number" placeholder="Price (example 0.2 eth)" onChange={e => setCollectionPrice(e.target.value)} />
            </Form.Group>

            {/* <Form.Group className="form-group" controlId="Token">
                                    <label>Payment tokens</label>
                                    <p>These tokens can be used to buy and sell your items.  <img src="./images/info-circle-purple.png" alt="" /></p>
                                    <Button className="common-btn border-white">ETH (Ethereum)</Button>

                                    <Form.Select  className="mt-4" controlId="formBasicSubject">
                                        <option default>Add token</option>
                                        <option>Add token 1</option>
                                        <option>Add token 2</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="form-group">
                                    <div className="label-head">
                                        <label>Explicit & sensitive content</label>

                                        <div class="check-box">
                                            <input type="checkbox" />
                                        </div>
                                    </div>
                                    
                                    <p>Set this collection as explicit and sensitive content <img src="./images/info-circle-purple.png" alt="" /></p>
                                </Form.Group> */}

            <Button className="common-btn create-btn" onClick={() => createNFT()}>Create</Button>


        </>
    );
};

const mapDispatchToProps = { setLoader, createCollection };

const mapStateToProps = ({ Auth }) => {
    let { isLogin, chain, publicAddress } = Auth;
    return { isLogin, chain, publicAddress }
}

export default connect(mapStateToProps, mapDispatchToProps)(MultipleCollection);