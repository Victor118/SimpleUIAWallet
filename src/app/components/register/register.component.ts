import { Component, OnInit } from '@angular/core';
import {
  generateMnemonic ,
  language,
  mnemonicToSeedHex,
  validateMnemonic
} from "bip39-english";
import {
  PrivateKey,
  Chain
} from "bitsharesjs";
import { Router } from '@angular/router';
import { BitsharesService } from 'src/app/services/bitshares.service';
import { AccountForFaucet } from 'src/app/model/accountForFaucet';
import { Keys } from 'src/app/model/keys';
import {Buffer} from 'Buffer';
import { AppDataStorageService } from 'src/app/services/app-data-storage.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  mnemonic :string;
  accountName:string;
  pincode:string;
  disabledButton : boolean=true;
  confirmPincode:string;
  constructor(private router: Router,private bitsharesService: BitsharesService,private appDataStore:AppDataStorageService) { }

  ngOnInit() {
    console.log("ngOnInit of registerComponent ");
     this.mnemonic = generateMnemonic (256);

    this.disabledButton = false;
  }

  public backToLogin = ()=>{
    this.router.navigate(['/login']);
  }

  navigateToWallet() {
    this.router.navigateByUrl('/wallet');
  }

  public registerNewAccount = ()=>{
    console.log(this.mnemonic);
    console.log(validateMnemonic(this.mnemonic) === true);

    const seedHex: string = mnemonicToSeedHex(this.mnemonic,"");
  
    console.log(seedHex);

    let pkeyActive = PrivateKey.fromSeed("active"+ seedHex );
    let pkeyOwner = PrivateKey.fromSeed("owner"+ seedHex );
    let pkeyMemo = PrivateKey.fromSeed("memo"+ seedHex );
    
    let keys : {public:Keys,private:any} = this.bitsharesService.generateKeysFromSeed(seedHex);
    let accountFaucet: AccountForFaucet = {
      name:this.accountName,
      active_key:keys.public.active,
      memo_key:keys.public.memo,
      owner_key:keys.public.owner
    }

     this.bitsharesService.createAccountWithFaucet(accountFaucet).subscribe((data)=>{

       this.bitsharesService.getAccountByPublicKey(keys.public.owner).then((account:any)=>{
        this.appDataStore.setData({"account":account,keys:keys},this.pincode);
        this.navigateToWallet();
  
  
      }, (err)=>{
        console.log("error",err);
      })
     })
  }

}
