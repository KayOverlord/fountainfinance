import { createContext, useContext, useEffect,useState } from "react"
import Web3 from "web3";
import Web3Modal from "web3modal";
import {providerOptions} from "../util/Web3Provider"

declare global {
  interface Window {
    ethereum: any;
  }
}


const context = createContext<null|any>("");

export const useWeb3=()=>{
return useContext(context)
}

export const Web3Provider=({children})=>{
  const [address,setAddress]=useState<string[]>();
  const [connected,setConnected]=useState(false);
  
      let web3Modal;
      // Chosen wallet provider given by the dialog window
      let provider;

    useEffect(() => {
        const sub =async()=>{
          web3Modal = new Web3Modal({
            network: "mainnet", // optional
            cacheProvider: true, // optional
            providerOptions, // required
            theme: "dark"
          });
          
         }
      sub();

      
       }, [])

const connectWallet=async()=>{
  if(web3Modal){
  web3Modal.clearCachedProvider();
  }
  try {
   provider = await web3Modal.connect();
  } catch (error) {
    console.log("Could not get a wallet connection", error);
    return;
  }


  provider.on("accountsChanged", (accounts) => {
    console.log("accounts", accounts);
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    //fatchAccountData()
    console.log("chain ID", chainId);
  });

  // Subscribe to provider connection
  provider.on('connect', (info) => {
    //fatchAccountData()
    console.log("Connect")
  });

  // Subscribe to provider disconnection
  provider.on("disconnect", (info) => {
   
    console.log(info);
  });

  
    return;
}

window.ethereum.on('connect',(connectInfo) =>{
  console.log(connectInfo);
});

const fatchAccountData=()=>{
  const web3 = new Web3(provider);
    web3.eth.getAccounts().then(async (addr:string[]) => {
      return setAddress(addr);
                
    });
}

const disconnectWallet =async()=>{
   
 return await web3Modal.clearCachedProvider();
}

const values ={
    web3Modal,
    provider,
    address,
    connectWallet,
    disconnectWallet
}
return(
<context.Provider value={values}>
    {children}
</context.Provider>
)

}