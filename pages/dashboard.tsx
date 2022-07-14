import React,{ useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from '../styles/Theme';
import Button from '@mui/material/Button';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useWeb3 } from '../hooks/Web3Contaxt';
import { useRouter } from 'next/router';
import Cards from '../components/Cards';
import { LP_Tokens,contracts_address } from '../util/tokens&address';
import Fountain from '../util/Abi/Fountain.json'
import Angel from '../util/Abi/Angel.json';
import styles from '../styles/Home.module.css';
import {ethers} from "ethers";
import ReactSvgPieChart from "react-svg-piechart";
import Image from 'next/image';
import Logo from '../icons/image.svg';
import Modal from '@mui/material/Modal';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CanvasBackground from '../components/CanvasBackground';
import Footer from '../components/Footer';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import CircularProgress from '@mui/material/CircularProgress';

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



const Dashboard =()=>{
  const [open, setOpen] = useState(true);
  const [openModal,setOpenModal]= useState(false);
  const [stepNumber,setStepNumber]= useState(1);
  const {address,connected,disconnectWallet,get_contract_data, get_balance}=useWeb3();
  const router = useRouter();

  const [gracePerSecond,setGracePerSecond] =useState("0");
  const [balance,setBalance] = useState("");
  const [endTime,setEndTime] = useState("");
  const [userInfo,setUserInfo] = useState({amount:0,rewards:0});

  const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");
  const data = [
    {title: "Amount", value:userInfo.amount, color:theme.palette.primary.main},
    {title: "Rewards", value:userInfo.rewards, color:theme.palette.secondary.main}
  ]
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () =>{ setOpen(false)}
  
  useEffect(() => {
    if(connected==false){
      router.push("/");
    }
  }, [!connected]);

  useEffect(() => {
    get_contract_data(Angel,contracts_address.Angel,"gracePerSecond")
    .then(data=>{
      setGracePerSecond(ethers.utils.formatEther(data))
    }
      );
      
      get_contract_data(Angel,contracts_address.Angel,"userInfo",["0",address])
    .then(data=>{
      let amount = parseInt(data.amount);
      let rewards = parseInt(data.rewardDebt);
    
      setUserInfo({amount,rewards})
    }
      );

      get_balance(Fountain,contracts_address.RewardToken,contracts_address.Angel).then(data=>{
        setBalance(addCommas(ethers.utils.formatEther(data)))
      });

      get_contract_data(Angel,contracts_address.Angel,"endTime")
    .then(data=>{
      let date = new Date(data* 1000).toLocaleString();
      setEndTime(date)
    }
      );
     
        
     
  }, [])
  

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const steps = [
    'Approve the transaction',
    'Deposit your tokens',
    'Stake your tokens for rewards',
  ];


  function ontoStepIcon(props:any) {
    const { active, completed, className } = props;
  
    return (
      <>
        {completed ? (
          <CheckCircleTwoToneIcon/>
        ) : (
          <CircularProgress color="success" size={30} />
        )}
      </>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <CanvasBackground />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute">
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
            <Button
              variant="contained"
              style={{ width: "9rem" }}
              color="primary"
              endIcon={<PowerSettingsNewIcon />}
              onClick={() => disconnectWallet()}
            >
              <div>
                <Typography
                  textOverflow="ellipsis"
                  noWrap
                  style={{ width: "6rem" }}
                >
                  {address}{" "}
                </Typography>
              </div>
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: "transparent",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Grid container spacing={0}>
            <Grid item xs={12} md={3} lg={3}>
              <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 340,
                  }}
                >
                    <Typography
            
            style={{
              textTransform: "none",
              lineHeight: "normal",
              color: "white",
              marginTop: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textDecoration: "underline",
            }}
            variant={'h4'}
            display="block"
          >
            Your Account Stats
          </Typography>
                </Paper>
              </Container>
            </Grid>

            <Grid item xs={12} md={9} lg={9}>
              <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  {/* Chart */}
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        minHeight: 240,
                      }}
                    >
                      <Grid container>
                        <Grid item xs={12} md={8}>
                          <Grid item>
                            <Typography
                              variant="h4"
                              color="inherit"
                              style={{ overflowWrap: "break-word" }}
                            >
                              Goli supply{" "}
                            </Typography>
                            <Typography
                              variant="h5"
                              color="primary"
                              style={{
                                textShadow:
                                  "1px 1px 2px blue, 0 0 1em #14506e, 0 0 0.1em #14506e",
                              }}
                            >
                              {balance}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="h4"
                              color="inherit"
                              style={{ overflowWrap: "break-word" }}
                            >
                              Distribution per second{" "}
                            </Typography>
                            <Typography
                              variant="h5"
                              color="primary"
                              style={{
                                textShadow:
                                  "1px 1px 2px blue, 0 0 1em #14506e, 0 0 0.1em #14506e",
                              }}
                            >
                              {gracePerSecond}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="h4"
                              color="inherit"
                              style={{ overflowWrap: "break-word" }}
                            >
                              End of distribution{" "}
                            </Typography>
                            <Typography
                              variant="h5"
                              color="primary"
                              style={{
                                textShadow:
                                  "1px 1px 2px blue, 0 0 1em #14506e, 0 0 0.1em #14506e",
                              }}
                            >
                              {endTime}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <ReactSvgPieChart
                            strokeWidth={0}
                            data={data}
                            startAngle={90}
                            // If you need expand on hover (or touch) effect
                            expandOnHover
                            // If you need custom behavior when sector is hovered (or touched)
                            onSectorHover={(d, i, e) => {
                              if (d) {
                                console.log("Data:", d.title);
                              }
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={4} lg={3}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 254,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image src={Logo} alt="SVG logo image" />
                      <Typography
                        fontSize={13}
                        color="inherit"
                        letterSpacing={8}
                      >
                        Fountain Finance
                      </Typography>
                    </Paper>
                  </Grid>

                  {LP_Tokens &&
                    LP_Tokens.map((val, index) => {
                      return (
                        <Grid item xs={12} md={4} lg={4} key={index}>
                          <Paper
                            sx={{
                              p: 3,
                              display: "flex",
                              flexDirection: "column",
                              width: "100%",
                            }}
                          >
                            <Cards
                              title={val.title}
                              img={val.image}
                              address={val.address}
                              fountain={val.Fountain_address}
                              id={index}
                              stepNum={setStepNumber}
                              openStepper={setOpenModal}
                            />
                          </Paper>
                        </Grid>
                      );
                    })}
                </Grid>
              </Container>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stepper activeStep={stepNumber} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ontoStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {stepNumber == 3 ? (
            <Button onClick={() => setOpenModal(false)}>
              <Typography color={"green"} fontSize="bold">
                Success
              </Typography>
            </Button>
          ) : null}
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

export default Dashboard