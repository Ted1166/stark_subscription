import logo from './logo.svg';
import './App.css';
import { connect, disconnect } from 'starknetkit'
import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from "./components/Home"

function App() {

const [connection_, setConnection] = useState('');
const [account, setAccount] = useState('');
const [address, setAddress] = useState('');

const connectWallet = async() => {
  const connection = await connect({ 
    modalMode: "neverAsk", webWalletUrl: "https://web.argent.xyz" 
  });
  
   if(connection && connection.isConnected){
      setConnection(connection);
      setAccount(connection.account);
      setAddress(connection.selectedAddress);
   }
  }

  const disconnectWallet = async() => {
    await disconnect({clearLastWallet: true});
    setConnection(undefined);
    setAccount(undefined);
    setAddress('');
  }

  useEffect(() => {
    const connectToStarknet = async () => {
        const connection = await connect({ 
        modalMode: "neverAsk", webWalletUrl: "https://web.argent.xyz" 
     }); 
  
    if(connection && connection.isConnected){
      setConnection(connection);
      setAccount(connection.account);
      setAddress(connection.selectedAddress);
    }
   };
   connectToStarknet();
  
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div className='branding'>
          <p>ADEV</p>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <div className='button-container'>
        <button>Home</button>
        <button>Subscribe channel</button>
        <button>History</button>
        <button onClick = {connectWallet}>Connect Wallet</button>
        </div>
      </header>
    </div>

  );
}

export default App;
