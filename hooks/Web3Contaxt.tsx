import { createContext, useContext, useEffect,useState } from "react"
import Web3 from "web3";
import Web3Modal from "web3modal";
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

const fatchAccountData=()=>{
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