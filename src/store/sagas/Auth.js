import axios from 'axios';
import jwt_decode from 'jwt-decode';
import EventBus from 'eventing-bus';
import { setToken } from "../axios";
import { all, takeEvery, call, put, take } from 'redux-saga/effects';
import {
  setNonce, setLogin, setLoader, setChangeNetwork, setCollection, setAddress, setUser, setSingleCollection, setSingleCollectionDetails,
  setAllCollection, setExplore, setUserNft, setUserFavItems, setSingleNft, setBids, setAllActivity, setNftActivity, setAuctions, setAllNfts,
  setCategory
} from '../actions/Auth';

function* getNonce({ payload }) {
  const { error, response } = yield call(getCall, `/users/getNonce/${payload['publicAddress']}/${payload['chain']}`);
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else if (response) {
    yield put(setNonce(response['data']['body']));
    // yield put(setChangeNetwork(true));
  }
};

/*========== LOGIN FUNCTIONS =============*/
function* login({ payload, history }) {
  const { error, response } = yield call(postCall, { path: '/users/loginWithMetaMask', payload });
  if (error) {
    EventBus.publish("error", error['response']['data']['message']);
  }
  else if (response) {
    const decoded = jwt_decode(response["data"]["body"]["token"]);
    const currentTime = Date.now() / 1000; // Get current time in seconds
    if (decoded.exp < currentTime) return EventBus.publish("error", "Token is expire");
    if (decoded["role"] !== "user") return EventBus.publish("error", "Can't login through User account ");
    setToken(response["data"]["body"]["token"]);
    yield put(setAddress({ publicAddress: payload['address'], chain: payload['chain'] }));
    yield put(setLogin(response['data']['body']['token']));
    yield put(setChangeNetwork(false));
    EventBus.publish("success", response['data']['message']);
  }
};

/*========== Get User =============*/
function* getUser({ payload, history }) {
  const { error, response } = yield call(getCall, `/users/getUser`);
  if (response) yield put(setUser(response['data']['body']));
};

/*========== Update User Detail =============*/
function* updateUser({ payload, history }) {
  const { error, response } = yield call(postCall, { path: '/users/setUser', payload });
  if (error) {
    yield put(setLoader({ status: false }));
    EventBus.publish("error", error['response']['data']['message']);
  }
  else if (response) {
    yield put(setUser(response['data']['body']));
    yield put(setLoader({ status: false }));
    EventBus.publish("success", response['data']['message']);
  }
};

/*========== Update User Image =============*/
function* updateUserImage({payload}) {
  const { error, response } = yield call(postCall, { path: '/users/updateImage', payload });
  if (error) {
    yield put(setLoader({ status: false }));
    EventBus.publish("error", error['response']['data']['message']);
  }
  else if (response) {
    yield put(setLoader({ status: false }));
    EventBus.publish("success", response['data']['message']);
  }
};

/*========== Create NFT FUNCTIONS =============*/
function* createNFT({ payload }) {
  const { error, response } = yield call(postCall, { path: '/nft/createNft', payload });
  if (error) {
    yield put(setLoader({ status: false }));
    EventBus.publish('error', error['response']['data']['message']);
  }
  else if (response) {
    yield put(setLoader({ status: false }));
    EventBus.publish('success', response['data']['message']);
  }
};

/*========== Mint NFT FUNCTIONS =============*/
function* mintNFT721({ payload }) {
  const { error, response } = yield call(postCall, { path: '/nft/mintNft721', payload });
  if (error) {
    yield put(setLoader({ status: false }));
    EventBus.publish('error', error['response']['data']['message']);
  }
  else if (response) {
    yield put(setLoader({ status: false }));
    EventBus.publish('success', response['data']['message']);
  }
};

function* mintNFT1155({ payload }) {
  const { error, response } = yield call(postCall, { path: '/nft/mintNft1155', payload });
  if (error) {
    yield put(setLoader({ status: false }));
    EventBus.publish('error', error['response']['data']['message']);
  }
  else if (response) {
    yield put(setLoader({ status: false }));
    EventBus.publish('success', response['data']['message']);
  }
};

