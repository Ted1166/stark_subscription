### stark_subscription

# Description; 

This plartform allows users to subscribe to channels on a decentralized network. Users can pay a subscription fee, to access exclusive content or services provided by channel creators. Cairo is used for creating smart contracts and StarkNet provides the infrastructure for running these contracts efficiently on a Layer 2 blockchain. This ensures secure and scalable subscription management, enabling channel creators to offer their content or services while users enjoy a seamless and decentralized subscription experience.

## How it works

The user logs in using the wallet which will give out the permission to fully access the application (N/B: The user won't be able to access the app if they don't have
a wallet). After successfull connection of the wallet with the application, the user will click on the *Add Package* button then Type in the package title, the Price and the number of channel the click on *+ Add Package* button after which the wallet prompt will come up for you to *confirm* or *cancel* the transaction. In attempt to confirm the transaction the package will be added to the *Subscription Channel* page where the user will then be able to select the package watch over the channels.

## Starknet Devnet Deploy Smart Contract

* Initializing a Virtual Environment using Pyenv:
    Create a new virtual environments
    
        pyenv virtualenv 3.9.18 starknet_env

    Activate the environment

        pyenv local starknet_env
        exec $SHELL

* Start Starknet Devnet:
    run this command
        starknet-devnet

* Generate a Signer Account
    Create a directory for your keystore:

        mkdir ~/.starkli-wallets/deployer -p

    Generate a Keystore:

        starkli signer keystore from-key ~/.starkli-wallets/deployer/account5_keystore.json

    Select an account from the list displayed when you ran starknet-devnet. Get the private key from it and provide it as requested.

    To check the created keystore:

        cat ~/.starkli-wallets/deployer/account1_keystore.json

    Create an Account Descriptor to generate a wallet class hash:

        starkli class-hash-at <ACCOUNT_ADDRESS> --rpc http://0.0.0.0:5050/rpc

        Example;
            
            starkli class-hash-at 0x60ade505941d6e493f48b72dbf8ef63d358667d95b3e75cceae8c45a1aa4e66 --rpc http://0.0.0.0:5050/rpc

        The open another terminal and run;
             
             nano ~/.starkli-wallets/deployer/account1_account.json

            Then Paste the following into the file, replacing placeholders as necessary:

                {
                    "version": 1,
                    "variant": {
                        "type": "open_zeppelin",
                        "version": 1,
                        "public_key": "0x5bd2fd153f33c512c972b9df7bb143ab855f978ce7b59a6bab1b09072673a7c"
                    },
                    "deployment": {
                        "status": "deployed",
                        "class_hash": "0x04d07e40e93398ed3c76981e72dd1fd22557a78ce36c0515f679e27f0bb5bc5f",
                        "address": "0x7e5228c93ea755eb7b04e6d05d6e94b3424bd6e341c88ccbdde8217335775a5"
                }
}

            save then exit.

    Build contract 

        scarb build

* Smart contract declaration:

        starkli declare target/dev/*.sierra.json --keystore  ~/.starkli-wallets/deployer/account5_keystore.json --account  ~/.starkli-
      wallets/deployer/account5_account.json --rpc http://0.0.0.0:5050/rpc

    This generates a class-hash for deployment.

        Class hash declared:
        0x0678c181d8b725409837107b9f395a782b2eb86a2ba058fa8b7bf30e0c74041c

* Deploying Smart contract:
     
        starkli deploy 0x0678c181d8b725409837107b9f395a782b2eb86a2ba058fa8b7bf30e0c74041c --keystore  ~/.starkli-wallets/deployer/account5_keystore.json --account
      ~/.starkli-wallets/deployer/account5_account.json --rpc http://0.0.0.0:5050/rp

