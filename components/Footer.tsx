import React from 'react';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { theme } from '../styles/Theme';
import FuruLogo from '../icons/furuC.png';
import ChainLogo from '../icons/chainS.png';
import PackLogo from '../icons/packshi.png';
import Box from '@mui/material/Box';

function Footer() {
  return (
    <Box display={{ xs: "none", sm: "block" }}> 
        <Grid container style={{ 
        backgroundColor:theme.palette.background.paper,
        position: "fixed",
        right:0,
        left: 0,
        bottom: 0,
        width: "100%",
        color: "white",
        height:"15vh",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        }}>
          <Grid item>
       <Typography fontSize={20} pr={1}>Trevi System design by:</Typography>
       </Grid>
        <Grid item xs={12} md={2}>
       <Image src={FuruLogo} alt="SVG logo image" width={200} height={30} />
       </Grid>
       <Grid item xs={false}>
       <Typography fontSize={20} pr={1} >Audited by:</Typography>
       </Grid>
        <Grid item xs={false} md={2}>
       <Image src={ChainLogo} alt="SVG logo image" width={200} height={50} />
       </Grid>
       <Grid item xs={false} md={2}>
       <Image src={PackLogo} alt="SVG logo image" width={200} height={50} />
       </Grid>
       <Grid item xs={false} md={2}>
       <Typography fontSize={30} fontWeight={'bold'}>HashCloak</Typography>
       </Grid>

      </Grid>
      </Box>
  )
}

export default Footer