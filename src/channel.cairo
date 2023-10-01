use stark_subscription::channel::subscribe::{Packages, Msg, Subscription, ContractAddress};


#[starknet::interface]
trait subscribeTrait<TContractState> {
    fn add_package(ref self:TContractState, key:u128, sub_package : felt252, channels : felt252, price : u128);
    fn get_package(self:@TContractState, key:u128) -> Packages;
    fn subs_package(ref self:TContractState, package_id : u128, user : ContractAddress, key:u128, message_key:u128);
    fn get_message(self:@TContractState, key:u128) -> Msg;
    }

#[starknet::contract]
mod subscribe {

    use starknet::ContractAddress;
    use starknet::get_caller_address;
    use core::debug::PrintTrait;

    #[storage]
    struct Storage {
        packages : LegacyMap::<u128, Packages>,
        subscriptions: LegacyMap::<u128, Subscription>,
        messages: LegacyMap::<u128, Msg>
    }

    #[derive(Copy, Drop, Serde, starknet::Store)]
    struct Msg {
        recipient : ContractAddress,
        msg : felt252
    }

    #[derive(Copy, Drop, Serde, starknet::Store)]
    struct Packages {
        sub_package : felt252,
        package_id: u128,
        channels : felt252,
        price : u128
    }

    #[derive(Copy, Drop, Serde, starknet::Store)]
    struct Subscription {
        package_id : u128,
        user : ContractAddress
    }

    #[external(v0)]
    impl subscribeImpl of super::subscribeTrait<ContractState> {
        fn add_package(ref self:ContractState, key:u128, sub_package : felt252, channels : felt252, price : u128) {
            let new_package = Packages{sub_package:sub_package, channels:channels, price:price, package_id:key};
            self.packages.write(key, new_package);
        }

        fn get_package(self:@ContractState,key:u128) -> Packages{
            self.packages.read(key)
        }

        fn subs_package(ref self:ContractState, package_id : u128, user : ContractAddress, key:u128, message_key:u128) {
            let user_subscribe = Subscription{package_id:package_id, user:user};
            let package = self.packages.read(package_id);
            if package.package_id == package_id {
                self.subscriptions.write(key, user_subscribe);
                self.messages.write(message_key, Msg{recipient:user, msg:'Subscription successful'});
            }
        }

        fn get_message(self:@ContractState, key:u128) -> Msg {
            self.messages.read(key)
        }
    }
}

#[cfg(test)]
mod tests {
    use stark_subscription::channel::subscribeTraitDispatcherTrait;
    use super::subscribe;
    use super::subscribeTraitDispatcher;
    use core::array::ArrayTrait;
    use starknet::{ContractAddress,contract_address_const};
    use starknet::deploy_syscall;
    use core::debug::PrintTrait;

    fn deploy() -> subscribeTraitDispatcher {
        let mut calldata: Array<felt252> = ArrayTrait::new();
        let (address0, _) = deploy_syscall(subscribe::TEST_CLASS_HASH.try_into().unwrap(), 0, calldata.span(), false).unwrap();
        subscribeTraitDispatcher { contract_address: address0}
    }

    #[test]
    #[available_gas(20000000)]
    fn test_add_package(){
        let mut contract = deploy();
        let sub_package = 'sub_package';
        let channels = '1,2,3';
        let price = 1000;

        contract.add_package(key:1,sub_package:sub_package,channels:channels,price:price);


        let package_sent = contract.get_package(1);

        assert(package_sent.channels == '1,2,3', 'package channels');
    }

    #[test]
    #[available_gas(20000000)]
    fn test_subs_package() {
        let mut contract = deploy();
        let package_id = 1;
        let user: ContractAddress =  contract_address_const::<0x00000>();

        let sub_package = 'sub_package';
        let channels = '1,2,3';
        let price = 1000;

        contract.add_package(key:1,sub_package:sub_package,channels:channels,price:price);

        contract.subs_package(package_id : 1, user : user, key:1, message_key:1);

        let message = contract.get_message(1);
        assert(message.msg == 'Subscription successful', 'Message');
    }

}