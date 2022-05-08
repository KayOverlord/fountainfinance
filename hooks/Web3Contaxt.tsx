import { createContext, useContext, useEffect,useState } from "react"
//import Web3 from "web3";
import Web3Modal from "web3modal";
import { networkMap } from "../util/networks";
import {providerOptions} from "../util/Web3Provider"
import {ethers} from "ethers";



const context = createContext<null|any>("");

export const useWeb3=()=>{
return useContext(context)
}

export const Web3Provider=({children})=>{
  const [address,setAddress]=useState<string[]>();
  const [connected,setConnected]=useState(false);
  const [provider,setProvider]=useState(null);
  const [web3Modal,setWeb3Modal]=useState(null);
  const [library,setLibrary]=useState(null);

    
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
           if(chainId!==ethers.utils.hexlify(networkMap.MUMBAI_TESTNET.chainId)){
            handleDisconnect();
           }
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
   if(provider!==null){
    setAddress(provider.selectedAddress);
    setConnected(true)
   }else{
    const prov = await web3Modal.connect();
    const library = new ethers.providers.Web3Provider(prov);
    setLibrary(library)
    setProvider(prov)
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



const disconnectWallet =async()=>{
  await web3Modal.clearCachedProvider();

  setConnected(false);
  setProvider(null);
  
 return;
}

/*
* This is the send_transaction function
* @param myContractAddress This is the bar parameter
* @returns returns a string version of bar
*/
const send_transaction =async(Abi:[],ContractAddress:string,methodName:string,params:[])=>{
var myContract = new ethers.Contract(ContractAddress,Abi,library);
// myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
//console.log("gas",myContract.estimateGas({from:address}),"price",web3.eth.getGasPrice())
//const estimateGas = await myContract.estimateGas({from:address});
const feeData = await provider.getFeeData();
console.log("fee",feeData);

if(params?.length){ 
  return await myContract[methodName](...params).then(callback);
}
}

const get_contract_data=async(Abi:[],ContractAddress:string,methodName:string,params:[])=>{
  var MyContract = new ethers.Contract(ContractAddress,Abi,library);

  if(params?.length){ 
    return await MyContract[methodName](...params).then(callback);
  }else{
    return await MyContract[methodName]().then(callback);
  }
}

const get_balance=async(Abi:[],token_contract:string,contract:string)=>{
  var MyContract = new ethers.Contract(token_contract,Abi,library);
  return await MyContract.balanceOf(contract).then(callback);
  
}

const callback=(result,error)=>{
  if(result){

return result
  }
  return "0";
}


const values ={
    web3Modal,
    provider,
    address,
    connected,
    connectWallet,
    disconnectWallet,
    send_transaction,
    get_contract_data,
    get_balance
}
return(
<context.Provider value={values}>
    {children}
</context.Provider>
)

}

/*

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