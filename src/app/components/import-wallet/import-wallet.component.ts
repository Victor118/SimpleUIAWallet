import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {mnemonicToSeedHex} from "bip39-english";

import { BitsharesService } from 'src/app/services/bitshares.service';
import { AppDataStorageService } from 'src/app/services/app-data-storage.service';
import { Keys } from 'src/app/model/keys';
@Component({
  selector: 'app-import-wallet',
  templateUrl: './import-wallet.component.html',
  styleUrls: ['./import-wallet.component.scss']
})
export class ImportWalletComponent implements OnInit {

  public mnemonic:string;
  public pincode:string;
  public pincodeConfirm:string;
  public privateKey:string;
   
  constructor(private router: Router,private bitsharesService:BitsharesService,private appDataStore : AppDataStorageService) { }

  ngOnInit() {
  }

  public import = ()=>{

    if(this.pincode == this.pincodeConfirm){
      if(!this.privateKey || this.privateKey.trim() == ""){
        //console.log(validateMnemonic(this.mnemonic) === true);
        console.log("seed generation ...",mnemonicToSeedHex)
        const seedHex: string = mnemonicToSeedHex(this.mnemonic).toString('hex');
        

        console.log(seedHex);
        let keys : {public:Keys,private:any} = this.bitsharesService.generateKeysFromSeed(seedHex);

        console.log("Generate keys from seed OK");
        this.bitsharesService.getAccountByPublicKey(keys.public.owner).then((account:any)=>{
          console.log("success",account);
          this.appDataStore.setData({"account":account,keys:keys},this.pincode);
          this.navigateToWallet();
    
    
        }, (err)=>{
          console.log("error",err);
        })
      }else{
        let keys : {public:Keys,private:any} = this.bitsharesService.generateKeysFromWif(this.privateKey);
        this.bitsharesService.getAccountByPublicKey(keys.public.active).then((account:any)=>{
          console.log("success",account);
          this.appDataStore.setData({"account":account,keys:keys},this.pincode);
          this.navigateToWallet();
    
    
        }, (err)=>{
          console.log("error",err);
        })
      }

    }else{
      console.log("Confirm password KO");
    }

    
  }
  navigateToWallet() {
    this.router.navigateByUrl('/wallet');
  }
  public register= ()=>{
    console.log("click register");
    this.router.navigate(['/register']);
  }

}
