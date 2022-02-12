import { createContext, useContext, useEffect,useState } from "react"
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const context = createContext<null|any>("");

export const useWeb3=()=>{
return useContext(context)
}

export const Web3Provider=({children})=>{
  const [address,setAddress]=useState<string[]>();

    const providerOptions = {
  
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            infuraId:process.env.NEXT_PUBLIC_INFURA_ID // required
          }
        },
        // fortmatic: {
        //   package: Fortmatic, // required
        //   options: {
        //     key: "FORTMATIC_KEY", // required,
        //     network: customNetworkOptions // if we don't pass it, it will default to localhost:8454
        //   }
        // },
        // // torus: {
        // //   package: Torus, // required
        // //   options: {
        // //     networkParams: {
        // //       host: "https://localhost:8545", // optional
        // //       chainId: 1337, // optional
        // //       networkId: 1337 // optional
        // //     },
        // //     config: {
        // //       buildEnv: "development" // optional
        // //     }
        // //   }
        // // },
        // portis: {
        //   package: Portis, // required
        //   options: {
        //     id: "PORTIS_ID" // required
        //   }
        // }
      };

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

const connectWeb3=async()=>{
  if(web3Modal){
  web3Modal.clearCachedProvider();
  }
  try {
    web3Modal.connect().then((data)=>{
      provider = data;
       
    provider.on("accountsChanged", (accounts) => {
      console.log("accounts", accounts);
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
      fatchAccountData()
      console.log("chain ID", chainId);
    });

    // Subscribe to provider connection
    provider.on("connect", (info) => {
      fatchAccountData()
      console.log(info);
    });

    // Subscribe to provider disconnection
    provider.on("disconnect", (info) => {
     
      console.log(info);
    });
    }).catch((error)=>{
      switch (error.code) {
        case 4001:
          console.log("rejected")
          break;
        default:
          break;
      }
    })
  } catch (error) {
  }
  
    return null;
}

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
    connectWeb3,
    disconnectWallet
}
return(
<context.Provider value={values}>
    {children}
</context.Provider>
)

}