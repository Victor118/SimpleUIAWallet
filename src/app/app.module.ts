import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from  '@angular/common/http';
import { BitsharesService } from './services/bitshares.service';
import { blockchains } from './config/config';
import { AngularMaterialModule } from './angular-material.module';
import { ImportWalletComponent } from './components/import-wallet/import-wallet.component';
import { RegisterComponent } from './components/register/register.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { SendModalComponent } from './components/send-modal/send-modal.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    ImportWalletComponent,
    RegisterComponent,
    WalletComponent,
    SendModalComponent
  ],
  entryComponents: [SendModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production , registrationStrategy: 'registerImmediately'})
  ],
  providers: [
    {provide:'BLOCKCHAIN_CONFIG', useValue: blockchains},             
    {provide: BitsharesService, useFactory: (BLOCKCHAIN_CONFIG,httpClient) =>                  
         new BitsharesService(BLOCKCHAIN_CONFIG["BTS"],httpClient),                  
         deps: ['BLOCKCHAIN_CONFIG',HttpClient]} 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
