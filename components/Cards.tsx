import { Accordion, AccordionSummary, Typography, AccordionDetails, TextField, Button } from '@mui/material'
import styles from '../styles/Home.module.css';
import React, { useState } from 'react';
import Image from 'next/image';
import { contracts_address,LP_Tokens } from '../util/tokens&address';
import Fountain from '../util/Abi/Fountain.json';
import { useWeb3 } from '../hooks/Web3Contaxt';

function Cards(props) {
  const [depositError, setError] = useState(false);
  const [depositErrorMessage, setErrorMessage] = useState("");
  const [deposit,setDeposit] = useState("");
  const [withdraw,setWithdraw] = useState("");
  const [WithdrawError,setWithdrawError]= useState(false);
  const [WithdrawErrorMessage,setWithdrawErrorMessage]=useState("");
  const {get_contract_data,address}=useWeb3();

  const handleChange = (e) => {
    e.preventDefault()
    setDeposit(e.target.value);
  }
  const send_deposit = () => {
 
    //setDeposit(e.target.value);
    if(deposit.trim()!==null && parseFloat(deposit.trim())>0){
      console.log("address",address);
      get_contract_data(Fountain,LP_Tokens[0].Fountain_address,"approve",[LP_Tokens[0].Fountain_address,"100000000000000000000"])
  }
  }

  const WithdrawHandleChange =(e)=>{
    e.preventDefault()
    setWithdraw(e.target.value);
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
            <Button  variant="contained" style={{ marginTop: 15,width:"100%"  }}>
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
      </>
    )
}

export default Cards
