# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

{
    "version": 1,
    "variant": {
        "type": "open_zeppelin",
        "version": 1,
        "public_key": "0xb88fe99ca31e5636619c79e5f45a31d627d0fc992bc325a7eacb2d4096a897"
    },
    "deployment": {
        "status": "deployed",
        "class_hash": "0x04d07e40e93398ed3c76981e72dd1fd22557a78ce36c0515f679e27f0bb5bc5f",
        "address": "0x63c3a52a84456e60f44c72627c19df335cca9b06eba6d9f39a79f39cc4366ad"
    }
}

export STARKNET_ACCOUNT=~/.starkli-wallets/deployer/deploy1_account.json
export STARKNET_ACCOUNT=~/.starkli-wallets/deployer/deploy1_keystore.json

starkli declare target/dev/stark_subscription_subscribe.sierra.json --keystore  ~/.starkli-wallets/deployer/deploy1_keystore.json --account  ~/.starkli-wallets/deployer/deploy1_account.json --rpc http://0.0.0.0:5050/rpc
