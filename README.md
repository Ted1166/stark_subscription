### stark_subscription

# Description; 

This plartform allows users to subscribe to channels on a decentralized network. Users can pay a subscription fee, to access exclusive content or services provided by channel creators. Cairo is used for creating smart contracts and StarkNet provides the infrastructure for running these contracts efficiently on a Layer 2 blockchain. This ensures secure and scalable subscription management, enabling channel creators to offer their content or services while users enjoy a seamless and decentralized subscription experience.

## Cairo Setup

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
                        "public_key": "0x39494816e5d938c8d452bfd4d7fe3fccc5d48f6820f7d7a857c0d15c6e0cb93"
                    },
                    "deployment": {
                        "status": "deployed",
                        "class_hash": "0x046c666b2269f519820ad6337960206267546ca361aedd8feeaa8b1737c54446",
                        "address": "0x60ade505941d6e493f48b72dbf8ef63d358667d95b3e75cceae8c45a1aa4e66"
                    }
                }

            save then exit.

    Build contract 

        scarb build

* Smart contract declaration:

    starkli declare target/dev/*.sierra.json --keystore  ~/.starkli-wallets/deployer/account5_keystore.json --account  ~/.starkli-wallets/deployer/account5_account.json --rpc http://0.0.0.0:5050/rpc

    This generates a class-hash for deployment.

    Class hash declared:
    0x0678c181d8b725409837107b9f395a782b2eb86a2ba058fa8b7bf30e0c74041c

* Deploying Smart contract:
     
    starkli deploy 0x0678c181d8b725409837107b9f395a782b2eb86a2ba058fa8b7bf30e0c74041c --keystore  ~/.starkli-wallets/deployer/account5_keystore.json --account  ~/.starkli-wallets/deployer/account5_account.json --rpc http://0.0.0.0:5050/rp

