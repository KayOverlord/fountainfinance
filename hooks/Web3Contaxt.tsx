import { createContext, useContext, useEffect,useState } from "react"
import Web3 from "web3";
import Web3Modal from "web3modal";
import { ContractContext,FountainMethodNames,Fountain } from "../util/Abi/generated-types/Fountain";
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
  const [web3,setWeb3]=useState(null);
    
      // Chosen wallet provider given by the dialog window
   

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
          fatchAccountData()
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
   if(provider!==null){
    setAddress(provider.selectedAddress);
    setConnected(true)
   }else{
    const prov = await web3Modal.connect();
    const w3 = new Web3(prov);
    setProvider(prov)
    setWeb3(w3)
    if (prov){
      setAddress(prov.selectedAddress);
      setConnected(true)
    }
   }
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
  await web3Modal.clearCachedProvider();

  setConnected(false);
  setProvider(null);
  
 return;
}

/*
* This is the send_signed_transaction function
* @param myContractAddress This is the bar parameter
* @returns returns a string version of bar
*/
const send_signed_transaction =async(Abi,ContractAddress)=>{
//
// var myContract = new web3.eth.Contract(Abi,ContractAddress);
// myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
}

const get_contract_data =(Abi,ContractAddress)=>{
  console.log("web3",web3)
  var MyContract = new web3.eth.Contract(Abi,ContractAddress);
  MyContract['methods']['name']().call(callback);
}

const callback=(error, result)=>{
console.log("results:",result);
console.log("error",error)
}

const values ={
    web3Modal,
    web3,
    provider,
    address,
    connected,
    connectWallet,
    disconnectWallet,
    send_signed_transaction,
    get_contract_data
}
return(
<context.Provider value={values}>
    {children}
</context.Provider>
)

}

/*
FOUNTAIN USDC(0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174)
0x5918E233B519d67489303AF5DA1F0eB0A9fe5bD0
FTN-USDC
Fountain USD Coin (PoS)

FOUNTAIN COMBO(0x6DdB31002abC64e1479Fc439692F7eA061e78165)
0x0ab865137ddb23e99447369A0340C7eB92Ad1C0F
FTN-COMBO
Fountain Furucombo (PoS)

FOUNTAIN GOLI(0x76D589B09dcD4C15Af511DcD42a2764a176365e8)
0x2E39D2AE5b500641D819fF15d2F0141987eDBfDf
 FTN-GOLI
Fountain Goli

FOUNTAIN MATIC(0x0000000000000000000000000000000000001010)
0x252F5FB243B656ceFffEBcF7926796a2048E02f9
 FTN-MATIC
Fountain Matic Token


   .on('transactionHash', function(hash){
        console.log("HASH",hash)
    })
    .on('receipt', function(receipt){
      console.log("Receipt",receipt)
    })
    .on('confirmation', function(confirmationNumber, receipt){
      console.log("confirmationNumber",confirmationNumber)
    })
    .on('error', function(error, receipt) {
      console.log("CALL ERROR",error)
    });
*/