import React from "react";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { theme } from "../styles/Theme";
import FuruLogo from "../icons/furuC.png";
import ChainLogo from "../icons/chainS.png";
import PackLogo from "../icons/packshi.png";
import GoliLogo from "../icons/logo.svg";
import Box from "@mui/material/Box";

function Footer() {
  return (
    <Box display={{ xs: "none", sm: "block" }}>
      <Grid
        container
        style={{
          backgroundColor: theme.palette.background.paper,
          position: "fixed",
          right: 0,
          left: 0,
          bottom: 0,
          width: "100%",
          color: "white",
          minHeight: "15vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item lg={3} md={3} xs={12}>
          <Typography
            fontSize={20}
            pr={1}
            color="primary"
            style={{
              textShadow:
                "1px 1px 2px blue, 0 0 1em #14506e, 0 0 0.1em #14506e",
            }}
          >
            Developed by:
          </Typography>
          <Grid
            item
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Image src={GoliLogo} alt="SVG logo image" width={50} height={43} />
            <Typography fontSize={30} fontWeight={"light"}>
              Goli
            </Typography>
          </Grid>
        </Grid>

        <Grid item lg={3} md={3} xs={12}>
          <Typography
            fontSize={20}
            pr={1}
            color="primary"
            style={{
              textShadow:
                "1px 1px 2px blue, 0 0 1em #14506e, 0 0 0.1em #14506e",
            }}
          >
            Trevi System design by:
          </Typography>
          <Image src={FuruLogo} alt="SVG logo image" width={200} height={25} />
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <Typography
            fontSize={20}
            pr={1}
            color="primary"
            style={{
              textShadow:
                "1px 1px 2px blue, 0 0 1em #14506e, 0 0 0.1em #14506e",
            }}
          >
            System Audited by:
          </Typography>
          <Grid
            item
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div>
              <Image
                src={ChainLogo}
                alt="SVG logo image"
                width={195}
                height={50}
              />
            </div>
            <div style={{ paddingLeft: 20 }}>
              <Image
                src={PackLogo}
                alt="SVG logo image"
                width={200}
                height={50}
              />
            </div>
            <Typography fontSize={30} fontWeight={"bold"} pl={3}>
              HashCloak
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
