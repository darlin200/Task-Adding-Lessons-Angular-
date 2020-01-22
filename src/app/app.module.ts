import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {DashboardComponent} from './main/dashboard.component';
import {
  MatCardModule, MatDialogModule, MatButtonModule, MatFormFieldModule,
  MatInputModule, MatTableModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataService} from './data.service';
import {TextMaskModule} from 'angular2-text-mask';
import {DialogComponent} from './main/dialog.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TextMaskModule
  ],
  entryComponents: [
    DialogComponent
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    DialogComponent,
  ],
  bootstrap: [AppComponent],
  providers: [DataService, MatDatepickerModule]
})
export class AppModule {}
