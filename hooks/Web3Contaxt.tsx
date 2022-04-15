import { createContext, useContext, useEffect,useState } from "react"
import Web3 from "web3";
import Web3Modal from "web3modal";
import { networkMap } from "../Api/networks";
import {providerOptions} from "../util/Web3Provider"



const context = createContext<null|any>("");

export const useWeb3=()=>{
return useContext(context)
}

export const Web3Provider=({children})=>{
  const [address,setAddress]=useState<string[]>();
  const [connected,setConnected]=useState(false);
  const [provider,setProvider]=useState(null);
  const [web3Modal,setWeb3Modal]=useState(null);
  
  
    
      // Chosen wallet provider given by the dialog window
      let web3;

    useEffect(() => {
        const sub =async()=>{
         var web3Modal = new Web3Modal({
            network: "mainnet", // optional
            cacheProvider: true, // optional
            providerOptions, // required
            theme: "dark"
          });
          setWeb3Modal(web3Modal);
         }
      sub();
      
       }, []);


       useEffect(() => {
        if(window.ethereum) {
          window.ethereum.on('disconnect', () => {
            setConnected(false)
            console.log("Websocket Provider connection disconnected!");
          })
        }
      },[])

const connectWallet=async()=>{
  if(web3Modal){
  web3Modal.clearCachedProvider();
  }
  try {
  const provider = await web3Modal.connect();
   setProvider(provider)
   web3 = new Web3(provider);
   fatchAccountData();
  } catch (error) {
    console.log("Could not get a wallet connection", error,provider);
    return;
  }

if(provider){
  provider.on("accountsChanged", (accounts) => {
    if(accounts.length >0){
      setConnected(true)
      setAddress(accounts)
    }else{
      setConnected(false)
    }
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    fatchAccountData()
    console.log("chain ID", chainId);
  });

  // Subscribe to provider connection
  provider.on('connect', (info) => {
    fatchAccountData()
    setConnected(true)
    console.log("Websocket Provider connection established!");
  });

  // Subscribe to provider disconnection
  provider.on("disconnect", (info) => {
    setConnected(false)
    console.log("Websocket Provider connection disconnected!");
  });
}


    return;  
}


const fatchAccountData=async()=>{
  // Check if MetaMask is installed
 // MetaMask injects the global API into window.ethereum
 if (window.ethereum) {
  try {
    // check if the chain to connect to is installed
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: web3.utils.toHex(137) }], // chainId must be in hexadecimal numbers
    }).then(() => {
      web3.eth.net.isListening(function (error, result) {
        if (error) {
          console.error(error);
        } else {
          setConnected(result);
        }
      });
        web3.eth.getAccounts().then(async (addr:string[]) => {
          return setAddress(addr);
                    
        });
    });
  } catch (error) {
    // This error code indicates that the chain has not been added to MetaMask
    // if it is not, then install it into the user MetaMask
    if (error.code === 4902) {
      try {
       await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [networkMap.POLYGON_MAINNET],
        }).then(() => {
          web3.eth.net.isListening(function (error, result) {
            if (error) {
              console.error(error);
            } else {
              setConnected(result);
            }
          });
            web3.eth.getAccounts().then(async (addr:string[]) => {
              return setAddress(addr);
                        
            });
        });
      } catch (addError) {
        console.error("addError", addError);
      }
    }
    console.error(error);
  }
} else {
  // if no window.ethereum then MetaMask is not installed
  alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
} 
  
   
}

const disconnectWallet =async()=>{
   // TODO: Which providers have close method?
  if(provider!==undefined) {

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    await web3Modal.clearCachedProvider();
    setProvider(null);
    setConnected(false);
    
  }else{
    setConnected(false)
  }
 return;
}

const send_and_signup_transaction =async()=>{
  const myContractAddress = "0x5312e168b4847c62B33116443495F24DdB1539a7";//"0x5312e168b4847c62B33116443495F24DdB1539a7";//"0x67Bc15363C52d0393797B9d69Ff17f4c23eba5F1";
  const walletAddress ='0x0037Daf6fb154dB55110cEd85cB4bA9E1204CA17';
  const privateKey = "8a55ce254222138a5751bd1de9f5a31914e4ecf153d015965ed0e245cf2c5f6b";
  const myContractInstance = new web3.eth.Contract(myContractAbi, myContractAddress);
  
 
 const tx = myContractInstance.methods.AirTransfer(UsersArray,value+"000000000000000000","0x76d589b09dcd4c15af511dcd42a2764a176365e8");
 
 const gas = await tx.estimateGas({from:walletAddress});
 const gasPrice = await web3.eth.getGasPrice();
 const data = tx.encodeABI();
 const nonce = await web3.eth.getTransactionCount(walletAddress);

 const signedTx = await web3.eth.accounts.signTransaction({
  data,
  gas,
  gasPrice,
  nonce,
  to:myContractAddress,
  from: walletAddress
 },privateKey
 );

 await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
 .on('transactionHash', (hash) => {
  console.log('-----TRANSACTION HASH-----');
  console.log(hash);
  console.log('-----end transactionHash-----');
})
.on('error', (error, receipt) => { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
  console.log('-----ERROR-----');
  console.log(receipt);
  console.log(error);
  console.log('-----end ERROR-----');
});
}

const values ={
    web3Modal,
    web3,
    provider,
    address,
    connected,
    connectWallet,
    disconnectWallet
}
return(
<context.Provider value={values}>
    {children}
</context.Provider>
)

}