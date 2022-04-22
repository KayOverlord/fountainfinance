import { createContext, useContext, useEffect,useState } from "react"
import Web3 from "web3";
import Web3Modal from "web3modal";
import { ContractContext } from "../util/Abi/generated-types/Fountain";
import { networkMap } from "../util/networks";
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


       useEffect(()=>{

        const handleAccountsChanged=(accounts)=>{
          console.log("accountsChanged", accounts);
          if(accounts.length >0){
            setConnected(true)
            setAddress(accounts)
          }else{
            setConnected(false)
          }
        }

        const handleChainChanged=(chainId)=>{
           // fatchAccountData()
           console.log("chain ID", chainId);
        }
        const handleConnect=()=>{
          //fatchAccountData()
          setConnected(true)
          console.log("Websocket Provider connection established!");

        }

        const handleDisconnect=()=>{
          setConnected(false)
            console.log("Websocket Provider connection disconnected!");
        }

        if(provider?.on){

        
          provider.on("accountsChanged",handleAccountsChanged);
        
          // Subscribe to chainId change
          provider.on("chainChanged",handleChainChanged);
        
          // Subscribe to provider connection
          provider.on('connect',handleConnect);
        
          // Subscribe to provider disconnection
          provider.on("disconnect",handleDisconnect);
        }
        return () => {
          if (provider?.removeListener) {
            provider.removeListener('accountsChanged', handleAccountsChanged)
            provider.removeListener('chainChanged', handleChainChanged)
            provider.removeListener('connect', handleConnect)
            provider.removeListener('disconnect', handleDisconnect)
          }
        }
       },[provider])
     

const connectWallet=async()=>{
 
  try {
  const provider = await web3Modal.connect();
   setProvider(provider)
   web3 = new Web3(provider);
   //fatchAccountData();
  } catch (error) {
    console.log("Could not get a wallet connection", error,provider);
    return;
  }
    return;  
}


const fatchAccountData=async()=>{
  // Check if MetaMask is installed
 // MetaMask injects the global API into window.ethereum
 if (provider) {
  try {
    // check if the chain to connect to is installed
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: web3.utils.toHex(networkMap.MUMBAI_TESTNET.chainId) }], // chainId must be in hexadecimal numbers
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
       await provider.request({
          method: 'wallet_addEthereumChain',
          params: [networkMap.MUMBAI_TESTNET],
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
  console.log("provider",web3)
  await web3Modal.clearCachedProvider();

  setConnected(false)
  // if(provider!==undefined) {
    
  //   // If the cached provider is not cleared,
  //   // WalletConnect will default to the existing session
  //   // and does not allow to re-scan the QR code with a new wallet.
  //   // Depending on your use case you may want or want not his behavir.
   
  //   setProvider(null);
  //   setConnected(false);
    
  // }else{
    
  // }
 return;
}

/*
* This is the send_signed_transaction function
* @param myContractAddress This is the bar parameter
* @returns returns a string version of bar
*/
const send_signed_transaction =async(myContractAddress: any,myContractAbi: any,myWalletAddress: any,privateKey: any)=>{

const myContractInstance = new web3.eth.Contract(myContractAbi, myContractAddress) as unknown as ContractContext; 
 const tx = myContractInstance.methods.AirTransfer(UsersArray,value+"000000000000000000","0x76d589b09dcd4c15af511dcd42a2764a176365e8");
 
 const gas = await tx.estimateGas({from:myWalletAddress});
 const gasPrice = await web3.eth.getGasPrice();
 const data = tx.encodeABI();
 const nonce = await web3.eth.getTransactionCount(myWalletAddress);

 const signedTx = await web3.eth.accounts.signTransaction({
  data,
  gas,
  gasPrice,
  nonce,
  to:myContractAddress,
  from: myWalletAddress
 },privateKey
 );

 return await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
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
return;
}

const values ={
    web3Modal,
    web3,
    provider,
    address,
    connected,
    connectWallet,
    disconnectWallet,
    send_signed_transaction
}
return(
<context.Provider value={values}>
    {children}
</context.Provider>
)

}