import { Component, OnInit } from '@angular/core';
import { AppDataStorageService } from 'src/app/services/app-data-storage.service';
import { BitsharesAccount } from 'src/app/model/bitsharesAccount';
import { BitsharesService } from 'src/app/services/bitshares.service';
import { AssetBalance } from 'src/app/model/assetBalance';
import { SendModalComponent } from '../send-modal/send-modal.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  public account:BitsharesAccount;

  public balances: Array<AssetBalance>;

  constructor(private snackBar: MatSnackBar,private appDataStore : AppDataStorageService,private bitsharesService: BitsharesService,public dialog: MatDialog) { }

  ngOnInit() {
    
    this.appDataStore.getAccountObservable().subscribe((account:BitsharesAccount)=>{
      if(account !== undefined){
        this.account = account;
        console.log("acocunt logged : ",this.account);
        this.bitsharesService.subscribeToBTSObject(()=>{
          this.loadBalances();
        //   this.bitsharesService.getBalances(this.account.name).then((balances:Array<AssetBalance>)=>{
        //     console.log("success balances ",balances);
        //     this.balances = balances;
            
      
        //  });
        });
        this.loadBalances();
        
      }
    });

  }

  private loadBalances = ()=>{
    this.bitsharesService.getBalances(this.account.name).then((balances:Array<AssetBalance>)=>{
      console.log("success balances ",balances);
      this.balances = balances;
      let symbolsWallet = this.bitsharesService.getListAssetWallet();
      let assetToAdd:string[]=[];
      symbolsWallet.forEach((asset)=>{
        let assetFound = this.balances.find((a)=>{return a.asset_name === asset;});
        if(!assetFound){
          console.log("Asset not found : "+asset+" in ",this.balances)
          assetToAdd.push(asset);
        }
      });
      assetToAdd.forEach((a)=>{
        console.log("Add balance not in account, but needed for this wallet :"+a)
        let newBalance:AssetBalance = {
          asset_id:"",
          asset_name:a,
          asset_type:"",
          balance:0,
          owner:this.account.id,
          raw_balance:undefined,
          prefix:undefined
        } 
        this.balances.push(newBalance);
      })

   });
  }

  public openSendDialog = (balance:AssetBalance)=>{
    console.log("sending money",balance);
    let dialogRef = this.dialog.open(SendModalComponent, {
      data: balance,
      height: '400px',
      width: '600px',
    }).afterClosed().subscribe((message) => {
      if(message !== undefined){
        this.snackBar.open(message, "OK", {
          duration: 2000,
        });
        //this.loadBalances();
      }

    });

  }

}
