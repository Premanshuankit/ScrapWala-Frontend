import { StrictMode, React } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { store } from "./app/store";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store= {store}>
        <CssBaseline />
        <App />
      </Provider>
      </ThemeProvider>
  </StrictMode>,
)