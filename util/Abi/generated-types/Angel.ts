import BN from 'bn.js';
import BigNumber from 'bignumber.js';
import {
  PromiEvent,
  TransactionReceipt,
  EventResponse,
  EventData,
  Web3ContractContext,
} from 'ethereum-abi-types-generator';

export interface CallOptions {
  from?: string;
  gasPrice?: string;
  gas?: number;
}

export interface SendOptions {
  from: string;
  value?: number | string | BN | BigNumber;
  gasPrice?: string;
  gas?: number;
}

export interface EstimateGasOptions {
  from?: string;
  value?: number | string | BN | BigNumber;
  gas?: number;
}

export interface MethodPayableReturnContext {
  send(options: SendOptions): PromiEvent<TransactionReceipt>;
  send(
    options: SendOptions,
    callback: (error: Error, result: any) => void
  ): PromiEvent<TransactionReceipt>;
  estimateGas(options: EstimateGasOptions): Promise<number>;
  estimateGas(
    options: EstimateGasOptions,
    callback: (error: Error, result: any) => void
  ): Promise<number>;
  encodeABI(): string;
}

export interface MethodConstantReturnContext<TCallReturn> {
  call(): Promise<TCallReturn>;
  call(options: CallOptions): Promise<TCallReturn>;
  call(
    options: CallOptions,
    callback: (error: Error, result: TCallReturn) => void
  ): Promise<TCallReturn>;
  encodeABI(): string;
}

export interface MethodReturnContext extends MethodPayableReturnContext {}

export type ContractContext = Web3ContractContext<
  Angel,
  AngelMethodNames,
  AngelEventsContext,
  AngelEvents
>;
export type AngelEvents =
  | 'Deposit'
  | 'EmergencyWithdraw'
  | 'Harvest'
  | 'LogGracePerSecondAndEndTime'
  | 'LogPoolAddition'
  | 'LogSetPool'
  | 'LogUpdatePool'
  | 'OwnershipTransferred'
  | 'RewarderExecFail'
  | 'Withdraw';
