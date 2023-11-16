
const abi = [
    {
        "type": "impl",
        "name": "subscribeImpl",
        "interface_name": "stark_subscription::channel::subscribeTrait"
    },
    {
        "type": "struct",
        "name": "stark_subscription::channel::subscribe::Packages",
        "members": [
            {
                "name": "sub_package",
                "type": "core::felt252"
            },
            {
                "name": "package_id",
                "type": "core::integer::u128"
            },
            {
                "name": "channels",
                "type": "core::felt252"
            },
            {
                "name": "price",
                "type": "core::integer::u128"
            }
        ]
    },
    {
        "type": "struct",
        "name": "stark_subscription::channel::subscribe::Msg",
        "members": [
            {
                "name": "recipient",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "name": "msg",
                "type": "core::felt252"
            }
        ]
    },
    {
        "type": "interface",
        "name": "stark_subscription::channel::subscribeTrait",
        "items": [
            {
                "type": "function",
                "name": "add_package",
                "inputs": [
                    {
                        "name": "key",
                        "type": "core::integer::u128"
                    },
                    {
                        "name": "sub_package",
                        "type": "core::felt252"
                    },
                    {
                        "name": "channels",
                        "type": "core::felt252"
                    },
                    {
                        "name": "price",
                        "type": "core::integer::u128"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "get_package",
                "inputs": [
                    {
                        "name": "key",
                        "type": "core::integer::u128"
                    }
                ],
                "outputs": [
                    {
                        "type": "stark_subscription::channel::subscribe::Packages"
                    }
                ],
                "state_mutability": "view"
            },
            {
                "type": "function",
                "name": "subs_package",
                "inputs": [
                    {
                        "name": "package_id",
                        "type": "core::integer::u128"
                    },
                    {
                        "name": "user",
                        "type": "core::starknet::contract_address::ContractAddress"
                    },
                    {
                        "name": "key",
                        "type": "core::integer::u128"
                    },
                    {
                        "name": "message_key",
                        "type": "core::integer::u128"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "get_message",
                "inputs": [
                    {
                        "name": "key",
                        "type": "core::integer::u128"
                    }
                ],
                "outputs": [
                    {
                        "type": "stark_subscription::channel::subscribe::Msg"
                    }
                ],
                "state_mutability": "view"
            }
        ]
    },
    {
        "type": "event",
        "name": "stark_subscription::channel::subscribe::Event",
        "kind": "enum",
        "variants": []
    }
]

export const CONTRACT_ADDRESS = "0x01ed24df20fe397ad8154462d1ab959b1c4760e2368a528e3d11e80f49a25ef7"
export const CONTRACT_ABI = abi