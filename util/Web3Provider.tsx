import WalletConnectProvider from "@walletconnect/web3-provider";

export const providerOptions = {
  
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
    // torus: {
    //   package: Torus, // required
    //   options: {
    //     networkParams: {
    //       host: "https://localhost:8545", // optional
    //       chainId: 1337, // optional
    //       networkId: 1337 // optional
    //     },
    //     config: {
    //       buildEnv: "development" // optional
    //     }
    //   }
    // },
    // portis: {
    //   package: Portis, // required
    //   options: {
    //     id: "PORTIS_ID" // required
    //   }
    // }
  };