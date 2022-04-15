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
      params: [{ chainId: Web3.utils.toHex(137) }], // chainId must be in hexadecimal numbers
    });
  } catch (error) {
    console.log(error,error.code);
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