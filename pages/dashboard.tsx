import React,{ useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from '../components/CopyRight'
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { theme } from '../styles/Theme';
import styles from '../styles/Home.module.css';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import TextField from '@mui/material/TextField';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useWeb3 } from '../hooks/Web3Contaxt';
import { useRouter } from 'next/router';
//import { mainListItems, secondaryListItems } from './listItems';


const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);



const Dashboard =()=>{
  const [open, setOpen] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const [deposit,setDeposit] = useState("");
  const [withdraw,setWithdraw] = useState("");
  const {address,connected,disconnectWallet}=useWeb3();
  const router = useRouter();

  useEffect(() => {
    if(connected==false){
      router.push("/");
     
    }
  }, [!connected])

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleChange = (e) => {
    e.preventDefault()
    setDeposit(e.target.value);
  }

  const WithdrawHandleChange =(e)=>{
    e.preventDefault()
    setWithdraw(e.target.value);
  }

  

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Happy Fountain Farming
            </Typography>
            <IconButton color="inherit">
              <Button variant="contained" style={{width: "9rem"}} color="primary" endIcon={<PowerSettingsNewIcon/>}
              onClick={() => disconnectWallet()}>
                <div >
                <Typography textOverflow="ellipsis" noWrap style={{width: "6rem"}} >{address} </Typography>
                </div>
              </Button>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                ></Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                ></Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Accordion className={styles.card}>
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>USDC/MATIC</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                  
                        <TextField
                          variant="outlined" 
                          label="Deposit"
                          id="Deposit"
                          size="small"
                          value={deposit}
                          onChange={handleChange}
                          error={error}
                          helperText={errorMessage}
                        />
                        <Button type="submit" variant="contained" style={{ marginTop: 18,marginBottom: 15 }}>
                          Deposit your MATIC
                        </Button>
                        <TextField
                          variant="outlined" 
                          label="Withdraw"
                          id="Withdraw"
                          size="small"
                          value={withdraw}
                          onChange={WithdrawHandleChange}
                          error={error}
                          helperText={errorMessage}
                        />
                        <Button type="submit" variant="contained" style={{ marginTop: 15 }}>
                          Withdraw your MATIC and Rewards
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
                        You will receive Goli token as a receipt for your
                        deposited BOOK-MATIC LP assets.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard