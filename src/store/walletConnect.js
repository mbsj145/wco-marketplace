import Web3 from 'web3';
export const connectMetamask = async (network, isTestnet) => {
    try {
      // Check if Metamask is installed
      if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();

        let x = await web3.currentProvider.chainId;
        if (!x) {
            return Promise.reject(new Error({message:`Please Install Metamask!!!`}));
        }

        // Define network details
        let rpcUrl, chainId, chainName, nativeCurrency, blockExplorerUrl;
        switch (network) {
          case 'bnb':
            rpcUrl = isTestnet
              ? ['https://bsc-testnet.publicnode.com','https://data-seed-prebsc-2-s2.bnbchain.org:8545']
              : ['https://bsc-dataseed.binance.org','https://bsc-dataseed3.bnbchain.org','https://bsc.publicnode.com']
            chainId = isTestnet ? '0x61' : '0x38';
            chainName = isTestnet ? 'Binance Smart Chain Testnet' : 'Binance Smart Chain';
            nativeCurrency = {
              name:  isTestnet ? 'tBNB' : 'BNB',
              symbol: isTestnet ? 'tBNB' : 'BNB',
              decimals: 18,
            };
            blockExplorerUrl = isTestnet
              ? 'https://testnet.bscscan.com'
              : 'https://bscscan.com';
            break;
          case 'eth':
            rpcUrl = isTestnet
              ? ['https://eth-sepolia.public.blastapi.io', 'https://sepolia.publicgoods.network']
              : ['https://ethereum.publicnode.com','https://eth.llamarpc.com','https://rpc.mevblocker.io']
            chainId = isTestnet ? '0xaa36a7' : '0x1';
            chainName = isTestnet ? 'Sepolia Testnet' : 'Ethereum Mainnet';
            nativeCurrency = {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18,
            };
            blockExplorerUrl = isTestnet ? 'https://sepolia.etherscan.io' : 'https://etherscan.io';
            break;
          case 'avax':
            rpcUrl = isTestnet
              ? ['https://avalanche-fuji-c-chain.publicnode.com']
              : ['https://api.avax.network/ext/bc/C/rpc','https://avalanche.public-rpc.com','https://avalanche.drpc.org']
            chainId = isTestnet ? '0xa869' : '0xa86a';
            chainName = isTestnet ? 'Avalanche Testnet' : 'Avalanche Mainnet';
            nativeCurrency = {
              name: 'AVAX',
              symbol: 'AVAX',
              decimals: 18,
            };
            blockExplorerUrl = isTestnet
              ? 'https://testnet.snowtrace.io'
              : 'https://snowtrace.io';
            break;
          case 'xdc':
            rpcUrl = isTestnet
              ? ['https://earpc.apothem.network','https://erpc.apothem.network']
              : ['https://earpc.xinfin.network','https://erpc.xinfin.network'];
            chainId = isTestnet ? '0x33' : '0x32';
            chainName = isTestnet ? 'XDC Testnet' : 'XDC Mainnet';
            nativeCurrency = {
              name: isTestnet ? 'TXDC' : 'XDC',
              symbol: isTestnet ? 'TXDC' : 'XDC',
              decimals: 18,
            };
            blockExplorerUrl = isTestnet
              ? 'https://explorer.apothem.network'
              : 'https://xdc.blocksscan.io/';
            break;
          default:
            return Promise.reject(new Error({message:'Invalid network'}));
        }
        const netId = await web3.eth.net.getId();
        if (isTestnet && netId !== 51) {
            await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
                {
                chainId: chainId,
                chainName: chainName,
                nativeCurrency: nativeCurrency,
                rpcUrls: rpcUrl,
                blockExplorerUrls: [blockExplorerUrl],
                },
            ],
            });
        }else if(!isTestnet && netId !== 50){
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
                {
                chainId: chainId,
                chainName: chainName,
                nativeCurrency: nativeCurrency,
                rpcUrls: rpcUrl,
                blockExplorerUrls: [blockExplorerUrl],
                },
            ],
            });
        }
        else {
            // Switch to the selected network
            // await web3.eth.switchNetwork(chainId);
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId }],
            });
        }

            const accounts = await web3.eth.getAccounts();
            const address = accounts[0];
            return Promise.resolve({address});
       
      } else {
        console.log('Metamask is not installed');
        return Promise.reject(new Error({message:'Metamask is not installed'}));
      }
    } catch (error) {
      console.log('Error connecting to Metamask:', error);
      return Promise.reject(error.message);
    }
};

export const getNetworkSymbol = (networkId) => {
    const networkMap = {
      '1': 'eth', // Ethereum Mainnet
      '11155111': 'eth', // Sepolia Testnet
      '56': 'bnb', // Binance Smart Chain Mainnet
      '97': 'bnb', // Binance Smart Chain Testnet (BSC Testnet)
      '43114': 'avax', // Avalanche Mainnet
      '43113': 'avax', // Avalanche Fuji Testnet
      '50': 'xdc', // xdc Mainnet
      '51': 'xdc', // xdc Testnet
    };
  
    return networkMap[networkId] || 'Unknown';
};
  