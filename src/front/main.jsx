import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import { AppRoutes } from './routes'; 
import { StoreProvider } from './hooks/useGlobalReducer'; 
import { BackendURL } from "./components/BackendURL";
import { BrowserRouter } from "react-router-dom";

const Main = () => {

  if (typeof import.meta.env.VITE_BACKEND_URL === "undefined") {
    return (
      <React.StrictMode>
        <BackendURL />
      </React.StrictMode>
    );
  }

  return (
    <React.StrictMode>
      <BrowserRouter>
        <StoreProvider>
          <AppRoutes />
        </StoreProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Error.</h1>;
    }

    return this.props.children; 
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <Main />
  </ErrorBoundary>
);