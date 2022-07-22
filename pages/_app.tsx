import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../styles/Theme";
import { Web3Provider } from "../hooks/Web3Contaxt";
import { PullWeb3Provider } from "../hooks/PullDataContaxt";

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <PullWeb3Provider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </PullWeb3Provider>
    </Web3Provider>
  );
}

export default MyApp;
