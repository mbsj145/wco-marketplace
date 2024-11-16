/*========== LOGIN ACTIONS ============= */

export const login = (data) => ({
  type: 'LOGIN',
  payload: data,
});

export const setLogin = (data) => ({
  type: 'SET_LOGIN',
  payload: data,
});

export const getNonce = (data) => ({
  type: 'GET_NONCE',
  payload: data,
});

export const setNonce = (data) => ({
  type: 'SET_NONCE',
  payload: data,
});

export const logout = () => ({
  type: 'LOGOUT'
});

export const setAddress = (data) => ({
  type: 'SET_ADDRESS',
  payload: data
});

export const setNetwork = (data) => ({
  type: 'SET_NETWORK',
  payload: data
})

export const setChangeNetwork = (data) => ({
  type: 'SET_CHANGE_NETWORK',
  payload: data
})

export const getUser = () => ({
  type: 'GET_USER'
});

export const updateUser = (data) => ({
  type: 'UPDATE_USER',
  payload: data
});

export const updateUserImage = (data) => ({
  type: 'UPDATE_USER_IMAGE',
  payload: data
});

export const setUser = (data) => ({
  type: 'SET_USER',
  payload: data
})

/*========== PAGE LOADER ACTIONS ============= */

export const setLoader = (data) => ({
  type: 'SET_LOADER',
  payload: data,
});

/*========== CREATE NFT ACTIONS ============= */

export const createNFT = (data) => ({
  type: 'CREATE_NFT',
  payload: data,
});

export const getSingleNft = (data) => ({
  type: 'GET_SINGLE_NFT',
  payload: data,
});

export const setSingleNft = (data) => ({
  type: 'SET_SINGLE_NFT',
  payload: data,
});

export const mintNFT721 = (data) => ({
  type: 'MINT_NFT_721',
  payload: data,
});

export const mintNFT1155 = (data) => ({
  type: 'MINT_NFT_1155',
  payload: data,
});

export const listNft = (data) => ({
  type: 'LIST_NFT',
  payload: data,
});

export const unListNft = (data) => ({
  type: 'UNLIST_NFT',
  payload: data,
});

export const transferNft = (data) => ({
  type: 'TRANSFER_NFT',
  payload: data,
});

export const createAuction = (data) => ({
  type: 'CREATE_AUCTION',
  payload: data,
});

export const placeBid = (data) => ({
  type: 'PLACE_BID',
  payload: data,
});

export const endAuction = (data) => ({
  type: 'END_AUCTION',
  payload: data,
});

export const getBids = (data) => ({
  type: 'GET_BIDS',
  payload: data,
});

export const setBids = (data) => ({
  type: 'SET_BIDS',
  payload: data,
});

export const getAuctions = (data) => ({
  type: 'GET_AUCTIONS',
  payload: data,
});

export const setAuctions = (data) => ({
  type: 'SET_AUCTIONS',
  payload: data,
});

export const getAllNfts = (data) => ({
  type: 'GET_ALL_NFTS',
  payload: data,
});

export const setAllNfts = (data) => ({
  type: 'SET_ALL_NFTS',
  payload: data,
});

/*========== CREATE Collection ACTIONS ============= */

export const createCollection = (data) => ({
  type: 'CREATE_COLLECTION',
  payload: data,
});

export const getCollection = () => ({
  type: 'GET_COLLECTION'
});

export const setCollection = (data) => ({
  type: 'SET_COLLECTION',
  payload: data,
});

export const getSingleCollection = (data) => ({
  type: 'GET_SINGLE_COLLECTION',
  payload: data,
});

export const setSingleCollection = (data) => ({
  type: 'SET_SINGLE_COLLECTION',
  payload: data,
});

export const getCollectionDetails = (data) => ({
  type: 'GET_SINGLE_COLLECTION_DETAILS',
  payload: data,
});

export const setSingleCollectionDetails = (data) => ({
  type: 'SET_SINGLE_COLLECTION_DETAILS',
  payload: data,
});

export const getAllCollection = (data) => ({
  type: 'GET_ALL_COLLECTION',
  payload: data,
});

export const setAllCollection = (data) => ({
  type: 'SET_ALL_COLLECTION',
  payload: data,
});

export const getExplore = (data) => ({
  type: 'GET_EXPLORE',
  payload: data,
});

export const setExplore = (data) => ({
  type: 'SET_EXPLORE',
  payload: data,
});

export const getUserNft = (data) => ({
  type: 'GET_USER_NFTS',
  payload: data,
});

export const setUserNft = (data) => ({
  type: 'SET_USER_NFTS',
  payload: data,
});

export const addRemoveFavItems = (data) => ({
  type: 'ADD_REMOVE_FAV_ITEMS',
  payload: data,
});

export const getUserFavItems = (data) => ({
  type: 'GET_USER_FAV_ITEMS',
  payload: data,
});

export const setUserFavItems = (data) => ({
  type: 'SET_USER_FAV_ITEMS',
  payload: data,
});

export const updateLogo = (data) => ({
  type: 'UPLOAD_LOGO',
  payload: data,
});

export const updateBackground = (data) => ({
  type: 'UPLOAD_BACKGROUND',
  payload: data,
});

export const updateCollection = (data) => ({
  type: 'UPDATE_COLLECTION',
  payload: data,
});

/*========== ACTIVITY ACTIONS ============= */

export const getAllActivity = (data) => ({
  type: 'GET_ALL_ACTIVITY',
  payload: data,
});

export const setAllActivity = (data) => ({
  type: 'SET_ALL_ACTIVITY',
  payload: data,
});

export const getNftActivity = (data) => ({
  type: 'GET_NFT_ACTIVITY',
  payload: data,
});

export const setNftActivity = (data) => ({
  type: 'SET_NFT_ACTIVITY',
  payload: data,
});

export const getCategory = () => ({
  type: 'GET_CATEGORY',
});

export const setCategory = (data) => ({
  type: 'SET_CATEGORY',
  payload: data,
});