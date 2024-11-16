let { web3 } = require('../web3');
let { env } = require('../config');

let TokenData = require(`./${env}/marketplaceToken.json`);
let ERC721 = require(`./${env}/ERC721.json`);
let ERC1155 = require(`./${env}/ERC1155.json`);
let Marketplace = require(`./${env}/marketplaceContract.json`);
let TokenABI = "", TokenAddress = "", Token = "", ERC721ABI = "", ERC721BYTECODE = "", ERC1155ABI = "", ERC1155BYTECODE = "", MarketplaceAddress = "", MarketplaceAbi = "", MarketplaceToken = "";
let makeTokens =  async () => {
  return new Promise(async (resolve, reject)=>{
    let chain = await web3.eth.getChainId();
    chain = web3.utils.hexToNumber(chain);
    chain = Number(chain);
    if(chain == 56 || chain == 97){
      /********* Marketplace Token *********/
      TokenAddress = TokenData['bnbAddress'];
      TokenABI = TokenData['abi'];
      Token = new web3.eth.Contract(TokenABI,TokenAddress);
      /********* ERC721 *********/
      ERC721ABI = ERC721['abi'];
      ERC721BYTECODE = ERC721['bytecode'];
      /********* ERC1155 *********/
      ERC1155BYTECODE = ERC1155['bytecode'];
      ERC1155ABI = ERC1155['abi'];
      /********* Marketplace ********/
      MarketplaceAddress = Marketplace['bnbAddress']
      MarketplaceAbi = Marketplace['abi']
      MarketplaceToken = new web3.eth.Contract(MarketplaceAbi,MarketplaceAddress);
      return resolve({TokenAddress,TokenABI,Token,ERC721ABI,ERC721BYTECODE,ERC1155ABI,ERC1155BYTECODE,MarketplaceAddress,MarketplaceAbi,MarketplaceToken})
    }
    if(chain == 1 || chain == 11155111) {
      /********* Marketplace Token *********/
      TokenAddress = TokenData['ethAddress'];
      TokenABI = TokenData['abi'];
      Token = new web3.eth.Contract(TokenABI,TokenAddress);
      /********* ERC721 *********/
      ERC721ABI = ERC721['abi'];
      ERC721BYTECODE = ERC721['bytecode'];
      /********* ERC1155 *********/
      ERC1155BYTECODE = ERC1155['bytecode'];
      ERC1155ABI = ERC1155['abi'];
      /********* Marketplace ********/
      MarketplaceAddress = Marketplace['ethAddress']
      MarketplaceAbi = Marketplace['abi']
      MarketplaceToken = new web3.eth.Contract(MarketplaceAbi,MarketplaceAddress);
      return resolve({TokenAddress,TokenABI,Token,ERC721ABI,ERC721BYTECODE,ERC1155ABI,ERC1155BYTECODE,MarketplaceAddress,MarketplaceAbi,MarketplaceToken})
    }
    if(chain == 43114 || chain == 43113) {
      /********* Marketplace Token *********/
      TokenAddress = TokenData['avaxAddress']
      TokenABI = TokenData['abi'];
      Token = new web3.eth.Contract(TokenABI,TokenAddress);
      /********* ERC721 *********/
      ERC721ABI = ERC721['abi'];
      ERC721BYTECODE = ERC721['bytecode'];
      /********* ERC1155 *********/
      ERC1155BYTECODE = ERC1155['bytecode'];
      ERC1155ABI = ERC1155['abi'];
      /********* Marketplace ********/
      MarketplaceAddress = Marketplace['avaxAddress']
      MarketplaceAbi = Marketplace['abi']
      MarketplaceToken = new web3.eth.Contract(MarketplaceAbi,MarketplaceAddress);
      return resolve({TokenAddress,TokenABI,Token,ERC721ABI,ERC721BYTECODE,ERC1155ABI,ERC1155BYTECODE,MarketplaceAddress,MarketplaceAbi,MarketplaceToken})
    }
    if(chain == 50 || chain == 51) {
      /********* Marketplace Token *********/
      TokenAddress = TokenData['xdcAddress']
      TokenABI = TokenData['abi'];
      Token = new web3.eth.Contract(TokenABI,TokenAddress);
      /********* ERC721 *********/
      ERC721ABI = ERC721['abi'];
      ERC721BYTECODE = ERC721['bytecode'];
      /********* ERC1155 *********/
      ERC1155BYTECODE = ERC1155['bytecode'];
      ERC1155ABI = ERC1155['abi'];
      /********* Marketplace ********/
      MarketplaceAddress = Marketplace['xdcAddress']
      MarketplaceAbi = Marketplace['abi']
      MarketplaceToken = new web3.eth.Contract(MarketplaceAbi,MarketplaceAddress);
      return resolve({TokenAddress,TokenABI,Token,ERC721ABI,ERC721BYTECODE,ERC1155ABI,ERC1155BYTECODE,MarketplaceAddress,MarketplaceAbi,MarketplaceToken})
    }
  })
}

export {
  web3,
  makeTokens,
};
