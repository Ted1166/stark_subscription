import logo from "./logo.svg";
import "./App.css";
import { connect, disconnect } from "starknetkit";
import { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Contract, Provider, constants } from "starknet";
import Home from "./pages/Home";
import Subscription_channel from "./pages/Subscription_channel";

import contractAbi from "./abi/abi.json";
import { Not_found } from "./pages/Not_found";
import History from "./pages/History";
const contractAddress = "0x01ed24df20fe397ad8154462d1ab959b1c4760e2368a528e3d11e80f49a25ef7";

function App() {
  const [connection_, setConnection] = useState("");
  const [account, setAccount] = useState("");
  const [address, setAddress] = useState("");

  const connectWallet = async () => {
    console.log("doing esdt") 
    const connection = await connect({
      webWalletUrl: "https://web.argent.xyz",
    });

    if (connection && connection.isConnected) {
      setConnection(connection);
      setAccount(connection.account);
      setAddress(connection.selectedAddress);
    }
  };

  const disconnectWallet = async () => {
    await disconnect({ clearLastWallet: true });
    setConnection(undefined);
    setAccount(undefined);
    setAddress("");
  };

  useEffect(() => {
    const connectToStarknet = async () => {
      const connection = await connect({
        modalMode: "neverAsk",
        webWalletUrl: "https://web.argent.xyz",
      });

      if (connection && connection.isConnected) {
        setConnection(connection);
        setAccount(connection.account);
        setAddress(connection.selectedAddress);
      }
    };
    connectToStarknet();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
      <header className="App-header">
        <div className="branding">
          <p>ADEV</p>
        </div>
        <div className="button-container">
          <Link to='/'>Home</Link>
          <Link to='/subscription_channel'>Subscription Channel</Link>
          <Link to='/history'>History</Link>
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>
      </header>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/subscription_channel" element={<Subscription_channel />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<Not_found />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
