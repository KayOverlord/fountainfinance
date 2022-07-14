import '../styles/globals.css'
import { ThemeProvider} from '@mui/material/styles';
import {theme}from'../styles/Theme';
import {Web3Provider} from '../hooks/Web3Contaxt'

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
    <ThemeProvider theme={theme}>
  <Component {...pageProps} />
  </ThemeProvider>
  </Web3Provider>
  )
}

export default MyApp
