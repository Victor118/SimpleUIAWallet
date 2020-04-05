import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AssetBalance } from 'src/app/model/assetBalance';
import { BitsharesService } from 'src/app/services/bitshares.service';
import { AppDataStorageService } from 'src/app/services/app-data-storage.service';
import { BitsharesAccount } from 'src/app/model/bitsharesAccount';
import { Asset } from 'src/app/model/asset';
import { blockchainReadableAmount } from 'src/app/utils/assetUtils';

@Component({
  selector: 'app-send-modal',
  templateUrl: './send-modal.component.html',
  styleUrls: ['./send-modal.component.scss']
})
export class SendModalComponent implements OnInit {

  public userAccount: BitsharesAccount;

  public _accountName:string;

  public transfertDisabled: boolean = true;

  public accounts:string[];

  public asset : Asset;

  set accountName(value:string){
    console.log("value :"+ value);
    this._accountName = value;
    if(value && value.length > 3){
      this.lookupAccounts(value);
    }
    
  }

  get accountName(){
    return this._accountName;
  }

  public password:string;

  public _amount:number;

  public set amount(value:number){
    this._amount = value;
    if(value <=0 || value > this.balance.balance){
      this.transfertDisabled = true;
    }else{
      this.transfertDisabled = false;
    }
  }

  public get amount(){
    return this._amount;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public balance: AssetBalance,
    private bitsharesService : BitsharesService,
    private dialogRef: MatDialogRef<SendModalComponent>,
    private appDataStorageService:AppDataStorageService) {}

  onNoClick(): void {
    //this.dialogRef.close();
  }

  ngOnInit() {
    this.appDataStorageService.getAccountObservable().subscribe((account: BitsharesAccount)=>{
      this.userAccount = account;
    })

    this.bitsharesService._resolveAsset(this.balance.asset_id).then((asset:Asset)=>{
      
      this.asset = asset;
    })
  }

  public transfer = () =>{
    this.transfertDisabled = true;
    console.log("transfer ");
    let pk = this.appDataStorageService.decryptPrivateKeys(this.password);
    let amountObject ={amount:blockchainReadableAmount(this._amount,this.asset.precision),asset_id:this.balance.asset_id};
    console.log("AMountObject ",amountObject);
    this.bitsharesService.transfer(pk.active,this.userAccount.name,this.accountName,amountObject).then(()=>{
      console.log("success");
      this.transfertDisabled = false;
      this.dialogRef.close("Transaction confirmed !");
      
    }, (error)=>{
      console.error("error :",error);
      this.transfertDisabled = false;
      this.dialogRef.close("Error :"+error.message);

    });
    pk = undefined;
  }

  public backToLogin=()=>{
    this.dialogRef.close(undefined);
  }

  private lookupAccounts=(value:string)=>{
    this.bitsharesService.lookupAccounts(value).then((accounts)=>{
      this.accounts = accounts;
    })
  }

}