import { Accordion, AccordionSummary, Typography, AccordionDetails, TextField, Button } from '@mui/material'
import styles from '../styles/Home.module.css';
import React, { useState } from 'react';
import Image from 'next/image';
import { contracts_address,LP_Tokens } from '../util/tokens&address';
import Fountain from '../util/Abi/Fountain.json';
import { useWeb3 } from '../hooks/Web3Contaxt';
import {ethers} from "ethers";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Cards(props) {
  const [depositError, setError] = useState(false);
  const [depositErrorMessage, setErrorMessage] = useState("");
  const [deposit,setDeposit] = useState("");
  const [withdraw,setWithdraw] = useState("");
  const [WithdrawError,setWithdrawError]= useState(false);
  const [WithdrawErrorMessage,setWithdrawErrorMessage]=useState("");
  const {get_contract_data,send_transaction,address}=useWeb3();
  const [open, setOpen] = React.useState(false);

  const fountainAddress =LP_Tokens[props.id].Fountain_address;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    e.preventDefault()
    setDeposit(e.target.value);
  }
  const send_deposit = () => {
    if(deposit.trim()!==null && parseFloat(deposit.trim())>0){
      try {
        send_transaction(
          Fountain,fountainAddress,
          "approve",
          [fountainAddress,
          ethers.utils.parseEther(deposit)]
          ).then((results)=>{
            send_transaction(
              Fountain,fountainAddress,
              "joinAngel",
              [contracts_address.Angel]).then((results)=>{
                //
                console.log("results",results);
              })

          }).catch(error=>{
            if(error.code==4001){
              setDeposit("")
              handleClickOpen()
            }
          })
      } catch (error) {
       //
       console.error(error)
      }
      }
  }

  const WithdrawHandleChange =(e)=>{
    e.preventDefault()
    setWithdraw(e.target.value);
  } 

  const send_withdraw = ()=>{
    get_contract_data(Fountain,fountainAddress,"allowance",[address,fountainAddress]).then(data=>{
      console.log("receipt",data)
    })
  }
    return (
        <>
        <Accordion className={styles.card}>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >  <Image
        src={props.img}
        alt="Picture of the token"
        width={30}
        height={25}
      />
          <Typography>{props.title}</Typography>
        
        </AccordionSummary>
        <AccordionDetails>
      
            <TextField
              variant="outlined" 
              label="Deposit"
              id="Deposit"
              size="small"
              value={deposit}
              onChange={handleChange}
              error={depositError}
              helperText={depositErrorMessage}
            />
            <Button variant="contained" onClick={send_deposit} style={{ marginTop: 18,marginBottom: 15,width:"100%" }}>
              Deposit your MATIC
            </Button>
            <TextField
              variant="outlined" 
              label="Withdraw"
              id="Withdraw"
              size="small"
              value={withdraw}
              onChange={WithdrawHandleChange}
              error={WithdrawError}
              helperText={WithdrawErrorMessage}
            />
            <Button  variant="contained" onClick={send_withdraw} style={{ marginTop: 15,width:"100%"  }}>
              Withdraw your MATIC
            </Button>
            {/* <TextField
              variant="outlined" 
              label="Withdraw"
              id="Withdraw"
              size="small"
              value={props.withdraw}
              onChange={props.WithdrawHandleChange}
              error={props.WithdrawError}
              helperText={props.WithdrawErrorMessage}
            /> */}
            <Button  variant="contained" style={{ marginTop: 15,marginBottom: 15,width:"100%" }}>
              Withdraw your Rewards
            </Button>
          
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
            You will receive Goli tokens as a reward for your
            deposited {props.title} tokens.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Hey Fountain Farmer"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          You have to approve this transaction first in order to deposit your {props.title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      </>
    )
}

export default Cards
