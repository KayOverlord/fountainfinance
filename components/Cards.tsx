import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { contracts_address, LP_Tokens } from "../util/tokens&address";

import Fountain from "../util/Abi/Fountain.json";
import Angel from "../util/Abi/Angel.json";
import { useWeb3 } from "../hooks/Web3Contaxt";
import { ethers } from "ethers";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { usePullWeb3 } from "../hooks/PullDataContaxt";

function Cards(props) {
  const [depositError, setError] = useState(false);
  const [depositErrorMessage, setErrorMessage] = useState("");
  const [deposit, setDeposit] = useState("");
  const [withdraw, setWithdraw] = useState("");
  const [WithdrawError, setWithdrawError] = useState(false);
  const [WithdrawErrorMessage, setWithdrawErrorMessage] = useState("");
  const { send_transaction, setCallBackResults } = useWeb3();
  const [open, setOpen] = useState(false);
  const [isStaking, setIsStaking] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [balanceError, setBalanceError] = useState("white");
  const [BackdropOpen, setBackdropOpen] = useState(false);
  const [BackdropStatus, setBackdropStatus] = useState({
    icon: "loading",
    message: "Harvesting your rewards...",
  });
  const [harvestLoading, setHarvestLoading] = useState(false);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const fountainAddress = LP_Tokens[props.id].Fountain_address;
  const TokenAddress = LP_Tokens[props.id].address;
  const TokenAbi = LP_Tokens[props.id].Abi;

  const { get_user_investments, stakes, setStakes } = usePullWeb3();

  const handleBackdropOpenClose = () => {
    setBackdropOpen(false);
  };
  const handleBackdropOpenToggle = () => {
    setBackdropOpen(!BackdropOpen);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setDeposit(e.target.value);
  };
  const send_deposit = () => {
    // if(walletBalance>1){
    // }else{
    //   setBalanceError("red")
    // }
    setBalanceError("white");
    if (deposit.trim() !== null && parseFloat(deposit.trim()) > 0) {
      setIsStaking(true);
      start_sending_deposit();
    }
  };

  const start_sending_deposit = () => {
    send_transaction(TokenAbi, TokenAddress, "approve", [
      fountainAddress,
      ethers.utils.parseEther(deposit),
    ])
      .then((results) => {
        props.openStepper(true);
        props.stepNum(1);

        results.wait().then((res) => {
          depositToken();
        });
      })
      .catch((error) => {
        props.openStepper(false);
        if (error.code == 4001) {
          setIsStaking(false);
          setDeposit("");
          setErrorMsg(
            "You have to approve this transaction first in order to deposit your " +
              props.title
          );
          handleClickOpen();
        }
      });
  };
  const depositToken = () => {
    send_transaction(Fountain, fountainAddress, "deposit", [
      ethers.utils.parseEther(deposit),
    ])
      .then((results) => {
        props.stepNum(2);
        results.wait().then((res) => {
          stakingToken();
        });
      })
      .catch((error) => {
        setIsStaking(false);
        props.openStepper(false);
      });
  };

  const stakingToken = () => {
    send_transaction(Fountain, fountainAddress, "joinAngel", [
      contracts_address.Angel,
    ])
      .then((results) => {
        setIsStaking(false);
        setDeposit("");
        props.stepNum(3);
        setStakes([]);

        get_user_investments();
      })
      .catch((error) => {
        setIsStaking(false);
        props.openStepper(false);
      });
  };

  const WithdrawHandleChange = (e) => {
    e.preventDefault();
    setWithdraw(e.target.value);
  };

  const send_withdraw = () => {
    if (withdraw.trim() !== null && parseFloat(withdraw.trim()) > 0) {
      setWithdrawLoading(true);
      setBackdropOpen(true);
      setBackdropStatus({
        icon: "loading",
        message: "Withdrawing your tokens...",
      });
      send_transaction(Fountain, fountainAddress, "withdraw", [
        ethers.utils.parseEther(withdraw),
      ])
        .then((results) => {
          results.wait().then((res) => {
            setWithdrawLoading(false);
            setBackdropOpen(true);
            setBackdropStatus({
              icon: "success",
              message: "Done! your tokens have been successfully withdrawn",
            });
            setStakes([]);
            setWithdraw("");
            get_user_investments();
          });
        })
        .catch((error) => {
          setWithdrawLoading(false);
          setBackdropOpen(true);
          setBackdropStatus({
            icon: "error",
            message: "An error occurred while withdrawing!",
          });
        });
    }
  };
  const Harvest = () => {
    setHarvestLoading(true);
    setBackdropOpen(true);
    setBackdropStatus({
      icon: "loading",
      message: "Harvesting your rewards...",
    });
    send_transaction(Fountain, fountainAddress, "harvest", [
      contracts_address.Angel,
    ])
      .then((results) => {
        results.wait().then((res) => {
          setHarvestLoading(false);
          setBackdropOpen(true);
          setBackdropStatus({
            icon: "success",
            message: "Done! your rewards have been successfully harvested!",
          });
          setStakes([]);

          get_user_investments();
        });
      })
      .catch((error) => {
        setHarvestLoading(false);
        setBackdropOpen(true);
        setBackdropStatus({
          icon: "error",
          message: "An error occurred while harvesing your rewards!",
        });
      });
  };

  return (
    <>
      <Accordion className={styles.card}>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          {" "}
          <Image
            src={props.img}
            alt="Picture of the token"
            width={30}
            height={30}
          />
          <Typography>{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {isStaking == false ? (
            <>
              <TextField
                variant="outlined"
                label="Stake amount"
                id="Stake"
                size="small"
                value={deposit}
                onChange={handleChange}
                error={depositError}
                helperText={depositErrorMessage}
              />
              <Button
                variant="contained"
                onClick={send_deposit}
                style={{ marginTop: 18, marginBottom: 15, width: "100%" }}
              >
                Stake your {props.title}
              </Button>
              <TextField
                variant="outlined"
                label="Withdraw amount"
                id="Withdraw"
                size="small"
                value={withdraw}
                onChange={WithdrawHandleChange}
                error={WithdrawError}
                helperText={WithdrawErrorMessage}
              />
              {withdrawLoading == false ? (
                <Button
                  variant="contained"
                  onClick={send_withdraw}
                  style={{ marginTop: 15, width: "100%" }}
                >
                  Withdraw your {props.title}
                </Button>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    paddingTop: 4,
                  }}
                >
                  <CircularProgress color="success" />
                </div>
              )}

              {harvestLoading == false ? (
                <Button
                  variant="contained"
                  onClick={Harvest}
                  style={{ marginTop: 15, marginBottom: 15, width: "100%" }}
                >
                  Harvest your Rewards
                </Button>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    paddingTop: 4,
                  }}
                >
                  <CircularProgress color="success" />
                </div>
              )}
            </>
          ) : (
            <Stack
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
              spacing={2}
              direction="column"
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  paddingTop: 4,
                }}
              >
                <CircularProgress color="success" />
              </div>
              <Typography
                variant="h6"
                color="primary"
                style={{
                  textTransform: "none",
                  lineHeight: "normal",
                  textShadow:
                    "1px 1px 2px blue, 0 0 1em #14506e, 0 0 0.1em #14506e",
                  marginTop: 8,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
                display="block"
              >
                Staking in progress
              </Typography>
            </Stack>
          )}

          <Typography
            variant="overline"
            style={{
              textTransform: "none",
              lineHeight: "normal",
              color: "gray",
              marginTop: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            display="block"
          >
            You will receive Goli tokens as a reward for your deposited{" "}
            {props.title} tokens.
          </Typography>
          <Typography
            variant="overline"
            style={{
              textTransform: "none",
              lineHeight: "normal",
              color: `${balanceError}`,
              marginTop: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            display="block"
          >
            You need a minimum of 1.1 Matic to complete the staking process
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth={"md"}
      >
        <DialogTitle id="alert-dialog-title">
          {"Hey Fountain Farmer"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: "flex",
          flexDirection: "column",
        }}
        open={BackdropOpen}
        onClick={handleBackdropOpenClose}
      >
        {BackdropStatus.icon == "loading" ? (
          <CircularProgress color="inherit" size={80} />
        ) : null}
        {BackdropStatus.icon == "success" ? (
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 83 }} />
        ) : null}
        {BackdropStatus.icon == "error" ? (
          <ErrorOutlineIcon color="warning" sx={{ fontSize: 83 }} />
        ) : null}
        <Typography textAlign={"center"} variant="h3">
          {BackdropStatus.message}
        </Typography>
      </Backdrop>
    </>
  );
}

export default Cards;
