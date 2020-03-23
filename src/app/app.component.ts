import { Component, OnInit } from '@angular/core';
import { BitsharesService } from './services/bitshares.service';
import { AppDataStorageService } from './services/app-data-storage.service';
import { Router } from '@angular/router';
import { BitsharesAccount } from './model/bitsharesAccount';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'uiawallet';

  public account:BitsharesAccount;

  constructor(private appDataStore : AppDataStorageService,private bitsharesService : BitsharesService,private appDataService : AppDataStorageService,private router: Router){
    console.log("TEST ");
    this.bitsharesService.getAccount("committee-account").then((account)=>{
      console.log(account);
    });

  }

  ngOnInit(){
    console.log("NgOnInit du AppComponent")
    let isDataExist : boolean = this.appDataService.loadDataFromStorage();
    if(isDataExist){
      this.navigateToWallet();
    }

    this.appDataStore.getAccountObservable().subscribe((account:BitsharesAccount)=>{
      if(account !== undefined){
        this.account = account;
      }
    });
  }

  navigateToWallet() {
    this.router.navigateByUrl('/wallet');
 }

}
