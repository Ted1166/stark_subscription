import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Contract } from 'starknet'
import { connect, disconnect } from 'starknetkit'
import { modals } from '@mantine/modals'
import { Text } from '@mantine/core'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../config/config'

const initialData = {
    contract: null,
    account: null,
    address: null,
    connection: null,
    handleConnetWalletBtnClick: null
}

export const AppContext = createContext(initialData)

export const useAppContext = () => {
    return useContext(AppContext)
}


const AppProvider = ({ children }) => {

    const [contract, setContract] = useState()
    const [connection, setConnection] = useState();
    const [account, setAccount] = useState();
    const [address, setAddress] = useState("");

    const connectWallet = async () => {
        const connection = await connect({ webWalletUrl: "https://web.argent.xyz" });

        console.log(connection);

        if (connection && connection.id !== "argentwallet" && connection.isConnected) {
            setConnection(connection);
            setAccount(connection.account);
            setAddress(connection.selectedAddress);

        }

        if (connection && connection.chainId !== "SN_GOERLI") {
            try {
                await window.starknet.request({
                    type: "wallet_addStarknetChain",
                    params: {
                        chainId: "SN_GOERLI"
                    }
                })

            } catch (error) {
                alert("Please manually switch your wallet network to testnet");
            }

        }

    }

    const disconnectWallet = async () => {
        await disconnect()
        setConnection(undefined);
        setAccount(undefined);
        setAddress('');
    }


    const openConfirmDisconnectModal = () => modals.openConfirmModal({
        title: 'Please confirm your action',
        centered: true,
        radius: "md",
        children: (
            <Text size="sm">
                Are you sure you want to disconnect your account?
            </Text>
        ),
        labels: { confirm: 'Disconnect', cancel: 'Cancel' },
        confirmProps: { radius: "md", variant: "light" },
        cancelProps: { radius: "md", variant: "light" },
        onCancel: () => { },
        onConfirm: () => disconnectWallet(),
    });


    const makeContractConnection = () => {
        if (account) {
            const contract = new Contract(CONTRACT_ABI, CONTRACT_ADDRESS, account)
            setContract(contract)
        }
    }

    const handleConnetWalletBtnClick = () => {
        console.log("clicked connect wallet")
        if (!account) {
            connectWallet()
        }
        else {

            openConfirmDisconnectModal()

        }
    }


    const contextValue = useMemo(() => ({
        contract,
        account,
        address,
        connection,
        handleConnetWalletBtnClick
    }), [account, contract, address]);

    useEffect(() => {
        const connectToStarknet = async () => {
            const connection = await connect({
                modalMode: "neverAsk",
                webWalletUrl: "https://web.argent.xyz",
                dappName: "Cycle Stark",
            });

            if (connection && connection.isConnected) {
                setConnection(connection);
                setAccount(connection.account);
                setAddress(connection.selectedAddress);
            }
        };
        connectToStarknet();
    }, []);

    useEffect(() => {
        makeContractConnection()
    }, [account, address])

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider
