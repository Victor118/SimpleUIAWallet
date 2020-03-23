import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { BitsharesAccount } from '../model/bitsharesAccount';
import { CredentialsPK } from '../model/CredentialsPK';
import { BitsharesService } from './bitshares.service';
import { ThrowStmt } from '@angular/compiler';
import * as CryptoJS from 'crypto-browserify';
import { WalletData } from '../model/walletData';

@Injectable({
  providedIn: 'root'
})
export class AppDataStorageService {

  static  UIAWALLET_DATA_STORAGE :string= "BITSHARES_UIAWALLET_DATA";

  private account:BehaviorSubject<BitsharesAccount>=new BehaviorSubject<BitsharesAccount>(undefined);

  constructor() { }


  public loadDataFromStorage = ():boolean=>{
    let dataStr = localStorage.getItem(AppDataStorageService.UIAWALLET_DATA_STORAGE);
    let data;
    if(dataStr){
      data = JSON.parse(dataStr);
      if(data.account){
        this.updatedAccount(data.account);
        return true;
      }
      
    }
    return false;
  }

  public setData=(data:WalletData,secret)=>{
    if(data.keys !== undefined && data.keys.private !== undefined){
      let encryptedKeys = this.encryptData(secret,data.keys.private);
      console.log("Encrypted data : "+encryptedKeys);
      data.keys.private = encryptedKeys.toString();
    }
    console.log(data);
    localStorage.setItem(AppDataStorageService.UIAWALLET_DATA_STORAGE,JSON.stringify(data));
    if(data.account !== undefined){
      this.updatedAccount(data.account);
    }
  }

  updatedAccount(account: BitsharesAccount){
    this.account.next(account);
  }

  getAccountObservable = ():Observable<BitsharesAccount> =>{
    return this.account.asObservable();
  }


  encryptData = (secret:string,data:any):string =>{
    let secret512 = this.generateSecret(secret);
    console.log("data to encrypt : ",data);
    let dataStr = JSON.stringify(data);
    console.log(dataStr);
   // let encrypted = CryptoJS.AES.encrypt(dataStr, secret512);
    var cipher = CryptoJS.createCipher('aes-256-cbc',secret512);
    let encrypted = cipher.update(dataStr, 'utf8', 'base64')
    encrypted += cipher.final('base64')
    console.log("data encrypted : ",encrypted.toString());
    //let see if decrypted is ok
    let decrypted = this.decryptData( secret512,encrypted.toString());
    console.log("decrypted date : "+decrypted);
    return encrypted.toString();
  }

  decryptData = (secret:string,data:string):string =>{
    
    let secret512 = this.generateSecret(secret);
  
    let decrypted;
    // CryptoJS.AES.decrypt(data, secret512);

    var decipher = CryptoJS.createDecipher('aes-256-cbc',secret512);
    try {
      decrypted = decipher.update(data, 'base64', 'utf8');
      decrypted += decipher.final('utf8');
    } catch(e) {
      return null;
    };
    return decrypted.toString();
  }

  decryptPrivateKeys = (secret:string):CredentialsPK=>{
    let dataStr = localStorage.getItem(AppDataStorageService.UIAWALLET_DATA_STORAGE);
    let data;
    let decryptedKeys:CredentialsPK=undefined;
    if(dataStr){
      data = JSON.parse(dataStr);
      let encryptedKeys = data.keys.private;
      let temp = this.decryptData(secret,encryptedKeys);
      console.log("encrypted data :"+encryptedKeys);
      console.log("decrypted data string : "+temp);
      decryptedKeys = <CredentialsPK>JSON.parse(temp);
    }

    return decryptedKeys; //can be undefined
  }

  private generateSecret=(secret:string):string=>{
    console.log("KEY GENERATION ...",secret);
    let decoder = new TextDecoder("utf8"); 
    let key512Bits10000Iterations = CryptoJS.pbkdf2Sync(secret, "saltnotsecuredwherecanistoresaltidontknow", 1,32, 'sha512');
    return key512Bits10000Iterations.toString('base64');

  }
}
