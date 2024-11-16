import { PURGE } from "redux-persist";
import { setToken } from "../axios";
import { tokenVerify } from "../jwtVerify";

var initialState = {
  isLogin: tokenVerify() ? true : false,
  auth: localStorage.getItem("token"),
  publicAddress: localStorage.getItem("publicAddress"),
  chain: localStorage.getItem("chain") ? localStorage.getItem("chain") : 51,
  isLoader: { message: "Please Wait...", status: false },
  network: localStorage.getItem("network") ? localStorage.getItem("network") : "xdc",
  nonce: "",
  isNonce: true,
  isChangeNetwork: false,
  userCollections: [],
  collections: [],
  singleCollection: {},
  singleNft:{},
  userData:{},
  explore:[],
  userNfts:[],
  userFavitems:[],
  setBids:[],
  setAuctions:[],
  setAllNfts:[],
  category:[],
  singleCollectionDetails:{}
};


const Auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case PURGE:
      return initialState;

    /*========== LOGIN REDUCERS ============= */

    case "SET_LOGIN":
      localStorage.setItem("token", payload);
      return {
        ...state,
        auth: payload,
        isLogin: true,
        isNonce: true
      };

    case "SET_NETWORK":
      localStorage.setItem("network", payload)
      return {
        ...state,
        network: payload,
        isChangeNetwork: true
      };

    case "SET_CHANGE_NETWORK":
      return {
        ...state,
        isChangeNetwork: payload
      };

    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("publicAddress");
      localStorage.removeItem("chain");
      localStorage.removeItem("network");
      setToken();
      return {
        ...state,
        publicAddress: "",
        auth: "",
        isLogin: false,
      };

    case "SET_ADDRESS":
      localStorage.setItem("publicAddress", payload['publicAddress'])
      localStorage.setItem("chain", payload['chain'])
      return {
        ...state,
        publicAddress: payload['publicAddress'],
        chain: payload['chain']
      };

    case "SET_NONCE":
      return {
        ...state,
        nonce: payload,
        isChangeNetwork: true,
        isNonce: false
      }

    case "SET_USER":
      return {
        ...state,
        userData: payload
      }
    /*========== LOADER REDUCERS ============= */

    case "SET_LOADER":
      return {
        ...state,
        isLoader: payload,
      };

    /*========== COLLECTIONS REDUCERS ============= */
    case "SET_SINGLE_NFT":
      return {
        ...state,
        singleNft: payload,
      };
    /*========== COLLECTIONS REDUCERS ============= */
    case "SET_COLLECTION":
      return {
        ...state,
        userCollections: payload
      }

    case "SET_SINGLE_COLLECTION":
      return {
        ...state,
        singleCollection: payload
      }

    case "SET_SINGLE_COLLECTION_DETAILS":
      return {
        ...state,
        singleCollectionDetails: payload
      }

    case "SET_ALL_COLLECTION":
      return {
        ...state,
        collections: payload
      }

    case "SET_EXPLORE":
      return {
        ...state,
        explore: payload
      }

    case "SET_USER_NFTS":
      return {
        ...state,
        userNfts: payload
      }

    case "SET_USER_FAV_ITEMS":
      return {
        ...state,
        userFavitems: payload
      }

    case "SET_CATEGORY":
        return {
        ...state,
        category: payload
      }

    case "SET_BIDS":
      return {
        ...state,
        setBids: payload
      }

    case "SET_AUCTIONS":
      return {
        ...state,
        setAuctions: payload
      }

    case "SET_ALL_NFTS":
      return {
        ...state,
        setAllNfts: payload
      }
    /*========== ACTIVITY REDUCERS ============= */
    case "SET_ALL_ACTIVITY":
      return {
        ...state,
        allActivity: payload,
      };

    case "SET_NFT_ACTIVITY":
      return {
        ...state,
        nftActivity: payload,
      };
    
    default:
      return state;
  }
};

export default Auth;
