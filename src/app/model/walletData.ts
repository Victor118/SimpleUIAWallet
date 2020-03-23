import { BitsharesAccount } from './bitsharesAccount';
import { Keys } from './keys';

export interface WalletData {
    account:BitsharesAccount;
    keys?:{
        public:Keys,
        private:string
    };
}