/*========== Create Collections FUNCTIONS =============*/
export function* createCollection({ payload }) {
  const { error, response } = yield call(postCall, { path: "/nft/createCollection", payload });
  if (error) {
    yield put(setLoader({ status: false }));
    EventBus.publish("error", error["response"]["data"]["message"]);
  } else if (response) {
    yield put(setLoader({ status: false }));
    yield put(setCollection(response["data"]["body"]));
    EventBus.publish("success", response["data"]["message"]);
  }
}

/*========== Get Collection =============*/
export function* getCollection() {
  const { error, response } = yield call(getCall, `/nft/getUserCollections`);
  if (error) {
    yield put(setLoader({ status: false }));
    yield put(setCollection([]));
  } else if (response) {
    yield put(setLoader({ status: false }));
    yield put(setCollection(response["data"]["body"]));
  }
}

/*========== Get Single Collection =============*/
export function* getSingleCollection({ payload }) {
  const { error, response } = yield call(getCall, `/nft/getSingleCollection/${payload['chain']}/${payload['tokenAddress']}`);
  if (error) {
    yield put(setLoader({ status: false }));
    yield put(setSingleCollection([]));
  } else if (response) {
    yield put(setLoader({ status: false }));
    yield put(setSingleCollection(response["data"]["body"]));
  }
}

/*========== Get Collection Details =============*/
export function* getCollectionDetails({ payload }) {
  const { error, response } = yield call(getCall, `/nft/getCollectionDetails/${payload['chain']}/${payload['tokenAddress']}`);
  if (error) {
    yield put(setLoader({ status: false }));
    yield put(setSingleCollectionDetails([]));
  } else if (response) {
    yield put(setLoader({ status: false }));
    yield put(setSingleCollectionDetails(response["data"]["body"]));
  }
}

/*========== Get Collection By Names =============*/
export function* getAllCollection({ payload }) {
  const { error, response } = yield call(getCall, `/nft/getCollectionName/${payload['chain']}`);
  if (error) {
    yield put(setLoader({ status: false }));
    yield put(setAllCollection([]));
  } else if (response) {
    yield put(setLoader({ status: false }));
    yield put(setAllCollection(response["data"]["body"]));
  }
}

/*========== Get Explore =============*/
export function* getExplore({ payload }) {
  const { error, response } = yield call(getCall, `/nft/explore/${payload['chain']}`);
  if (error) {
    yield put(setLoader({ status: false }));
    yield put(setExplore([]));
  } else if (response) {
    yield put(setLoader({ status: false }));
    yield put(setExplore(response["data"]["body"]));
  }
}

/*========== Get User Nft =============*/
export function* getUserNft({ payload }) {
  const { error, response } = yield call(getCall, `/nft/getUserNft`);
  if (error) {
    yield put(setLoader({ status: false }));
    yield put(setUserNft([]));
  } else if (response) {
    yield put(setLoader({ status: false }));
    yield put(setUserNft(response["data"]["body"]));
  }
}

/*========== Add / Remove Fav Items =============*/
export function* addRemoveFavItems({ payload }) {
  const { error, response } = yield call(postCall, { path: "/nft/addRemoveFavItem", payload });
  if (error) {
    yield put(setLoader({ status: false }));
    EventBus.publish("error", error["response"]["data"]["message"]);
  } else if (response) {
    yield put(setLoader({ status: false }));
    yield put(setUserFavItems(response["data"]["body"]));
    yield put({ type: "GET_EXPLORE", payload: "" });
    if (payload['tokenAddress'] && payload['chain']) {
      yield put({
        type: "GET_SINGLE_COLLECTION_DETAILS",
        payload: {
          tokenAddress: payload['tokenAddress'],
          chain: payload['chain']
        }
      });
      yield put({
        type: "GET_AUCTIONS",
        payload: {
          chain: payload['chain']
        }
      });
      yield put({
        type: "GET_ALL_NFTS",
        payload: {
          chain: payload['chain']
        }
      });
      yield put({
        type: "GET_USER_NFTS"
      });
      yield put({
        type: "GET_USER_FAV_ITEMS"
      });
    }
    EventBus.publish("success", response["data"]["message"]);
  }
}

