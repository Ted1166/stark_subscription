import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { connect, disconnect } from 'starknetkit'
import contractAbi from "./abi/abi.json";
import { Contract, Provider,constants, provider } from 'starknet'


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
    <> 
    
    <div className='App'>
              <header className="App-header">
                <main className="main">
                  <h1 className="title">
                    Starknet<a href="#"> Subscription</a>
                  </h1>

                {
                  connection ?
                  <button className="connect" onClick={disconnectWallet}>Disconnect wallet</button>
                  :
                  <button className="connect" onClick={connectWallet}>Connect wallet</button>
                }
                    

                  <p className="description">
                  { address }
                  </p>

                </main>
              </header>

              </div>

    </>
  )
}

export default App
