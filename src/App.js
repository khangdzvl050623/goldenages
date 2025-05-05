import "./App.css";
import "./styles/images.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import GoldPriceTable from "./GoldPriceTable";
import ExchangeRateTable from "./ExchangeRateTable";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { News } from "./components/News";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ErrorBoundary } from 'react-error-boundary';
import StockExchangeRate from './components/StockExchangeRate';

function ErrorFallback({ error }) {
  return (
    <div>
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    setLandingPageData(JsonData);
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({ email: payload.sub, role: payload.role });
    }
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={
            <>
              <Header data={landingPageData.Header} />
              <News />
              <Contact data={landingPageData.Contact} />
            </>
          } />
          <Route path="/exchangerate" element={
            <div className="container" style={{ marginTop: '100px' }}>
              <h2 className="text-center mb-4">Tỷ Giá Ngoại Tệ</h2>
              <ExchangeRateTable />
            </div>
          } />
          <Route path="/goldprice" element={
            <div className="container" style={{ marginTop: '100px' }}>
              <h2 className="text-center mb-4">Giá Vàng</h2>
              <GoldPriceTable />
            </div>
          } />
          <Route
            path="/StockExchangeRate"
            element={
              <div className="container" style={{ marginTop: '100px' }}>
                <h2 className="text-center mb-4">Tỷ Giá Ngoại Tệ</h2>
                <StockExchangeRate />
              </div>
            }
          />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage setUser={setUser} />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}