/*========== Get User Fav Items =============*/
export function* getUserFavItems({ payload }) {
  const { error, response } = yield call(getCall, `/nft/getUserFavItem`);
  if (error) {
    yield put(setLoader({ status: false }));
    yield put(setUserFavItems([]));
  } else if (response) {
    yield put(setLoader({ status: false }));
    yield put(setUserFavItems(response["data"]["body"]));
  }
}

/*========== Get Logo =============*/
function* updateLogo({ payload }) {
  const { error, response } = yield call(postCall, { path: '/nft/updateLogo', payload });
  if (error) {
    yield put(setLoader({ status: false }));
    EventBus.publish("error", error['response']['data']['message']);
  }
  else if (response) {
    yield put(setLoader({ status: false }));
    if (payload['tokenAddress'] && payload['chain']) {
      yield put({
        type: "GET_SINGLE_COLLECTION_DETAILS",
        payload: {
          tokenAddress: payload['tokenAddress'],
          chain: payload['chain']
        }
      });
    }
    EventBus.publish("success", response["data"]["message"]);
  }
};

/*========== Update BG =============*/
function* updateBackground({ payload }) {
  const { error, response } = yield call(postCall, { path: '/nft/updateBackground', payload });
  if (error) {
    yield put(setLoader({ status: false }));
    EventBus.publish("error", error['response']['data']['message']);
  }
  else if (response) {
    yield put(setLoader({ status: false }));
    if (payload['tokenAddress'] && payload['chain']) {
      yield put({
        type: "GET_SINGLE_COLLECTION_DETAILS",
        payload: {
          tokenAddress: payload['tokenAddress'],
          chain: payload['chain']
        }
      });
    }
    EventBus.publish("success", response["data"]["message"]);
  }
};

/*========== Update Collection =============*/
function* updateCollection({ payload }) {
  const { error, response } = yield call(postCall, { path: '/nft/updateCollection', payload });
  if (error) {
    yield put(setLoader({ status: false }));
    EventBus.publish("error", error['response']['data']['message']);
  }
  else if (response) {
    yield put(setLoader({ status: false }));
    EventBus.publish("success", response["data"]["message"]);
    if (payload['tokenAddress'] && payload['chain']) {
      yield put({
        type: "GET_SINGLE_COLLECTION_DETAILS",
        payload: {
          tokenAddress: payload['tokenAddress'],
          chain: payload['chain']
        }
      });
    }
    EventBus.publish("success", response["data"]["message"]);
  }
};

/*========== Get Details Nft =============*/
export function* getSingleNftDetails({ payload }) {
  const { error, response } = yield call(getCall, `/nft/getDetailNft/${payload['id']}`);
  if (error) {
    yield put(setSingleNft({}));
    yield put(setLoader({ status: false }));
    EventBus.publish("error", error["response"]["data"]["message"]);
  } else if (response) {
    yield put(setSingleNft(response["data"]["body"]));
    yield put(setLoader({ status: false }));
    EventBus.publish("success", response["data"]["message"]);
  }
}

/*========== List Nft =============*/
export function* listNft({ payload }) {
  const { error, response } = yield call(postCall, { path: "/nft/listNft", payload });
  if (error) {
    yield put(setSingleNft({}));
    yield put(setLoader({ status: false }));
    EventBus.publish("error", error["response"]["data"]["message"]);
  } else if (response) {
    yield put(setSingleNft(response["data"]["body"]));
    yield put(setLoader({ status: false }));
    EventBus.publish("success", response["data"]["message"]);
  }
}

