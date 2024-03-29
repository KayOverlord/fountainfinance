import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import { useWeb3 } from "../hooks/Web3Contaxt";
import Logo from "../icons/image.svg";
import MetaIcon from "../icons/metamask-fox.png";
import Typewriter from "typewriter-effect";
import CanvasBackground from "../components/CanvasBackground";
import Footer from "../components/Footer";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const Home = ({ timeout = 50 }) => {
  const { connectWallet, connected } = useWeb3();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const startConnecting = () => {
    setLoading(true);
    connectWallet(
      (handleSuccess) => {
        //log success
        router.push("/dashboard");
      },
      (handleErrors) => {
        setLoading(false);
      }
    );
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: "transparent",
      }}
    >
      <Head>
        <title>Fountain Finance</title>
        <meta
          name="description"
          content="Fountain Finance is a Decentralized, Yield Optimizer that allows its users to earn Goli tokens on their crypto holdings"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <CanvasBackground />
        <Grid
          container
          pt={15}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
          }}
        >
          <Image src={Logo} alt="SVG logo image" width={460} height={250} />
          <div className={styles.title}>
            <Typewriter
              options={{
                strings: [
                  "Hey you...",
                  "Welcome to Fountain Finance",
                  "A Goli farming platform",
                  "Connect your MetaMask to start",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </Grid>

        <Grid
          container
          pt={10}
          spacing={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item>
            {loading == false ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  startConnecting();
                }}
                endIcon={
                  <Image
                    src={MetaIcon}
                    alt="SVG logo image"
                    width={30}
                    height={30}
                  />
                }
              >
                CONNECT MetaMask
              </Button>
            ) : (
              <CircularProgress color="info" />
            )}
          </Grid>
          <Footer />
        </Grid>
      </main>
    </div>
  );
};
export default Home;