export interface AngelEventsContext {
  Deposit(
    parameters: {
      filter?: {
        user?: string | string[];
        pid?: string | string[];
        to?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  EmergencyWithdraw(
    parameters: {
      filter?: {
        user?: string | string[];
        pid?: string | string[];
        to?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  Harvest(
    parameters: {
      filter?: { user?: string | string[]; pid?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  LogGracePerSecondAndEndTime(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  LogPoolAddition(
    parameters: {
      filter?: {
        pid?: string | string[];
        lpToken?: string | string[];
        rewarder?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  LogSetPool(
    parameters: {
      filter?: { pid?: string | string[]; rewarder?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  LogUpdatePool(
    parameters: {
      filter?: { pid?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  OwnershipTransferred(
    parameters: {
      filter?: {
        previousOwner?: string | string[];
        newOwner?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  RewarderExecFail(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  Withdraw(
    parameters: {
      filter?: {
        user?: string | string[];
        pid?: string | string[];
        to?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
}
export type AngelMethodNames =
  | 'add'
  | 'addGraceReward'
  | 'batch'
  | 'claimOwnership'
  | 'deposit'
  | 'emergencyWithdraw'
  | 'flashLoan'
  | 'harvest'
  | 'massUpdatePools'
  | 'new'
  | 'massUpdatePoolsAndSet'
  | 'massUpdatePoolsNonZero'
  | 'permitToken'
  | 'rescueERC20'
  | 'set'
  | 'setFlashLoanFee'
  | 'setGracePerSecond'
  | 'transferOwnership'
  | 'updatePool'
  | 'withdraw'
  | 'archangel'
  | 'endTime'
  | 'factory'
  | 'FEE_BASE'
  | 'FEE_BASE_OFFSET'
  | 'flashFee'
  | 'flashLoanFee'
  | 'flashLoanFeeCollector'
  | 'GRACE'
  | 'gracePerSecond'
  | 'lastTimeRewardApplicable'
  | 'lendingToken'
  | 'lpToken'
  | 'maxFlashLoan'
  | 'owner'
  | 'pendingGrace'
  | 'pendingOwner'
  | 'poolInfo'
  | 'poolLength'
  | 'rewarder'
  | 'totalAllocPoint'
  | 'userInfo';
export interface DepositEventEmittedResponse {
  user: string;
  pid: string;
  amount: string;
  to: string;
}
export interface EmergencyWithdrawEventEmittedResponse {
  user: string;
  pid: string;
  amount: string;
  to: string;
}
export interface HarvestEventEmittedResponse {
  user: string;
  pid: string;
  amount: string;
}
export interface LogGracePerSecondAndEndTimeEventEmittedResponse {
  gracePerSecond: string;
  endTime: string;
}
export interface LogPoolAdditionEventEmittedResponse {
  pid: string;
  allocPoint: string;
  lpToken: string;
  rewarder: string;
}
export interface LogSetPoolEventEmittedResponse {
  pid: string;
  allocPoint: string;
  rewarder: string;
  overwrite: boolean;
}
export interface LogUpdatePoolEventEmittedResponse {
  pid: string;
  lastRewardTime: string;
  lpSupply: string;
  accGracePerShare: string;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface RewarderExecFailEventEmittedResponse {
  rewarder: string;
  pid: string;
  user: string;
}
export interface PoolResponse {
  accGracePerShare: string;
  lastRewardTime: string;
  allocPoint: string;
}
export interface WithdrawEventEmittedResponse {
  user: string;
  pid: string;
  amount: string;
  to: string;
}
export interface PoolInfoResponse {
  accGracePerShare: string;
  lastRewardTime: string;
  allocPoint: string;
}
export interface UserInfoResponse {
  amount: string;
  rewardDebt: string;
}
export interface Angel {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param allocPoint Type: uint256, Indexed: false
   * @param _lpToken Type: address, Indexed: false
   * @param _rewarder Type: address, Indexed: false
   */
  add(
    allocPoint: string,
    _lpToken: string,
    _rewarder: string
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _amount Type: uint256, Indexed: false
   * @param _endTime Type: uint256, Indexed: false
   */
  addGraceReward(_amount: string, _endTime: string): MethodReturnContext;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param calls Type: bytes[], Indexed: false
   * @param revertOnFail Type: bool, Indexed: false
   */
  batch(
    calls: string | number[][],
    revertOnFail: boolean
  ): MethodPayableReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  claimOwnership(): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param pid Type: uint256, Indexed: false
   * @param amount Type: uint256, Indexed: false
   * @param to Type: address, Indexed: false
   */
  deposit(pid: string, amount: string, to: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param pid Type: uint256, Indexed: false
   * @param to Type: address, Indexed: false
   */
  emergencyWithdraw(pid: string, to: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param receiver Type: address, Indexed: false
   * @param token Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   * @param data Type: bytes, Indexed: false
   */
  flashLoan(
    receiver: string,
    token: string,
    amount: string,
    data: string | number[]
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param pid Type: uint256, Indexed: false
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   */
  harvest(pid: string, from: string, to: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param pids Type: uint256[], Indexed: false
   */
  massUpdatePools(pids: string[]): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param token Type: address, Indexed: false
   * @param flashLoanFee Type: uint256, Indexed: false
   */
  'new'(token: string, flashLoanFee: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param pids Type: uint256[], Indexed: false
   */
  massUpdatePoolsAndSet(pids: string[]): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  massUpdatePoolsNonZero(): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   * @param v Type: uint8, Indexed: false
   * @param r Type: bytes32, Indexed: false
   * @param s Type: bytes32, Indexed: false
   */
  permitToken(
    token: string,
    from: string,
    to: string,
    amount: string,
    deadline: string,
    v: string | number,
    r: string | number[],
    s: string | number[]
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   * @param to Type: address, Indexed: false
   */
  rescueERC20(token: string, amount: string, to: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _pid Type: uint256, Indexed: false
   * @param _allocPoint Type: uint256, Indexed: false
   * @param _rewarder Type: address, Indexed: false
   * @param overwrite Type: bool, Indexed: false
   */
  set(
    _pid: string,
    _allocPoint: string,
    _rewarder: string,
    overwrite: boolean
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param fee Type: uint256, Indexed: false
   */
  setFlashLoanFee(fee: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _gracePerSecond Type: uint256, Indexed: false
   * @param _endTime Type: uint256, Indexed: false
   */
  setGracePerSecond(
    _gracePerSecond: string,
    _endTime: string
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newOwner Type: address, Indexed: false
   * @param direct Type: bool, Indexed: false
   * @param renounce Type: bool, Indexed: false
   */
  transferOwnership(
    newOwner: string,
    direct: boolean,
    renounce: boolean
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param pid Type: uint256, Indexed: false
   */
  updatePool(pid: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param pid Type: uint256, Indexed: false
   * @param amount Type: uint256, Indexed: false
   * @param to Type: address, Indexed: false
   */
  withdraw(pid: string, amount: string, to: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  archangel(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  endTime(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  factory(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  FEE_BASE(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  FEE_BASE_OFFSET(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param token Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  flashFee(token: string, amount: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  flashLoanFee(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  flashLoanFeeCollector(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  GRACE(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  gracePerSecond(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  lastTimeRewardApplicable(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  lendingToken(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  lpToken(parameter0: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param token Type: address, Indexed: false
   */
  maxFlashLoan(token: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _pid Type: uint256, Indexed: false
   * @param _user Type: address, Indexed: false
   */
  pendingGrace(
    _pid: string,
    _user: string
  ): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  pendingOwner(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  poolInfo(parameter0: string): MethodConstantReturnContext<PoolInfoResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  poolLength(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  rewarder(parameter0: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  totalAllocPoint(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   */
  userInfo(
    parameter0: string,
    parameter1: string
  ): MethodConstantReturnContext<UserInfoResponse>;
}
