import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';



const routes: Routes = [
  {path: '', redirectTo: 'main/dashboard', pathMatch: 'full'},
  {path: 'main/dashboard', component: AppComponent}
];

@NgModule( {
  imports: [RouterModule.forRoot( routes )],
  exports: [RouterModule]
} )
export class AppRoutingModule {}
