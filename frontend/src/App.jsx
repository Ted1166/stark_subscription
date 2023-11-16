import logo from "./logo.svg";
import "./App.css";
import { connect, disconnect } from "starknetkit";
import { useState} from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Contract, Provider, constants, provider } from "starknet";
import Home from "./pages/Home";
import Subscription_channel from "./pages/Subscription_channel";

import contractAbi from "./abi/abi.json";
import { Not_found } from "./pages/Not_found";
import History from "./pages/History";
const contractAddress = "0x01ed24df20fe397ad8154462d1ab959b1c4760e2368a528e3d11e80f49a25ef7";

function App() {
  const [count, setCount] = useState(0)
  const [sub, setSub] = useState([])

  const [connection, setConnection] = useState();
  const [account, setAccount] = useState();
  const [address, setAddress] = useState();

  const [retrievedValue, setRetrievedValue] = useState('')

  const connectWallet = async() => {
    const connection = await connect({webWalletUrl:"https://web.argent.xyz"});

    console.log(connection);

    if (connection && connection.id !=="argentwallet" && connection.isConnected){
      setConnection(connection);
      setAccount(connection.account);
      setAddress(connection.selectedAddress);

    }

    if (connection && connection.chainId !== "SN_GOERLI"){
      try{
        await window.starknet.request({
          type:"wallet_addStarknetChain",
          params:{
            chainId:"SN_GOERLI"
          }
        })

      }catch(error){
        alert("Please manually switch your wallet network to testnet");
      }

    }

  }

  const disconnectWallet = async() => {
        await disconnect()
        setConnection(undefined);
        setAccount(undefined);
        setAddress('');
  }

  const getSubscriptions = async(id) => {

    const provider = new Provider({
      sequencer: {
        network: constants.NetworkName.SN_GOERLI
      
      }
    })
 
     try{
        const contract = new Contract(contractAbi.abi,contractAddress,provider);
        let stark_sub = await contract.get_package(id)
        setSub(stark_sub)
     } catch(error){
        console.log("oops!")
     }
        
  }

  const set_sub = async() => {

    const key = 0;
    const  sub_package = '';
    const  channels = '';
    const  price = 0;

    try{
      console.log("xxxxxxxx",account);
      const contract = new Contract(contractAbi.abi,contractAddress,account);
      await contract.add_package(key,sub_package,channels,price);
      console.log('done');
    } catch(error){
      console.log("cant add sub");
    }

  }

  return (
    <div className="App">
      <BrowserRouter>
      <header className="App-header">
        <div className="branding">
          <p>ADEV</p>
        </div>
        <div className="top-section"></div>
        <div className="button-container">
          <Link to='/'>Home</Link>
          <Link to='/subscription_channel'>Subscription Channel</Link>
          <Link to='/history'>History</Link>
          {
            connection ?
            <button className="connect" onClick={disconnectWallet}>Disconnect wallet</button>
            :
            <button className="connect" onClick={connectWallet}>Connect wallet</button>
          }
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
