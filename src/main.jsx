import { StrictMode, React } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { store, persistor } from "./app/store";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme";
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store= {store}>
        <PersistGate loading={null} persistor={persistor}>
          <CssBaseline />
          <App />
        </PersistGate>
      </Provider>
      </ThemeProvider>
  </StrictMode>,
)