/*========== UnList Nft =============*/
export function* unListNft({ payload }) {
  const { error, response } = yield call(postCall, { path: "/nft/unListNft", payload });
  if (error) {
    yield put(setSingleNft({}));
    yield put(setLoader({ status: false }));
    EventBus.publish("error", error["response"]["data"]["message"]);
  } else if (response) {
    yield put(setSingleNft(response["data"]["body"]));
    yield put(setLoader({ status: false }));
    EventBus.publish("success", response["data"]["message"]);
  }
}

/*========== Transfer Nft =============*/
export function* transferNft({ payload }) {
  const { error, response } = yield call(postCall, { path: "/nft/transferNft", payload });
  if (error) {
    yield put(setSingleNft({}));
    yield put(setLoader({ status: false }));
    EventBus.publish("error", error["response"]["data"]["message"]);
  } else if (response) {
    yield put(setSingleNft(response["data"]["body"]));
    yield put(setLoader({ status: false }));
    EventBus.publish("success", response["data"]["message"]);
  }
}

/*========== Create Auction =============*/
export function* createAuction({ payload }) {
  const { error, response } = yield call(postCall, { path: "/nft/createAuction", payload });
  if (error) {
    yield put(setSingleNft({}));
    yield put(setLoader({ status: false }));
    EventBus.publish("error", error["response"]["data"]["message"]);
  } else if (response) {
    yield put(setSingleNft(response["data"]["body"]));
    yield put(setLoader({ status: false }));
    EventBus.publish("success", response["data"]["message"]);
  }
}

/*========== Place Bid =============*/
export function* placeBid({ payload }) {
  const { error, response } = yield call(postCall, { path: "/nft/placeBid", payload });
  if (error) {
    yield put(setSingleNft({}));
    yield put(setLoader({ status: false }));
    EventBus.publish("error", error["response"]["data"]["message"]);
  } else if (response) {
    yield put(setSingleNft(response["data"]["body"]));
    yield put(setLoader({ status: false }));
    EventBus.publish("success", response["data"]["message"]);
  }
}

/*========== End Auction =============*/
export function* endAuction({ payload }) {
  const { error, response } = yield call(postCall, { path: "/nft/endAuction", payload });
  if (error) {
    yield put(setSingleNft({}));
    yield put(setLoader({ status: false }));
    EventBus.publish("error", error["response"]["data"]["message"]);
  } else if (response) {
    yield put(setSingleNft(response["data"]["body"]));
    yield put({ type: "GET_BIDS", payload: payload })
    yield put(setLoader({ status: false }));
    EventBus.publish("success", response["data"]["message"]);
  }
}

/*========== Get Bids =============*/
export function* getBids({ payload }) {
  const { error, response } = yield call(postCall, { path: "/nft/getBids", payload });
  if (error) {
    yield put(setBids([]));
    yield put(setLoader({ status: false }));
  } else if (response) {
    yield put(setBids(response["data"]["body"]));
    yield put(setLoader({ status: false }));
  }
}

/*========== Get Auctions =============*/
export function* getAuction({ payload }) {
  const { error, response } = yield call(getCall, `/nft/getAuctions/${payload['chain']}`);
  if (error) {
    yield put(setAuctions([]));
    yield put(setLoader({ status: false }));
  } else if (response) {
    yield put(setAuctions(response["data"]["body"]));
    yield put(setLoader({ status: false }));
  }
}
/*========== ACTIVITY FUNCTIONS =============*/
export function* getAllActivity({ payload }) {
  const { error, response } = yield call(postCall, { path: "/nft/getAllActivity", payload });
  if (error) {
    yield put(setAllActivity([]));
    yield put(setLoader({ status: false }));
  } else if (response) {
    yield put(setAllActivity(response["data"]["body"]));
    yield put(setLoader({ status: false }));
  }
}

/*========== Get All Nfts =============*/
export function* getAllNfts({ payload }) {
  const { error, response } = yield call(getCall, `/nft/getAllNfts/${payload['chain']}`);
  if (error) {
    yield put(setAuctions([]));
    yield put(setAllNfts({ status: false }));
  } else if (response) {
    yield put(setAllNfts(response["data"]["body"]));
    yield put(setLoader({ status: false }));
  }
}

