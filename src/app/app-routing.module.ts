import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportWalletComponent } from './components/import-wallet/import-wallet.component';
import { RegisterComponent } from './components/register/register.component';
import { WalletComponent } from './components/wallet/wallet.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: ImportWalletComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'wallet', component: WalletComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }