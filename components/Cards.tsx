import { Accordion, AccordionSummary, Typography, AccordionDetails, TextField, Button } from '@mui/material'
import styles from '../styles/Home.module.css';
import React from 'react'

function Cards(props) {
    return (
        <>
        <Accordion className={styles.card}>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
      
            <TextField
              variant="outlined" 
              label="Deposit"
              id="Deposit"
              size="small"
              value={props.deposit}
              onChange={props.handleChange}
              error={props.depositError}
              helperText={props.depositErrorMessage}
            />
            <Button variant="contained" style={{ marginTop: 18,marginBottom: 15,width:"100%" }}>
              Deposit your MATIC
            </Button>
            <TextField
              variant="outlined" 
              label="Withdraw"
              id="Withdraw"
              size="small"
              value={props.withdraw}
              onChange={props.WithdrawHandleChange}
              error={props.WithdrawError}
              helperText={props.WithdrawErrorMessage}
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