/*========== Get Nft Activity =============*/
export function* getNftActivity({ payload }) {
  const { error, response } = yield call(postCall, { path: "/nft/getNftActivity", payload });
  if (error) {
    yield put(setNftActivity([]));
    yield put(setLoader({ status: false }));
  } else if (response) {
    yield put(setNftActivity(response["data"]["body"]));
    yield put(setLoader({ status: false }));
  }
}



export function* getCategory() {
  const { error, response } = yield call(getCall, `/nft/getCategory`);
  if (error) {
  } else if (response) {
    yield put(setCategory(response["data"]["body"]));
  }
}




function* actionWatcher() {
  yield takeEvery('LOGIN', login);
  yield takeEvery('GET_USER', getUser);
  yield takeEvery('UPDATE_USER', updateUser);
  yield takeEvery('UPDATE_USER_IMAGE', updateUserImage);
  yield takeEvery('GET_NONCE', getNonce);
  yield takeEvery('CREATE_NFT', createNFT);
  yield takeEvery('MINT_NFT_721', mintNFT721);
  yield takeEvery('MINT_NFT_1155', mintNFT1155);
  yield takeEvery('CREATE_COLLECTION', createCollection);
  yield takeEvery('GET_COLLECTION', getCollection);
  yield takeEvery('GET_SINGLE_COLLECTION', getSingleCollection);
  yield takeEvery('GET_SINGLE_COLLECTION_DETAILS', getCollectionDetails);
  yield takeEvery('GET_ALL_COLLECTION', getAllCollection);
  yield takeEvery('GET_EXPLORE', getExplore);
  yield takeEvery('GET_USER_NFTS', getUserNft);
  yield takeEvery('UPLOAD_LOGO', updateLogo);
  yield takeEvery('UPLOAD_BACKGROUND', updateBackground);
  yield takeEvery('UPDATE_COLLECTION', updateCollection);
  yield takeEvery('ADD_REMOVE_FAV_ITEMS', addRemoveFavItems);
  yield takeEvery('GET_USER_FAV_ITEMS', getUserFavItems);
  yield takeEvery('GET_SINGLE_NFT', getSingleNftDetails);
  yield takeEvery('LIST_NFT', listNft);
  yield takeEvery('UNLIST_NFT', unListNft);
  yield takeEvery('TRANSFER_NFT', transferNft);
  yield takeEvery('CREATE_AUCTION', createAuction);
  yield takeEvery('PLACE_BID', placeBid);
  yield takeEvery('END_AUCTION', endAuction);
  yield takeEvery('GET_BIDS', getBids);
  yield takeEvery('GET_AUCTIONS', getAuction);
  yield takeEvery('GET_ALL_NFTS', getAllNfts);
  yield takeEvery('GET_ALL_ACTIVITY', getAllActivity);
  yield takeEvery('GET_NFT_ACTIVITY', getNftActivity);
  yield takeEvery('GET_CATEGORY', getCategory);
};

export default function* rootSaga() {
  yield all([actionWatcher()]);
};

function postCall({ path, payload }) {
  return axios
    .post(path, payload)
    .then(response => ({ response }))
    .catch(error => {
      if (error.response.status === 401) EventBus.publish("tokenExpired");
      return { error };
    });
};

function getCall(path) {
  return axios
    .get(path)
    .then(response => ({ response }))
    .catch(error => {
      if (error.response.status === 401) EventBus.publish("tokenExpired");
      return { error };
    });
};

function deleteCall(path) {
  return axios
    .delete(path)
    .then(response => ({ response }))
    .catch(error => {
      if (error.response.status === 401) EventBus.publish("tokenExpired");
      return { error };
    });
};

function putCall({ path, payload }) {
  return axios
    .put(path, payload)
    .then(response => ({ response }))
    .catch(error => {
      if (error.response.status === 401) EventBus.publish("tokenExpired");
      return { error };
    });
};
