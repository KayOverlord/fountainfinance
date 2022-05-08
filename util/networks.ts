import {ethers} from "ethers";

export const networkMap = {
    POLYGON_MAINNET: {
      chainId: ethers.utils.hexlify(137), // '0x89'
      chainName: "Polygon Mainnet", 
      nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
      rpcUrls: ["https://polygon-rpc.com"],
      blockExplorerUrls: ["https://www.polygonscan.com/"],
    },
    MUMBAI_TESTNET: {
      chainId: ethers.utils.hexlify(80001), // '0x13881'
      chainName: "Mumbai",
      nativeCurrency: { name: "tMATIC", symbol: "tMATIC", decimals: 18 },
      rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
      blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    },
  };