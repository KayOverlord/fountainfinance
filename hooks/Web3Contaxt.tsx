import { createContext, useContext, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { networkMap } from "../util/networks";
import { providerOptions } from "../util/Web3Provider";
import { ethers } from "ethers";
import MetaMaskOnboarding from "@metamask/onboarding";

const context = createContext<null | any>("");

export const useWeb3 = () => {
  return useContext(context);
};

export const Web3Provider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [connected, setConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [web3Modal, setWeb3Modal] = useState(null);
  const [library, setLibrary] = useState(null);
  const [signer, setSigner] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);

  useEffect(() => {
    const sub = async () => {
      var web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions, // required
        theme: "dark",
      });
      setWeb3Modal(web3Modal);
    };
    sub();
  }, []);

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      // if (accounts.length > 0) {
      //   setConnected(true);
      //   setAddress(accounts);
      // } else {
      //   setConnected(false);
      // }
      handleDisconnect();
    };

    const handleChainChanged = (chainId) => {
      if (chainId !== networkMap.POLYGON_MAINNET.chainId) {
        handleDisconnect();
      }
    };
    const handleConnect = () => {
      switchNetwork();
      setConnected(true);
    };

    const handleDisconnect = () => {
      setConnected(false);
    };

    if (provider?.on) {
      provider.on("accountsChanged", handleAccountsChanged);

      // Subscribe to chainId change
      provider.on("chainChanged", handleChainChanged);

      // Subscribe to provider connection
      provider.on("connect", handleConnect);

      // Subscribe to provider disconnection
      provider.on("disconnect", handleDisconnect);
    }
    return () => {
      if (provider?.removeListener) {
        provider.removeListener("accountsChanged", handleAccountsChanged);
        provider.removeListener("chainChanged", handleChainChanged);
        provider.removeListener("connect", handleConnect);
        provider.removeListener("disconnect", handleDisconnect);
      }
    };
  }, [provider]);

  const connectWallet = async (onSuccess, onError) => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      const chain = ethers.utils.hexlify(
        ethers.utils.toUtf8Bytes(window.ethereum.networkVersion)
      );

      if (chain !== networkMap.POLYGON_MAINNET.chainId) {
        switchNetwork();
      }
      try {
        const prov = await web3Modal.connect();
        setProvider(prov);

        const library = new ethers.providers.Web3Provider(prov);
        setLibrary(library);

        const signer = library.getSigner();
        setSigner(signer);

        signer
          .getAddress()
          .then((result) => {
            setAddress(result);
            setConnected(true);
          })
          .catch((error) => {
            onError?.(error);
          });
        const balance = await signer.getBalance();
        setWalletBalance(ethers.utils.formatEther(balance));
        onSuccess("Connection success");
      } catch (error) {
        onError?.(error);
      }
    } else {
      const onboarding = new MetaMaskOnboarding();
      onboarding.startOnboarding();
    }
  };

  const disconnectWallet = async () => {
    await web3Modal.clearCachedProvider();

    setConnected(false);
    setProvider(null);

    return;
  };

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: networkMap.POLYGON_MAINNET.chainId }], // chainId must be in hexadecimal numbers
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [networkMap.POLYGON_MAINNET],
          });
        } catch (addError) {
          console.error("addError", addError);
        }
      }
    }
  };
  /*
   * This is the send_transaction function
   * @param myContractAddress This is the bar parameter
   * @returns returns a string version of bar
   */
  const send_transaction = async (
    Abi: [],
    ContractAddress: string,
    methodName: string,
    params: [],
    onSuccess,
    onError
  ) => {
    var myContract = new ethers.Contract(ContractAddress, Abi, signer);

    //const feeData = await provider.getFeeData();

    if (params?.length) {
      return await myContract[methodName](...params).then(
        callback(onSuccess, onError)
      );
    }
  };
  /**
   * This is the get_contract_data function
   * @param Abi This is the bar parameter
   * @param ContractAddress This is the bar parameter
   * @param methodName This is the bar parameter
   * @param params This is the bar parameter
   * @returns returns a string version of bar
   */
  const get_contract_data = async (
    Abi: [],
    ContractAddress: string,
    methodName: string,
    params: []
  ) => {
    var MyContract = new ethers.Contract(ContractAddress, Abi, library);

    if (params?.length) {
      return await MyContract[methodName](...params).then(callback);
    } else {
      return await MyContract[methodName]().then(callback);
    }
  };

  const get_balance = async (
    Abi: [],
    token_contract: string,
    contract: string
  ) => {
    var MyContract = new ethers.Contract(token_contract, Abi, library);
    return await MyContract.balanceOf(contract).then(callback);
  };

  const event_callback = async (
    Abi: [],
    ContractAddress: string,
    eventName: string
  ) => {
    var MyContract = new ethers.Contract(ContractAddress, Abi, library);
    return await MyContract.on(eventName, callback);
  };

  const callback = async (result, error) => {
    if (result) {
      return result;
    }

    if (error) {
      return error;
    }

    return false;
  };

  const values = {
    web3Modal,
    provider,
    address,
    connected,
    connectWallet,
    disconnectWallet,
    send_transaction,
    get_contract_data,
    get_balance,
    walletBalance,
    event_callback,
  };
  return <context.Provider value={values}>{children}</context.Provider>;
};
