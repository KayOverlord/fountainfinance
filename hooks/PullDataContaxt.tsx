import { createContext, useContext, useEffect, useState } from "react";
import Angel from "../util/Abi/Angel.json";
import { ethers } from "ethers";
import { contracts_address, LP_Tokens } from "../util/tokens&address";
import { useWeb3 } from "./Web3Contaxt";

const context = createContext<null | any>("");

export const usePullWeb3 = () => {
  return useContext(context);
};

export const PullWeb3Provider = ({ children }) => {
  const { address, get_contract_data } = useWeb3();
  const [stakes, setStakes] = useState([]);
  const [rewards, setRewards] = useState([]);

  const get_user_investments = () => {
    setStakes([]);
    LP_Tokens.forEach((element) => {
      get_contract_data(Angel, contracts_address.Angel, "userInfo", [
        element.position,
        address,
      ]).then((data) => {
        let amount = ethers.utils.formatEther(data.amount);
        setStakes((values) => [
          ...values,
          {
            amount: amount,
            image: element.image,
            title: element.title,
          },
        ]);
      });
    });
  };

  const get_user_rewards = async () => {
    setRewards([]);
    await LP_Tokens.forEach((element) => {
      get_contract_data(Angel, contracts_address.Angel, "pendingGrace", [
        element.position,
        address,
      ]).then((data) => {
        let amount = ethers.utils.formatEther(data);
        setRewards((values) => [
          ...values,
          {
            amount: amount,
            image: element.image,
            title: element.title,
          },
        ]);
      });
    });
  };

  const values = {
    stakes,
    setStakes,
    get_user_investments,
    get_user_rewards,
    rewards,
    setRewards,
  };
  return <context.Provider value={values}>{children}</context.Provider>;
};
