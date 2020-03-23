import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AssetBalance } from 'src/app/model/assetBalance';
import { BitsharesService } from 'src/app/services/bitshares.service';
import { AppDataStorageService } from 'src/app/services/app-data-storage.service';
import { BitsharesAccount } from 'src/app/model/bitsharesAccount';

@Component({
  selector: 'app-send-modal',
  templateUrl: './send-modal.component.html',
  styleUrls: ['./send-modal.component.scss']
})
export class SendModalComponent implements OnInit {

  public userAccount: BitsharesAccount;

  public accountName:string;

  public password:string;

  public amount:number;

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
  }

  public transfert = () =>{
    console.log("transfert ");
    let pk = this.appDataStorageService.decryptPrivateKeys(this.password);
    let amountObject ={amount:this.amount,asset_id:this.balance.asset_id};
    console.log("AMountObject ",amountObject);
    this.bitsharesService.transfer(pk.active,this.userAccount.name,this.accountName,amountObject).then(()=>{
      console.log("success");
      this.dialogRef.close("Transaction confirmed !");
    }, (error)=>{
      console.error("error :",error);
      this.dialogRef.close("Error :"+error.message);

    });
  }

  public backToLogin=()=>{
    this.dialogRef.close(undefined);
  }

}